import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, BlankNode } from 'rdf-js'
import { JsonLd } from '../../../src/Constants'
import { BasicRepresentationExpansionMixin } from '../../../src/Resources/Mixins/BasicRepresentationExpansion'
import { IriTemplateMixin } from '../../../src/Resources/Mixins/IriTemplate'
import Resource from '../../../src/Resources/Resource'
import { hydra, rdf } from '../../../src/Vocabs'

class BasicRepresentationExpansion extends BasicRepresentationExpansionMixin(IriTemplateMixin(Resource)) {}

describe('BasicRepresentationExpansion', () => {
    let node: SingleContextClownface<DatasetCore, BlankNode>
    let resource: BasicRepresentationExpansion

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()

        node.addOut(rdf.type, hydra.IriTemplate)
        resource = new BasicRepresentationExpansion(node)
    })

    describe('shouldApply', () => {
        it('is true when variableRepresentation is not defined', () => {
            // when
            const result = BasicRepresentationExpansionMixin.shouldApply(resource)

            // then
            expect(result).toBe(true)
        })

        it('is true when variableRepresentation is BasicRepresentation', () => {
            // given
            node.addOut(hydra.variableRepresentation, hydra.BasicRepresentation)

            // when
            const result = BasicRepresentationExpansionMixin.shouldApply(resource)

            // then
            expect(result).toBe(true)
        })
    })

    describe('expand', () => {
        describe('uses BasicRepresentation rules when', () => {
            const valueProperty = 'http://example.com/someProp'

            beforeEach(() => {
                node.addOut(hydra.mapping, m => {
                    m.addOut(hydra.property, node.namedNode(valueProperty))
                    m.addOut(hydra.variable, 'value')
                })
                node.addOut(hydra.template, 'http://example.com/find/{value}')
            })

            it('expands IRI', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: {
                        [JsonLd.Id]: 'http://www.hydra-cg.com/',
                    },
                })

                // then
                expect(expanded).toBe('http://example.com/find/http%3A%2F%2Fwww.hydra-cg.com%2F')
            })

            it('expands string', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: 'A simple string',
                })

                // then
                expect(expanded).toBe('http://example.com/find/A%20simple%20string')
            })

            it('expands string with quote', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: 'A string " with a quote',
                })

                // then
                expect(expanded).toBe('http://example.com/find/A%20string%20%22%20with%20a%20quote')
            })

            it('expands decimal value', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: { '@value': `5.5`, '@type': 'http://www.w3.org/2001/XMLSchema#decimal' },
                })

                // then
                expect(expanded).toBe('http://example.com/find/5.5')
            })

            it('expands language tagged string', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: { '@value': `A simple string`, '@language': 'en' },
                })

                // then
                expect(expanded).toBe('http://example.com/find/A%20simple%20string')
            })
        })
    })
})
