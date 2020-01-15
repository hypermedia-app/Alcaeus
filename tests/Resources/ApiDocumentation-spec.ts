import 'core-js/es6/array'
import { Constructor, ResourceFactory } from '@tpluscode/rdfine'
import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode, DatasetCore } from 'rdf-js'
import { ApiDocumentationMixin } from '../../src/Resources/Mixins/ApiDocumentation'
import Resource from '../../src/Resources/Resource'
import { hydra } from '../../src/Vocabs'

class ApiDocumentation extends ApiDocumentationMixin(Resource) { }
function MockLoad (loadFunc) {
    function Mixin<Base extends Constructor> (base: Base) {
        return class extends base {
            public get load () {
                return loadFunc
            }
        }
    }
    Mixin.shouldApply = true

    return Mixin
}

describe('ApiDocumentation', () => {
    let node: SingleContextClownface<DatasetCore, BlankNode>
    let load: jest.Mock

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()
        load = jest.fn()

        ApiDocumentation.factory = new ResourceFactory(Resource)
    })

    describe('getting entrypoint', () => {
        it('should reject if entrypoint missing', async () => {
            // given
            const docs = new ApiDocumentation(node)

            // when
            const promise = docs.loadEntrypoint()

            // when
            await expect(promise).rejects.toBeInstanceOf(Error)
        })

        it('should reject if entrypoint is not loadable', async () => {
            // given
            node.addOut(hydra.entrypoint, node.blankNode())
            const docs = new ApiDocumentation(node)

            // when
            const promise = docs.loadEntrypoint()

            // then
            await expect(promise).rejects.toBeInstanceOf(Error)
        })

        it('should load the entrypoint resource', async () => {
            // given
            node.addOut(hydra.entrypoint, node.namedNode('http://example.com/'))
            ApiDocumentation.factory.addMixin(MockLoad(load))
            const docs = new ApiDocumentation(node)

            // when
            await docs.loadEntrypoint()

            // then
            expect(load).toHaveBeenCalled()
        })
    })
})
