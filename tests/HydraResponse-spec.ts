import * as sinon from 'sinon';
import {IRootSelector, create as HydraResponse} from '../src/HydraResponse';
import {IHydraResource} from '../src/interfaces';
import {IResponseWrapper} from '../src/ResponseWrapper';
import {async, responseBuilder} from './test-utils';

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

        it('should fall back to resource with requested id', async () => {
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

        it('should return redirect target when redirected', () => {
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
});
