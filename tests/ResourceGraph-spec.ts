import { ResourceGraph } from '../src/ResourceGraph'
import { HydraResource } from '../src/Resources'

describe('ResourceGraph', () => {
    describe('get', () => {
        it('should return resource for matching URI', () => {
            // given
            const id = 'http://example.com/biała gęś'
            const resource = {} as HydraResource
            const graph = new ResourceGraph()
            graph[id] = resource

            // when
            const actual = graph.get(id)

            // then
            expect(actual).toBe(resource)
        })

        it('should return resource for encoded URI', () => {
            // given
            const id = 'http://example.com/biała gęś'
            const resource = {} as HydraResource
            const graph = new ResourceGraph()
            graph[id] = resource

            // when
            const actual = graph.get(id)

            // then
            expect(actual).toBe(resource)
        })
    })
})
