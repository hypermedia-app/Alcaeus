import * as sinon from 'sinon';
import {create as HydraResponse} from '../src/HydraResponse';
import {IHydraResource} from '../src/interfaces';
import {IResponseWrapper} from '../src/ResponseWrapper';
import Resource from '../src/Resources/Resource';

describe('HydraResponse', () => {
    it('should be iterable', () => {
        // given
        const xhr = <IResponseWrapper>{
            xhr: <Response>{ },
        };
        const resources = {
            'a': 'a',
            'b': 'b',
            'c': 'c',
            'd': 'd',
        };
        const r12n = HydraResponse('urn:some:res', xhr, <any>resources, []);

        // when
        const array = Array.from(r12n);

        // then
        expect(array.join()).toBe('a,b,c,d');
    });

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
            const response = HydraResponse('urn:some:resource', xhr, resources, [ selector ] );
            const root = response.root;

            // then
            expect(root.id).toEqual('urn:other:resource');
            expect(selector.selectRoot.calledWith(resources)).toBeTruthy();
        });
    });

    describe('get', () => {
        it('returns objects from the resource graph', async () => {
            // given
            const childRes = {};
            const resources = {
                'urn:child:resource': <IHydraResource>childRes
            };
            const response = HydraResponse('urn:some:uri', <IResponseWrapper>{}, resources, []);

            // when
            const actualIndexed = response.get('urn:child:resource');

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
            const r12n = HydraResponse('urn:some:res', xhr, <any>resources, []);

            // when
            const ofType = r12n.ofType('urn:some:type');

            // then
            expect(ofType.length).toBe(2);
        });
    });
});
