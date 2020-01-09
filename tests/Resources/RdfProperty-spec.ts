import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, NamedNode } from 'rdf-js'
import { RdfPropertyMixin } from '../../src/Resources/Mixins/RdfProperty'
import Resource from '../../src/Resources/Resource'
import { hydra, owl, rdf, rdfs, xsd } from '../../src/Vocabs'

class RdfProperty extends RdfPropertyMixin(Resource) {}

describe('RdfProperty', () => {
    let node: SingleContextClownface<DatasetCore, NamedNode>
    let property: RdfProperty

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://purl.org/dc/elements/1.1/partOf')

        node.addOut(rdf.type, rdf.Property)
            .addOut(rdfs.domain, xsd.integer)
            .addOut(rdfs.range, xsd.string)
            .addOut(hydra.supportedOperation, op => {
                op.addOut(hydra.description, 'Update this property')
                op.addOut(hydra.expects, xsd.string)
                op.addOut(hydra.method, 'POST')
                op.addOut(hydra.returns, owl.Nothing)
            })

        property = new RdfProperty(node)
    })

    it('should link to domain', async () => {
        // then
        expect(property.domain!.id).toEqual(xsd.integer)
    })

    it('should link to range', async () => {
        // them
        expect(property.range!.id).toEqual(xsd.string)
    })

    describe('link', () => {
        it('should not be a link by default', async () => {
            // then
            expect(property.isLink).toBe(false)
        })

        it('should be a link when typed accordingly', async () => {
            // given
            node.addOut(rdf.type, hydra.Link)

            // then
            expect(property.isLink).toBe(true)
        })
    })

    describe('supportedOperations', () => {
        it('should return single operation as array', async () => {
            // then
            expect(property.supportedOperations.length).toBe(1)
        })

        it('should return empty array when property is missing', () => {
            // given
            node.deleteOut(hydra.supportedOperation)

            // thne
            expect(Array.isArray(property.supportedOperations)).toBeTruthy()
            expect(property.supportedOperations.length).toBe(0)
        })
    })
})
