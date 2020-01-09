import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, NamedNode } from 'rdf-js'
import { StatusCodeDescriptionMixin } from '../../src/Resources/Mixins/StatusCodeDescription'
import Resource from '../../src/Resources/Resource'
import { hydra } from '../../src/Vocabs'

class StatusCodeDescription extends StatusCodeDescriptionMixin(Resource) {}

describe('StatusCodeDescription', () => {
    let node: SingleContextClownface<DatasetCore, NamedNode>
    let statusCodeDescription: StatusCodeDescription

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#StatusCodeDescription')

        statusCodeDescription = new StatusCodeDescription(node)
    })

    it('should have code', () => {
        node.addOut(hydra.code, 200)

        expect(statusCodeDescription.code).toBe(200)
    })

    it('should have description', () => {
        node.deleteOut(hydra.description).addOut(hydra.description, 'the test')

        expect(statusCodeDescription.description).toBe('the test')
    })

    it('should have empty description if missing', () => {
        expect(statusCodeDescription.description).toBe('')
    })
})
