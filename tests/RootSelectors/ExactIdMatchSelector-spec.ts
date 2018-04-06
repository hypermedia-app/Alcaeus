import ExactIdMatchSelector from '../../src/RootSelectors/ExactIdMatchSelector';
import {IHydraResource, IHydraResponse} from '../../src/interfaces';

describe('ExactIdMatchSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = <IHydraResource>{};
        const resources = {
            'id': expectedRoot,
        };
        const response = <IHydraResponse>{
            requestedUri: 'id'
        };

        // when
        const root = ExactIdMatchSelector.selectRoot(resources, response);

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy();
    });
});
