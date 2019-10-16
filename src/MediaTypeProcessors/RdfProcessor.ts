import JsonLdSerializer from '@rdfjs/serializer-jsonld'
import { promises as jsonld, FlattenOptions } from 'jsonld'
import $rdf from 'rdf-ext'
import stringToStream from 'string-to-stream'
import { IHydraClient } from '../alcaeus'
import * as Constants from '../Constants'
import { forOwn } from '../LodashUtil'
import { ParserFactory } from '../ParserFactory'
import { IResourceFactory } from '../ResourceFactory'
import { IResourceGraph, ResourceGraph } from '../ResourceGraph'
import { ApiDocumentation } from '../Resources'
import { IResource } from '../Resources/Resource'
import { IResponseWrapper } from '../ResponseWrapper'
import { rdf } from '../Vocabs'
import { RdfList } from '../RdfList'

interface ConverterMap {
    [type: string]: (value: string, type: string) => unknown;
}

export interface IMediaTypeProcessor {
    canProcess(mediaType: string);
    process(
        alcaeus: IHydraClient,
        uri: string,
        response: IResponseWrapper,
        apiDocumentation?: ApiDocumentation): Promise<IResourceGraph>;
}

const propertyRangeMappings = [
    [Constants.Core.Vocab('supportedClass'), Constants.Core.Vocab('Class')],
    [Constants.Core.Vocab('expects'), Constants.Core.Vocab('Class')],
    [Constants.Core.Vocab('returns'), Constants.Core.Vocab('Class')],
    [Constants.Core.Vocab('supportedOperation'), Constants.Core.Vocab('Operation')],
    [Constants.Core.Vocab('operation'), Constants.Core.Vocab('Operation')],
    [Constants.Core.Vocab('supportedProperty'), Constants.Core.Vocab('SupportedProperty')],
    [Constants.Core.Vocab('statusCodes'), Constants.Core.Vocab('StatusCodeDescription')],
    [Constants.Core.Vocab('property'), rdf.Property],
    [Constants.Core.Vocab('mapping'), Constants.Core.Vocab('IriTemplateMapping')],
]

const jsonldSerializer = new JsonLdSerializer()

const parserFactory = new ParserFactory()

function isRdfList (resource) {
    let isObject = typeof resource === 'object'
    if (isObject) {
        const isEmpty = resource[Constants.JsonLd.Id] === rdf.nil
        const isListNode = rdf.first in resource && rdf.rest in resource
        return isEmpty || isListNode
    }

    return false
}

async function parseAndNormalizeGraph (responseText: string, uri: string, mediaType: string): Promise<object> {
    const parsers = parserFactory.create(uri)

    const dataset = await parseResourceRepresentation(responseText, mediaType, parsers)
    runInference(dataset)
    const json = await serializeDataset(dataset)

    return flatten(json, uri)
}

function parseResourceRepresentation (data: string, mediaType: string, parsers: $rdf.Parsers) {
    const quadStream = parsers.import(stripContentTypeParameters(mediaType), stringToStream(data))
    if (quadStream == null) {
        throw Error(`Parser not found for media type ${mediaType}`)
    }

    return $rdf.dataset().import(quadStream)
}

function stripContentTypeParameters (mediaType: string) {
    return mediaType.split(';').shift()
}

function runInference (dataset) {
    propertyRangeMappings.map((mapping) => {
        const matches = dataset.match(null, $rdf.namedNode(mapping[0]), null, null)

        matches.forEach((triple) => {
            dataset.add($rdf.triple(
                triple.object,
                $rdf.namedNode(rdf.type),
                $rdf.namedNode(mapping[1])
            ))
        })
    })
}

function serializeDataset (dataset) {
    const stream = jsonldSerializer.import(dataset.toStream())

    let result
    stream.on('data', (data) => {
        result = data
    })

    return $rdf.waitFor(stream).then(() => {
        return result
    })
}

async function flatten (json, url): Promise<object> {
    const opts: FlattenOptions = {}
    if (url) {
        opts.base = url
    }

    const expanded = await jsonld.expand(json, opts)
    const flattened = await jsonld.flatten(expanded, {})

    return flattened[Constants.JsonLd.Graph]
}

function resourcify (
    createResource: (obj, resources) => IResource,
    obj,
    resourcified: IResourceGraph,
    literalConverters: ConverterMap) {
    if ((typeof obj === 'object') === false) {
        return obj
    }

    let value = obj[Constants.JsonLd.Value]
    if (obj[Constants.JsonLd.Value] && typeof value === 'string') {
        const type = obj[Constants.JsonLd.Type]

        const converter = literalConverters[type]
        if (converter) {
            try {
                value = converter(value, type)
            } catch (err) {
                console.warn(`Failed to convert value "${value}"^^<${type}>: ${err.message}`)
            }
        }

        return value
    }

    const selfId = obj[Constants.JsonLd.Id]

    if (!selfId) {
        return obj
    }

    let resource = resourcified[selfId]
    if (!resource) {
        resource = createResource(obj, resourcified)
        resourcified[selfId] = resource
    } else if (typeof resource._processed === 'undefined') {
        resource = createResource(resource, resourcified)
    }
    resourcified[selfId] = resource

    if (resource._processed === true) {
        return resource
    }

    resource._processed = true
    forOwn(resource, (value, key) => {
        if (Array.isArray(value)) {
            resource[key] = value.map((el) => resourcify(createResource, el, resourcified, literalConverters))
            return
        }

        const resourceObject = resourcify(createResource, value, resourcified, literalConverters)
        if (isRdfList(resourceObject)) {
            resource[key] = new RdfList(resourceObject)
        } else {
            resource[key] = resourceObject
        }
    })

    return resource
}

function processResources (createResource: (obj, resources) => IResource, resources, literalConverters: ConverterMap): IResourceGraph {
    const resourcified = new ResourceGraph()
    resources.forEach((res) => {
        resourcified[res[Constants.JsonLd.Id]] = res
    })

    resources.reduceRight((acc: ResourceGraph, val) => {
        acc.add(createResource(val, acc))
        return acc
    }, resourcified)

    forOwn(resourcified, (resource) => resourcify(createResource, resource, resourcified, literalConverters))
    return resourcified
}

export default class RdfProcessor implements IMediaTypeProcessor {
    public resourceFactory: IResourceFactory;
    public readonly literalConverters: ConverterMap = {};

    public constructor (resourceFactory: IResourceFactory, literalConverters: ConverterMap = {}) {
        this.resourceFactory = resourceFactory
        this.literalConverters = literalConverters
    }

    public canProcess (mediaType): boolean {
        return !!parserFactory.create().find(stripContentTypeParameters(mediaType))
    }

    public async process (
        alcaeus: IHydraClient,
        uri: string,
        response: IResponseWrapper,
        apiDocumentation?: ApiDocumentation): Promise<IResourceGraph> {
        const processedGraph = await parseAndNormalizeGraph(await response.xhr.text(), uri, response.mediaType)

        const createResource = (obj, resources) => {
            return this.resourceFactory.createResource(obj, resources, apiDocumentation, alcaeus)
        }

        return processResources(createResource, processedGraph, this.literalConverters)
    }

    public addParsers (newParsers) {
        Object.entries(newParsers)
            .forEach((pair) => parserFactory.addParser.apply(parserFactory, pair))
    }
}
