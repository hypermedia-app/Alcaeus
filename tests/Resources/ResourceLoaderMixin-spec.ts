import sinon from 'sinon'
import $rdf from 'rdf-ext'
import cf from 'clownface'
import Resource from '@tpluscode/rdfine'
import { createResourceLoaderMixin } from '../../src/Resources/CoreMixins'

describe('ResourceLoaderMixin', () => {
    describe('shouldApply', () => {
        it('not to blank node resource', () => {
            const mixin = createResourceLoaderMixin(() => ({} as any))
            const node = cf({ dataset: $rdf.dataset() })
                .blankNode()
            const self = new Resource(node)

            // when
            const result = mixin.shouldApply(self)

            // then
            expect(result).toBeFalsy()
        })
    })

    describe('load', () => {
        let alcaeus: any
        let HydraResource: ReturnType<ReturnType<typeof createResourceLoaderMixin>>

        beforeEach(() => {
            alcaeus = {
                loadResource: sinon.spy(),
            }
            HydraResource = class extends createResourceLoaderMixin(() => alcaeus)(Resource) {}
        })

        it('uses client to dereference self', () => {
            // given
            const node = cf({ dataset: $rdf.dataset() })
                .namedNode('http://example.com/resource')
            const resource = new HydraResource(node)

            // when
            resource.load()

            // then
            expect(alcaeus.loadResource.calledWithMatch('http://example.com/resource')).toBeTruthy()
        })

        it('passes additional headers', () => {
            // given
            const node = cf({ dataset: $rdf.dataset() })
                .namedNode('http://example.com/resource')
            const resource = new HydraResource(node)

            // when
            resource.load({
                Prefer: 'foo-bar: baz',
            })

            // then
            expect(alcaeus.loadResource.calledWithMatch('http://example.com/resource', {
                Prefer: 'foo-bar: baz',
            })).toBeTruthy()
        })
    })
})
