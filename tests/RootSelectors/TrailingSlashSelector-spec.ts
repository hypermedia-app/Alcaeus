import {HydraResource, IHydraResponse} from '../../src/interfaces';
import TrailingSlashSelector from '../../src/RootSelectors/TrailingSlashSelector';

describe('TrailingSlashSelector', () => {
    describe('when requested id has a trailing slash but representation does not', () => {
        it('should return the correct one', () => {
            // given
            const expectedRoot = {} as HydraResource;
            const resources = {
                'http://some/id': expectedRoot,
            };
            const response = {
                requestedUri: 'http://some/id/',
            } as IHydraResponse;

            // when
            const root = TrailingSlashSelector.selectRoot(resources, response);

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy();
        });
    });

    describe('when representation has a trailing slash but requested id does not', () => {
        it('should return the correct one', () => {
            // given
            const expectedRoot = {} as HydraResource;
            const resources = {
                'http://some/id/': expectedRoot,
            };
            const response = {
                requestedUri: 'http://some/id',
            } as IHydraResponse;

            // when
            const root = TrailingSlashSelector.selectRoot(resources, response);

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy();
        });
    });
});
