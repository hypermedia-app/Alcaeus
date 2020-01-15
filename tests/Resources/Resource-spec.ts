import cf, { Clownface } from 'clownface'
import $rdf from 'rdf-ext'
import Resource from '../../src/Resources/Resource'
import namespace from '@rdfjs/namespace'

const ex = namespace('http://example.com/')

describe('Resource', () => {
    let graph: Clownface

    beforeEach(() => {
        graph = cf({ dataset: $rdf.dataset() })
    })

    describe('isAnonymous', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'isAnonymous')!.enumerable)
                .toBe(false)
        })

        it('returns true when id in an URL', () => {
            // given
            const node = graph.namedNode('https://example.com/res')
            const resource = new Resource(node)

            // then
            expect(resource.isAnonymous).toBeFalsy()
        })

        it('returns true when id in an URN', () => {
            // given
            const node = graph.namedNode('urn:not:uri')
            const resource = new Resource(node)

            // then
            expect(resource.isAnonymous).toBeFalsy()
        })

        it('returns true when id in an blank identifier', () => {
            // given
            const node = graph.blankNode()
            const resource = new Resource(node)

            // then
            expect(resource.isAnonymous).toBeTruthy()
        })
    })

    describe('getBoolean', () => {
        it('throws when value is not boolean', () => {
            const node = graph.blankNode()
            node.addOut(ex.foo, ex.bar)
            const resource = new Resource(node)

            // then
            expect(() => resource.getBoolean(ex.foo)).toThrow()
        })

        it('return false when value is undefined', () => {
            const node = graph.blankNode()
            const resource = new Resource(node)

            // then
            expect(resource.getBoolean(ex.foo)).toBeFalsy()
        })

        it('return the value when it is set', () => {
            const node = graph.blankNode()
            node.addOut(ex.foo, true)
            const resource = new Resource(node)

            // then
            expect(resource.getBoolean(ex.foo)).toBeTruthy()
        })
    })

    describe('getNumber', () => {
        it('throws when value is not number', () => {
            const node = graph.blankNode()
            node.addOut(ex.foo, ex.bar)
            const resource = new Resource(node)

            // then
            expect(() => resource.getNumber(ex.foo)).toThrow()
        })

        it('return null when value is undefined', () => {
            const node = graph.blankNode()
            const resource = new Resource(node)

            // then
            expect(resource.getNumber('foo')).toBeNull()
        })
    })

    describe('getString', () => {
        it('returns string value of literal', () => {
            const node = graph.blankNode()
            node.addOut(ex.foo, 123)
            const resource = new Resource(node)

            // then
            expect(resource.getString(ex.foo)).toBe('123')
        })

        it('return null when value is undefined', () => {
            const node = graph.blankNode()
            const resource = new Resource(node)

            // then
            expect(resource.getString(ex.foo)).toBeNull()
        })
    })
})
