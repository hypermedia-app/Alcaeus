import 'core-js/es6/array'
import { Constructor } from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode } from 'rdf-js'
import { ApiDocumentationMixin } from '../../src/Resources/Mixins/ApiDocumentation'
import { Resource } from './_TestResource'
import { hydra } from '@tpluscode/rdf-ns-builders'

class ApiDocumentation extends ApiDocumentationMixin(Hydra.ApiDocumentationMixin(Resource)) {}
function MockLoad(loadFunc) {
    function Mixin<Base extends Constructor>(base: Base) {
        return class extends base {
            public get load() {
                return loadFunc
            }
        }
    }
    Mixin.shouldApply = true

    return Mixin
}

describe('ApiDocumentation', () => {
    let node: GraphPointer<BlankNode>
    let load: jest.Mock

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()
        load = jest.fn()
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
