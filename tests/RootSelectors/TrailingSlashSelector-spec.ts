import { IHydraResponse } from '../../src/HydraResponse'
import { HydraResource } from '../../src/Resources'
import TrailingSlashSelector from '../../src/RootSelectors/TrailingSlashSelector'

describe('TrailingSlashSelector', () => {
    describe('when requested id has a trailing slash but representation does not', () => {
        it('should return the correct one', () => {
            // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('http://some/id', expectedRoot)
            const response = {
                requestedUri: 'http://some/id/',
            } as IHydraResponse

            // when
            const root = TrailingSlashSelector.selectRoot(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })
    })

    describe('when representation has a trailing slash but requested id does not', () => {
        it('should return the correct one', () => {
            // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('http://some/id/', expectedRoot)
            const response = {
                requestedUri: 'http://some/id',
            } as IHydraResponse

            // when
            const root = TrailingSlashSelector.selectRoot(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })
    })
})
