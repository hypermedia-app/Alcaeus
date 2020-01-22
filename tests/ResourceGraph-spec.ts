import { ResourceFactory } from '@tpluscode/rdfine'
import DatasetExt from 'rdf-ext/lib/Dataset'
import $rdf from 'rdf-ext'
import cf from 'clownface'
import { Resource } from '../src'
import ResourceGraph from '../src/ResourceGraph'
import { rdf, schema } from '../src/Vocabs'

describe('ResourceGraph', () => {
    let dataset: DatasetExt
    let factory: ResourceFactory

    beforeEach(() => {
        dataset = $rdf.dataset()
        factory = new ResourceFactory(Resource)
    })

    describe('get', () => {
        it('should return resource for matching URI', () => {
            // given
            cf({ dataset })
                .namedNode('http://example.com/biała gęś')
                .addOut(rdf.type, schema.Document)
            const graph = new ResourceGraph(
                dataset,
                factory,
            )

            // when
            const actual = graph.get('http://example.com/biała gęś')

            // then
            expect(actual!.id.value).toBe('http://example.com/biała gęś')
        })

        it('should return undefined for resource not found', () => {
            // given
            cf({ dataset })
                .namedNode('http://example.com/foo')
                .addOut(rdf.type, schema.Document)
            const graph = new ResourceGraph(
                dataset,
                factory,
            )

            // when
            const actual = graph.get('http://example.com/bar')

            // then
            expect(actual).toBeUndefined()
        })

        it('should return resource for encoded URI', () => {
            // given
            cf({ dataset })
                .namedNode('http://example.com/biała gęś')
                .addOut(rdf.type, schema.Document)
            const graph = new ResourceGraph(
                dataset,
                factory,
            )

            // when
            const actual = graph.get('http://example.com/bia%C5%82a%20g%C4%99%C5%9B')

            // then
            expect(actual!.id.value).toBe('http://example.com/biała gęś')
        })
    })
})
