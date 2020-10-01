import namespace from '@rdfjs/namespace'
import { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import clownface from 'clownface'
import $rdf from 'rdf-ext'
import { NothingMixin } from '../../src/Resources/Nothing'
import CachedResourceFactoryImpl from '../../src/Resources/ResourceFactory'

const ex = namespace('http://example.com/')

describe('CachedResourceFactory', () => {
    let fakeFactory: ResourceFactory

    beforeEach(() => {
        fakeFactory = {
            addMixin: jest.fn(),
            createEntity: jest.fn().mockImplementation(() => ({})),
        }
    })

    describe('createEntity', () => {
        it('returns cached instance', () => {
            // given
            const factory = new CachedResourceFactoryImpl(fakeFactory)
            const pointer = clownface({ dataset: $rdf.dataset() }).namedNode('foo')

            // when
            const first = factory.createEntity(pointer)
            const second = factory.createEntity(pointer)

            // then
            expect(first).toBe(second)
        })

        it('stores instances in per-graph cache', () => {
            // given
            const factory = new CachedResourceFactoryImpl(fakeFactory)
            const foobarPtr = clownface({ dataset: $rdf.dataset(), graph: ex.bar }).namedNode(ex.foo)
            const foobazPtr = clownface({ dataset: $rdf.dataset(), graph: ex.baz }).namedNode(ex.foo)

            // when
            const foobar = factory.createEntity(foobarPtr)
            const foobaz = factory.createEntity(foobazPtr)

            // then
            expect(foobar).not.toBe(foobaz)
            expect(factory.__cache.get(ex.bar)?.get(ex.foo)).toBe(foobar)
            expect(factory.__cache.get(ex.baz)?.get(ex.foo)).toBe(foobaz)
        })
    })

    describe('addMixin', () => {
        it('forwards to inner instance', () => {
            // given
            const factory = new CachedResourceFactoryImpl(fakeFactory)

            // when
            factory.addMixin(NothingMixin)

            // then
            expect(fakeFactory.addMixin).toBeCalledWith(NothingMixin)
        })
    })

    describe('clone', () => {
        it('returns instance with new cache', () => {
            // given
            const factory = new CachedResourceFactoryImpl(fakeFactory)

            // when
            const clone = factory.clone() as CachedResourceFactoryImpl<any, any>

            // then
            expect(clone.__cache).not.toBe(factory.__cache)
        })
    })
})
