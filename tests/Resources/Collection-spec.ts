import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { NamedNode } from 'rdf-js'
import { CollectionMixin } from '../../src/Resources/Mixins/Collection'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { Resource } from './_TestResource'

class Collection extends CollectionMixin(Resource) {}

describe('Collection', () => {
    let collectionNode: SingleContextClownface<NamedNode>

    beforeEach(() => {
        collectionNode = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#Collection')
    })

    describe('members', () => {
        it('should return array even for one member', () => {
            // given
            collectionNode
                .addOut(hydra.member, m => {
                    m.addOut(collectionNode.namedNode('http://example.com/text'), 'hello')
                })
            const collection = new Collection(collectionNode) as any

            // then
            expect(Array.isArray(collection.members)).toBe(true)
            expect(collection.members[0]['http://example.com/text'].value).toBe('hello')
        })

        it('should be non-enumerable', () => {
            expect(Collection.prototype.propertyIsEnumerable('members'))
                .toBe(false)
        })
    })

    describe('views', () => {
        it('should return empty array when views are missing', () => {
            // given
            const collection = new Collection(collectionNode)

            // then
            expect(Array.isArray(collection.views)).toBe(true)
            expect(collection.views.length).toBe(0)
        })

        it('should be non-enumerable', () => {
            expect(Collection.prototype.propertyIsEnumerable('views'))
                .toBe(false)
        })
    })

    describe('manages', () => {
        it('should return array even for one element', () => {
            // given
            collectionNode.addOut(hydra.manages, collectionNode.blankNode())
            const collection = new Collection(collectionNode)

            // then
            expect(Array.isArray(collection.manages)).toBe(true)
        })

        it('should be non-enumerable', () => {
            expect(Collection.prototype.propertyIsEnumerable('manages'))
                .toBe(false)
        })
    })

    describe('totalItems', () => {
        it('returns the value of the hydra property', () => {
            // given
            collectionNode.addOut(hydra.totalItems, 167)
            const collection = new Collection(collectionNode)

            // then
            expect(collection.totalItems).toBe(167)
        })
    })
})

describe('CollectionMixin', () => {
    it('should be non-enumerable', () => {
        expect(Collection.prototype.propertyIsEnumerable('members'))
            .toBe(false)
    })
})
