import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, NamedNode } from 'rdf-js'
import { IriTemplateMixin } from '../../src/Resources/Mixins/IriTemplate'
import { Resource } from './_TestResource'
import { hydra } from '../../src/Vocabs'

class IriTemplate extends IriTemplateMixin(Resource) {
    public expand () {
        return ''
    }
}

describe('IriTemplate', () => {
    let node: SingleContextClownface<DatasetCore, NamedNode>

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#Template')
    })

    describe('mappings', () => {
        it('should return empty array even for one mapping', () => {
            // given
            node.addOut(hydra.mapping, node.blankNode())
            const iriTemplate = new IriTemplate(node)

            // then
            expect(Array.isArray(iriTemplate.mappings)).toBe(true)
            expect(iriTemplate.mappings.length).toBe(1)
        })

        it('should be non-enumerable', () => {
            expect(IriTemplate.prototype.propertyIsEnumerable('mappings'))
                .toBe(false)
        })
    })

    describe('variableRepresentation', () => {
        it('should return BasicRepresentation if missing', () => {
            // given
            const iriTemplate = new IriTemplate(node)

            // then
            expect(iriTemplate.variableRepresentation).toEqual(hydra.BasicRepresentation)
        })

        it('should be non-enumerable', () => {
            expect(IriTemplate.prototype.propertyIsEnumerable('variableRepresentation'))
                .toBe(false)
        })
    })

    describe('template', () => {
        it('should return underlying value', () => {
            // given
            node.addOut(hydra.template, 'http://example.com/{name}/friends{?friendName}')
            const iriTemplate = new IriTemplate(node)

            // then
            expect(iriTemplate.template).toBe('http://example.com/{name}/friends{?friendName}')
        })
    })
})
