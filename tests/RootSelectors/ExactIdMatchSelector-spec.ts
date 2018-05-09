import {HydraResource, IHydraResponse} from '../../src/interfaces';
import ExactIdMatchSelector from '../../src/RootSelectors/ExactIdMatchSelector';

describe('ExactIdMatchSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = {} as HydraResource;
        const resources = {
            id: expectedRoot,
        };
        const response = {
            requestedUri: 'id',
        } as IHydraResponse;

        // when
        const root = ExactIdMatchSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });
});
