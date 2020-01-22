import 'isomorphic-fetch'
import { ResourceFactory } from '@tpluscode/rdfine'
import * as sinon from 'sinon'
import $rdf from 'rdf-ext'
import cf from 'clownface'
import namespace from '@rdfjs/namespace'
import { create as HydraResponse } from '../src/HydraResponse'
import Resource from '../src/Resources/Resource'
import { ResponseWrapper } from '../src/ResponseWrapper'
import { rdf } from '../src/Vocabs'

const ex = namespace('http://example.com/')

const factory = new ResourceFactory(Resource)
const rootSelectors = []

describe('HydraResponse', () => {
    it('should be iterable', () => {
        // given
        const xhr = {
            xhr: { } as Response,
        } as ResponseWrapper
        const dataset = $rdf.dataset()
        cf({ dataset, graph: ex.a })
            .namedNode(ex.a).addOut(rdf.type, ex.Res)
            .namedNode(ex.b).addOut(rdf.type, ex.Res)
            .namedNode(ex.c).addOut(rdf.type, ex.Res)
            .namedNode(ex.d).addOut(rdf.type, ex.Res)
        const r12n = HydraResponse(ex.a.value, xhr, dataset, factory, { rootSelectors })

        // when
        const array = Array.from(r12n)

        // then
        expect(array.map(r => r.id.value).join()).toBe('http://example.com/a,http://example.com/b,http://example.com/c,http://example.com/d')
    })

    describe('requestedUri', () => {
        it('returns the correct value', () => {
            // given
            const theUri = 'http://what/I/requested'

            // when
            const response = HydraResponse(theUri, {} as ResponseWrapper, $rdf.dataset(), factory, { rootSelectors })

            // then
            expect(response.requestedUri).toBe(theUri)
        })
    })

    describe('root', () => {
        it('should use root selection strategy to select the root resource', () => {
            // given
            const xhr = {
                xhr: {} as Response,
            } as ResponseWrapper
            const selector = {
                selectRoot: sinon.stub(),
            }
            selector.selectRoot.returns({
                id: 'urn:other:resource',
            })
            const dataset = $rdf.dataset()

            // when
            const response = HydraResponse('urn:some:resource', xhr, dataset, factory, { rootSelectors: [ selector ] })
            const root = response.root

            // then
            expect(root!.id).toEqual('urn:other:resource')
            expect(selector.selectRoot.called).toBeTruthy()
        })
    })

    describe('get', () => {
        it('returns objects from the resource graph', async () => {
            // given
            const dataset = $rdf.dataset()
            cf({ dataset })
                .namedNode('urn:child:resource').addOut(rdf.type, ex.Type)
            const response = HydraResponse('urn:some:uri', {} as ResponseWrapper, dataset, factory, { rootSelectors })

            // when
            const actualIndexed = response.get('urn:child:resource')

            // then
            expect(actualIndexed!.id.value).toBe('urn:child:resource')
        })
    })

    describe('ofType', () => {
        it('should return all matching resources', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as ResponseWrapper
            const dataset = $rdf.dataset()
            cf({ dataset, graph: $rdf.namedNode('urn:some:res') })
                .namedNode('urn:res:1').addOut(rdf.type, ex.Type1)
                .namedNode('urn:res:2').addOut(rdf.type, ex.Type1)
                .namedNode('urn:res:3').addOut(rdf.type, ex.Type2)
                .namedNode('urn:res:4').addOut(rdf.type, ex.Type3)
            const r12n = HydraResponse('urn:some:res', xhr, dataset, factory, { rootSelectors })

            // when
            const ofType = r12n.ofType(ex.Type1)

            // then
            expect(ofType.length).toBe(2)
        })

        it('should return all matching resources by string', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as ResponseWrapper
            const dataset = $rdf.dataset()
            cf({ dataset, graph: $rdf.namedNode('urn:some:res') })
                .namedNode('urn:res:1').addOut(rdf.type, ex.Type1)
                .namedNode('urn:res:2').addOut(rdf.type, ex.Type1)
                .namedNode('urn:res:3').addOut(rdf.type, ex.Type2)
                .namedNode('urn:res:4').addOut(rdf.type, ex.Type3)
            const r12n = HydraResponse('urn:some:res', xhr, dataset, factory, { rootSelectors })

            // when
            const ofType = r12n.ofType(ex.Type1.value)

            // then
            expect(ofType.length).toBe(2)
        })
    })

    describe('when resources are not given', () => {
        it('should have 0 length', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as ResponseWrapper

            // when
            const r12n = HydraResponse('urn:some:res', xhr, $rdf.dataset(), factory, { rootSelectors })

            // then
            expect(r12n.length).toBe(0)
        })

        it('ofType should return empty array', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as ResponseWrapper

            // when
            const r12n = HydraResponse('urn:some:res', xhr, $rdf.dataset(), factory, { rootSelectors })

            // then
            expect(r12n.ofType('whatever').length).toBe(0)
        })
    })

    describe('when root selectors are not given', () => {
        it('root should return empty', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as ResponseWrapper

            // when
            const r12n = HydraResponse('urn:some:res', xhr, $rdf.dataset(), factory, { rootSelectors })

            // then
            expect(r12n.root).toBeNull()
        })
    })
})
