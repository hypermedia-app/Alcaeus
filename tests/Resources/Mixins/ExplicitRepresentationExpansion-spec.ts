import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode } from 'rdf-js'
import { JsonLd } from '../../Constants'
import { ExplicitRepresentationExpansionMixin } from '../../../src/Resources/Mixins/ExplicitRepresentationExpansion'
import { IriTemplateMixin } from '../../../src/Resources/Mixins/IriTemplate'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import { Resource } from '../_TestResource'

class ExplicitRepresentationExpansion extends ExplicitRepresentationExpansionMixin(IriTemplateMixin(Resource)) {}

describe('ExplicitRepresentationExpansion', () => {
    let node: SingleContextClownface<BlankNode>
    let resource: ExplicitRepresentationExpansion

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()

        node.addOut(rdf.type, hydra.IriTemplate)
        resource = new ExplicitRepresentationExpansion(node)
    })

    describe('shouldApply', () => {
        it('is false when variableRepresentation is not defined', () => {
            // when
            const result = ExplicitRepresentationExpansionMixin.shouldApply(resource)

            // then
            expect(result).toBe(false)
        })

        it('is true when variableRepresentation is ExplicitRepresentation', () => {
            // given
            node.addOut(hydra.variableRepresentation, hydra.ExplicitRepresentation)

            // when
            const result = ExplicitRepresentationExpansionMixin.shouldApply(resource)

            // then
            expect(result).toBe(true)
        })
    })

    describe('expand', () => {
        describe('uses ExplicitRepresentation rules when', () => {
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

            it('expands shorthand string', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: 'A simple string',
                })

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20simple%20string%22')
            })

            it('expands string', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: {
                        [JsonLd.Value]: 'A simple string',
                    },
                })

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20simple%20string%22')
            })

            it('expands string with quote', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: 'A string " with a quote',
                })

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20string%20%22%20with%20a%20quote%22')
            })

            it('expands decimal value', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: { '@value': '5.5', '@type': 'http://www.w3.org/2001/XMLSchema#decimal' },
                })

                // then
                expect(expanded).toBe('http://example.com/find/%225.5%22%5E%5Ehttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23decimal')
            })

            it('expands language tagged string', () => {
                // when
                const expanded = resource.expand({
                    [valueProperty]: { '@value': 'A simple string', '@language': 'en' },
                })

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20simple%20string%22%40en')
            })
        })
    })
})
