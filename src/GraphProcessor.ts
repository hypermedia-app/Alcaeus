import {promises as jsonld} from 'jsonld';
import {FlattenOptions} from 'jsonld';
import * as $rdf from 'rdf-ext';
import * as JsonLdSerializer from 'rdf-serializer-jsonld-ext';
import * as stringToStream from 'string-to-stream';
import * as Constants from './Constants';
import {ParserFactory} from './ParserFactory';
import {rdf} from './Vocabs';

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
];

const jsonldSerializer = new JsonLdSerializer();

export const parserFactory = new ParserFactory();

export async function parseAndNormalizeGraph(responseText: string, uri: string, mediaType: string): Promise<object> {
    const parsers = this.parserFactory.create(uri);

    const dataset = await parseResourceRepresentation(responseText, mediaType, parsers);
    runInference(dataset);
    const json = await serializeDataset(dataset);

    return await flatten(json, uri);
}

export function addParsers(newParsers) {
    Object.entries(newParsers)
        .forEach((pair) => this.parserFactory.addParser.apply(this.parserFactory, pair));
}

function parseResourceRepresentation(data: string, mediaType: string, parsers: $rdf.Parsers) {
    const quadStream = parsers.import(stripContentTypeParameters(mediaType), stringToStream(data));
    if (quadStream == null) {
        throw Error(`Parser not found for media type ${mediaType}`);
    }

    return $rdf.dataset().import(quadStream);
}

function stripContentTypeParameters(mediaType: string) {
    return mediaType.split(';').shift();
}

function runInference(dataset) {
    propertyRangeMappings.map((mapping) => {
        const matches = dataset.match(null, $rdf.namedNode(mapping[0]), null, null);

        matches.forEach((triple) => {
            dataset.add($rdf.triple(
                triple.object,
                $rdf.namedNode(rdf.type),
                $rdf.namedNode(mapping[1]),
            ));
        });
    });
}

function serializeDataset(dataset) {
    const stream = jsonldSerializer.import(dataset.toStream());

    let result;
    stream.on('data', (data) => {
        result = data;
    });

    return $rdf.waitFor(stream).then(() => {
        return result;
    });
}

async function flatten(json, url): Promise<object> {
    const opts: FlattenOptions = {};
    if (url) {
        opts.base = url;
    }

    const expanded = await jsonld.expand(json, opts);
    const flattened = await jsonld.flatten(expanded, {});

    return flattened[Constants.JsonLd.Graph];
}
