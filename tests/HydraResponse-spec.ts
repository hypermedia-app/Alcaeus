import * as sinon from 'sinon';
import {IRootSelector, create as HydraResponse, IResourceGraph} from '../src/HydraResponse';
import {IHydraResource} from '../src/interfaces';
import {IResponseWrapper} from '../src/ResponseWrapper';
import {async, responseBuilder} from './test-utils';
import Resource from '../src/Resources/Resource';

describe('HydraResponse', () => {
    describe('requestedUri', () => {
        it('returns the correct value', () => {
            // given
            const theUri = 'http://what/I/requested';

            // when
            const response = HydraResponse(theUri, <IResponseWrapper>{},{}, []);

            // then
            expect(response.requestedUri).toBe(theUri);
        });

    });

    describe('root', () => {
        it('should use root selection strategy to select the root resource', () => {
            // given
            const xhr = <IResponseWrapper>{
                xhr: <Response>{},
            };
            const resources = {};
            const selector = {
                selectRoot: sinon.stub(),
            };
            selector.selectRoot.returns({
                id: 'urn:other:resource'
            });

            // when
            const response = HydraResponse('urn:some:resource', xhr, resources, [ <IRootSelector>selector ] );
            const root = response.root;

            // then
            expect(root.id).toEqual('urn:other:resource');
            expect(selector.selectRoot.calledWith(resources)).toBeTruthy();
        });

        it('should fall back to resource with requested id', () => {
            // given
            const xhr = <IResponseWrapper>{
                xhr: <Response>{ },
            };
            const resources = {
                'urn:some:resource': {
                    operations: null,
                    apiDocumentation: null,
                    id: 'urn:some:resource',
                    types: null
                }
            };

            // when
            const response = HydraResponse('urn:some:resource', xhr, resources, [ ] );
            const root = response.root;

            // then
            expect(root.id).toEqual('urn:some:resource');
        });

        describe('when redirected', () => {
            it('should fall back to resource with requested id when the redirect id is not found', () => {
                // given
                const xhr = <IResponseWrapper>{
                    xhr: <Response>{
                        url: 'http://example.com/redirected/to',
                        redirected: true,
                    },
                };
                const resources = {
                    'urn:some:resource': <IHydraResource>{
                        id: 'urn:some:resource',
                    }
                };

                // when
                const response = HydraResponse('urn:some:resource', xhr, resources, [ ] );
                const root = response.root;

                // then
                expect(root.id).toEqual('urn:some:resource');
            });

            it('should return resource identified by redirect target', () => {
                // given
                const xhr = <IResponseWrapper>{
                    xhr: <Response>{
                        url: 'http://example.com/redirected/to',
                        redirected: true,
                    },
                };
                const resources = {
                    'urn:some:resource': <IHydraResource>{
                        id: 'urn:some:resource',
                    },
                    'http://example.com/redirected/to': <IHydraResource>{
                        id: 'http://example.com/redirected/to',
                    },
                };

                // when
                const response = HydraResponse('urn:some:resource', xhr, resources, [ ] );
                const root = response.root;

                // then
                expect(root.id).toEqual('http://example.com/redirected/to');
            });
        });
    });

    describe('[ identifier ]', () => {
        it('returns objects from the resource graph', async () => {
            // given
            const childRes = {};
            const resources = {
                'urn:child:resource': <IHydraResource>childRes
            };
            const response = HydraResponse('urn:some:uri', <IResponseWrapper>{}, resources, []);

            // when
            const actualIndexed = response['urn:child:resource'];

            // then
            expect(Object.is(actualIndexed, childRes)).toBe(true);
        });
    });

    describe('ofType', () => {
        it('should return all matching resources', () => {
            // given
            const xhr = <IResponseWrapper>{
                xhr: <Response>{ },
            };
            const resources = {
                'urn:res:one': new Resource({
                    '@type': 'urn:some:type'
                }),
                'urn:res:two': new Resource({
                    '@type': 'urn:some:type'
                }),
                'urn:res:tri': new Resource({
                    '@type': 'urn:other:type'
                }),
                'urn:res:for': new Resource({
                    '@type': 'urn:other:type'
                })
            };
            const r12n = HydraResponse('urn:some:res', xhr, <IResourceGraph><any>resources, []);

            // when
            const ofType = r12n.ofType('urn:some:type');

            // then
            expect(ofType.length).toBe(2);
        });
    });
});
