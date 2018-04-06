import * as sinon from 'sinon';
import {create as HydraResponse} from '../src/HydraResponse';
import {IHydraResource} from '../src/interfaces';
import Resource from '../src/Resources/Resource';
import {IResponseWrapper} from '../src/ResponseWrapper';

describe('HydraResponse', () => {
    it('should be iterable', () => {
        // given
        const xhr = {
            xhr: { } as Response,
        } as IResponseWrapper;
        const resources = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
        };
        const r12n = HydraResponse('urn:some:res', xhr, resources as any, []);

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
            const response = HydraResponse(theUri, {} as IResponseWrapper, {}, []);

            // then
            expect(response.requestedUri).toBe(theUri);
        });

    });

    describe('root', () => {
        it('should use root selection strategy to select the root resource', () => {
            // given
            const xhr = {
                xhr: {} as Response,
            } as IResponseWrapper;
            const resources = {};
            const selector = {
                selectRoot: sinon.stub(),
            };
            selector.selectRoot.returns({
                id: 'urn:other:resource',
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
                'urn:child:resource': childRes as IHydraResource,
            };
            const response = HydraResponse('urn:some:uri', {} as IResponseWrapper, resources, []);

            // when
            const actualIndexed = response.get('urn:child:resource');

            // then
            expect(Object.is(actualIndexed, childRes)).toBe(true);
        });
    });

    describe('ofType', () => {
        it('should return all matching resources', () => {
            // given
            const xhr = {
                xhr: { } as Response,
            } as IResponseWrapper;
            const resources = {
                'urn:res:1': new Resource({
                    '@type': 'urn:some:type',
                }),
                'urn:res:2': new Resource({
                    '@type': 'urn:some:type',
                }),
                'urn:res:3': new Resource({
                    '@type': 'urn:other:type',
                }),
                'urn:res:4': new Resource({
                    '@type': 'urn:other:type',
                }),
            };
            const r12n = HydraResponse('urn:some:res', xhr, resources as any, []);

            // when
            const ofType = r12n.ofType('urn:some:type');

            // then
            expect(ofType.length).toBe(2);
        });
    });
});
