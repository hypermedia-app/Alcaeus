import CanonicalLinkSelector from '../../src/RootSelectors/CanonicalLinkSelector';
import {IHydraResource} from '../../src/interfaces';
import {IResponseWrapper} from '../../src/ResponseWrapper';

describe('CanonicalLinkSelector', () => {
    it('should select the resource with id matching canonical link', () => {
        // given
        const expectedRoot = <IHydraResource>{};
        const resources = {
            'redirected-to': <IHydraResource>{},
            'the-real-id': expectedRoot
        };
        const response = <IResponseWrapper>{
            xhr: {
                url: 'redirected-to',
                headers: new Headers({
                    'Link': '<the-real-id>; rel=canonical'
                })
            }
        };

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });

    it('should return null if canonical link rel is not present', () => {
        // given
        const resources = { };
        const response = <IResponseWrapper>{
            xhr: {
                headers: new Headers({
                    'Link': '<the-real-id>; rel=prev'
                })
            }
        };

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });

    it('should return null if link header is not present', () => {
        // given
        const resources = { };
        const response = <IResponseWrapper>{
            xhr: {
                headers: new Headers({})
            }
        };

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });
});
