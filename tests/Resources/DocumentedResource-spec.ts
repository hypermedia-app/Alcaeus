import { NamedNode } from 'rdf-js'
import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { hydra, rdfs, schema } from '@tpluscode/rdf-ns-builders'
import { DocumentedResourceMixin } from '../../src/Resources/Mixins/DocumentedResource'
import { Resource } from './_TestResource'

class DocumentedResource extends DocumentedResourceMixin(Resource) {}

describe('DocumentedResource', () => {
    let node: GraphPointer<NamedNode>

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#Resource')
        node.addOut(node.namedNode('http://some/custom/property'), 'The value')
    })

    it('should use hydra:title for title property', () => {
        // given
        node.addOut(hydra.title, 'The title')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.title).toBe('The title')
    })

    it('should use hydra:description for title property', async () => {
        // given
        node.addOut(hydra.description, 'The longer description')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.description).toBe('The longer description')
    })

    it('should use rdfs:label for title property as fallback', () => {
        // given
        node.addOut(rdfs.label, 'The title with rdfs')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.title).toBe('The title with rdfs')
    })

    it('should use schema:title for title property as fallback', () => {
        // given
        node.addOut(schema.title, 'The title with schema')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.title).toBe('The title with schema')
    })

    it('should use rdfs:comment for description property as fallback', () => {
        // given
        node.addOut(rdfs.comment, 'The title descr with rdfs')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.description).toBe('The title descr with rdfs')
    })

    it('should use schema:label for title property as fallback', () => {
        // given
        node.addOut(schema.description, 'The title descr with schema')

        // when
        const op = new DocumentedResource(node)

        // then
        expect(op.description).toBe('The title descr with schema')
    })
})
