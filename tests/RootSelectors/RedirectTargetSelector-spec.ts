import RedirectTargetSelector from '../../src/RootSelectors/RedirectTargetSelector';
import {IHydraResource} from '../../src/interfaces';
import {IResponseWrapper} from '../../src/ResponseWrapper';

describe('RedirectTargetSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = <IHydraResource>{};
        const resources = {
            'redirected-to': expectedRoot,
        };
        const response = <IResponseWrapper>{
            xhr: {
                url: 'redirected-to'
            }
        };

        // when
        const root = RedirectTargetSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });

    it('when resource is in response should select the redirect target', () => {
        // given
        const resources = {
            'something-else': <IHydraResource>{},
        };
        const response = <IResponseWrapper>{
            xhr: {
                url: 'redirected-to'
            }
        };

        // when
        const root = RedirectTargetSelector.selectRoot(resources, response);

        // then
        expect(root).toBeNull();
    });
});
