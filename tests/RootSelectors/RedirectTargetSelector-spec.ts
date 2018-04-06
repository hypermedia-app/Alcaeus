import {IHydraResource} from '../../src/interfaces';
import {IResponseWrapper} from '../../src/ResponseWrapper';
import RedirectTargetSelector from '../../src/RootSelectors/RedirectTargetSelector';

describe('RedirectTargetSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = {} as IHydraResource;
        const resources = {
            'redirected-to': expectedRoot,
        };
        const response = {
            xhr: {
                url: 'redirected-to',
            },
        } as IResponseWrapper;

        // when
        const root = RedirectTargetSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });

    it('when resource is in response should select the redirect target', () => {
        // given
        const resources = {
            'something-else': {} as IHydraResource,
        };
        const response = {
            xhr: {
                url: 'redirected-to',
            },
        } as IResponseWrapper;

        // when
        const root = RedirectTargetSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });
});
