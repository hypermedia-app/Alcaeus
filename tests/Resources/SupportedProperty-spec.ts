import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { NamedNode } from 'rdf-js'
import { SupportedPropertyMixin } from '../../src/Resources/Mixins/SupportedProperty'
import { Resource } from './_TestResource'
import { hydra, rdfs, xml } from '@tpluscode/rdf-ns-builders'

class SupportedProperty extends SupportedPropertyMixin(Resource) {
}

describe('SupportedProperty', () => {
    let node: GraphPointer<NamedNode>
    let prop: SupportedProperty

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#SupportedProperty')

        prop = new SupportedProperty(node)
    })

    it('is readable if unspecified', () => {
        expect(prop.readable).toBe(true)
    })

    it('can be made non readable', () => {
        node.deleteOut(hydra.readable).addOut(hydra.readable, false)

        expect(prop.readable).toBe(false)
    })

    it('is writable if unspecified', () => {
        expect(prop.writable).toBe(true)
    })

    it('can be made non writable', () => {
        node.deleteOut(hydra.writeable).addOut(hydra.writeable, false)

        expect(prop.writable).toBe(false)
    })

    it('is not required by default', () => {
        expect(prop.required).toBe(false)
    })

    it('can be made required', () => {
        node.deleteOut(hydra.required).addOut(hydra.required, true)

        expect(prop.required).toBe(true)
    })

    it('should give access to property', () => {
        node.addOut(hydra.property, node.namedNode('http://example.com/property'), p => {
            p.addOut(rdfs.range, xml.string)
        })

        expect(prop.property.id.value).toEqual('http://example.com/property')
        expect(prop.property.range!.id).toEqual(xml.string)
    })
})
