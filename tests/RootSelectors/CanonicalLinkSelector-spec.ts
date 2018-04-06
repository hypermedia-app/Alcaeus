import {IHydraResource} from '../../src/interfaces';
import {IResponseWrapper} from '../../src/ResponseWrapper';
import CanonicalLinkSelector from '../../src/RootSelectors/CanonicalLinkSelector';

describe('CanonicalLinkSelector', () => {
    it('should select the resource with id matching canonical link', () => {
        // given
        const expectedRoot = {} as IHydraResource;
        const resources = {
            'redirected-to': {} as IHydraResource,
            'the-real-id': expectedRoot,
        };
        const response = {
            xhr: {
                headers: new Headers({
                    Link: '<the-real-id>; rel=canonical',
                }),
                url: 'redirected-to',
            },
        } as IResponseWrapper;

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });

    it('should return null if canonical link rel is not present', () => {
        // given
        const resources = { };
        const response = {
            xhr: {
                headers: new Headers({
                    Link: '<the-real-id>; rel=prev',
                }),
            },
        } as IResponseWrapper;

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });

    it('should return null if link header is not present', () => {
        // given
        const resources = { };
        const response = {
            xhr: {
                headers: new Headers({}),
            },
        } as IResponseWrapper;

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });
});
