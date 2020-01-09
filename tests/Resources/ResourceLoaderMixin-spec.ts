import { DatasetCore, NamedNode } from 'rdf-js'
import * as sinon from 'sinon'
import $rdf from 'rdf-ext'
import cf, { SingleContextClownface } from 'clownface'
import { createResourceLoaderMixin } from '../../src/Resources/CoreMixins/ResourceLoaderMixin'
import Resource from '../../src/Resources/Resource'

describe('ResourceLoaderMixin', () => {
    describe('shouldApply', () => {
        it('not to blank node resource', () => {
            const mixin = createResourceLoaderMixin({} as any)
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
        let alcaeus
        let HydraResource: ReturnType<ReturnType<typeof createResourceLoaderMixin>>

        beforeEach(() => {
            alcaeus = {
                loadResource: sinon.spy(),
            }
            HydraResource = class extends createResourceLoaderMixin(alcaeus as any)(Resource) {}
        })

        it('uses client to dereference self', () => {
            // given
            const node = cf({ dataset: $rdf.dataset() })
                .namedNode('http://example.com/resource') as any as SingleContextClownface<DatasetCore, NamedNode>
            const resource = new HydraResource(node)

            // when
            resource.load()

            // then
            expect(alcaeus.loadResource.calledWithExactly('http://example.com/resource')).toBeTruthy()
        })
    })
})
