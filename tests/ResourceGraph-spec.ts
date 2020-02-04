import { ResourceFactory, ResourceFactoryImpl } from '@tpluscode/rdfine'
import $rdf from 'rdf-ext'
import cf, { Clownface } from 'clownface'
import { Resource } from '../src'
import ResourceGraph from '../src/ResourceGraph'
import { rdf, schema } from '../src/Vocabs'

describe('ResourceGraph', () => {
    let dataset: Clownface
    let factory: ResourceFactory

    beforeEach(() => {
        dataset = cf({ dataset: $rdf.dataset() })
        factory = new ResourceFactoryImpl(Resource)
    })

    describe('get', () => {
        it('should return resource for matching URI', () => {
            // given
            dataset
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
            dataset
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
            dataset
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
