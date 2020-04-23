import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { NamedNode } from 'rdf-js'
import { StatusCodeDescriptionMixin } from '../../src/Resources/Mixins/StatusCodeDescription'
import Resource from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'

class StatusCodeDescription extends StatusCodeDescriptionMixin(Resource) {}

describe('StatusCodeDescription', () => {
    let node: SingleContextClownface<NamedNode>
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
