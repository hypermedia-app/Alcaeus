import 'core-js/es6/array'
import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode, DatasetCore } from 'rdf-js'
import { ApiDocumentationMixin } from '../../src/Resources/Mixins/ApiDocumentation'
import Resource from '../../src/Resources/Resource'

class ApiDocumentation extends ApiDocumentationMixin(Resource) { }

describe('ApiDocumentation', () => {
    let node: SingleContextClownface<DatasetCore, BlankNode>

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()
    })

    describe('getting entrypoint', () => {
        it('should reject if entrypoint missing', async () => {
            // given
            const docs = new ApiDocumentation(node)

            // when
            expect(docs.loadEntrypoint).toThrow()
        })
    })
})
