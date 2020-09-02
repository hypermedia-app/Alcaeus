import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { NamedNode } from 'rdf-js'
import { IriTemplateMappingMixin } from '../../src/Resources/Mixins/IriTemplateMapping'
import { Resource } from './_TestResource'
import { hydra } from '@tpluscode/rdf-ns-builders'

class IriTemplateMapping extends IriTemplateMappingMixin(Resource) {}

describe('IriTemplateMapping', () => {
    let node: GraphPointer<NamedNode, DatasetExt>

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#TemplateMapping')
    })

    describe('required', () => {
        it('should return false if missing', () => {
            // given
            const iriTemplate = new IriTemplateMapping(node)

            // then
            expect(iriTemplate.required).toBe(false)
        })

        it('should be non-enumerable', () => {
            expect(IriTemplateMapping.prototype.propertyIsEnumerable('required'))
                .toBe(false)
        })
    })

    describe('variable', () => {
        it('returns the correct value of hydra term', () => {
            // given
            node.addOut(hydra.variable, 'test')

            const iriTemplate = new IriTemplateMapping(node)

            // then
            expect(iriTemplate.variable).toBe('test')
        })
    })

    describe('property', () => {
        it('returns the correct value of hydra term', () => {
            // given
            node.addOut(hydra.property, node.namedNode('http://example.com/test'))
            const iriTemplate = new IriTemplateMapping(node)

            // then
            expect(iriTemplate.property.id.value).toBe('http://example.com/test')
        })
    })
})
