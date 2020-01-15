import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-jsonld'
import { DatasetCore, NamedNode, Stream } from 'rdf-js'
import stringToStream from 'string-to-stream'
import Resource from '../../src/Resources/Resource'
import { PartialCollectionViewMixin } from '../../src/Resources/Mixins/PartialCollectionView'
import { Bodies } from '../test-objects'

const parser = new Parser()

class PartialCollectionView extends PartialCollectionViewMixin(Resource) {}

describe('PartialCollectionView', () => {
    let node: SingleContextClownface<DatasetCore, NamedNode>

    beforeEach(async () => {
        const dataset = $rdf.dataset()
        const jsonldStream = stringToStream(JSON.stringify(Bodies.hydraCollectionWithView)) as any as Stream
        await dataset.import(parser.import(jsonldStream))

        node = cf({ dataset })
            .namedNode('http://example.com/resource?page=3')
    })

    it('should link to the collection', async () => {
        const pcv = new PartialCollectionView(node)

        expect(pcv.collection!.id.value).toEqual('http://example.com/resource')
    })

    it('should contain no links to other pages if missing', () => {
        // given
        const noLinks = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/resource?page=3')

        // when
        const pcv = new PartialCollectionView(noLinks)

        // then
        expect(pcv.next).toBeUndefined()
        expect(pcv.previous).toBeUndefined()
        expect(pcv.first).toBeUndefined()
        expect(pcv.last).toBeUndefined()
    })

    it('should contain links to other pages', () => {
        // when
        const pcv = new PartialCollectionView(node)

        // then
        expect(pcv.next!.id.value).toBe('http://example.com/resource?page=4')
        expect(pcv.previous!.id.value).toBe('http://example.com/resource?page=2')
        expect(pcv.first!.id.value).toBe('http://example.com/resource?page=1')
        expect(pcv.last!.id.value).toBe('http://example.com/resource?page=58')
    })

    it('first should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('first'))
            .toBe(false)
    })

    it('last should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('last'))
            .toBe(false)
    })

    it('next should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('next'))
            .toBe(false)
    })

    it('previous should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('previous'))
            .toBe(false)
    })

    it('collection should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('collection'))
            .toBe(false)
    })
})
