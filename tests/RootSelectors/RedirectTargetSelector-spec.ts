import {HydraResource, IResponseWrapper} from '../../src/interfaces';
import RedirectTargetSelector from '../../src/RootSelectors/RedirectTargetSelector';

describe('RedirectTargetSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = {} as HydraResource;
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
            'something-else': {} as HydraResource,
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
