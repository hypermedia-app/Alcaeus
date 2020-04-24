import { HydraResponse } from '../../src/HydraResponse'
import { HydraResource } from '../../src/Resources'
import { trailingSlash } from '../../src/RootSelectors/trailingSlash'

describe('RootSelector', () => {
    describe('TrailingSlashSelector', () => {
        describe('when requested id has a trailing slash but representation does not', () => {
            it('should return the correct one', () => {
                // given
                const expectedRoot = {} as HydraResource
                const resources = new Map<string, HydraResource>()
                resources.set('http://some/id', expectedRoot)
                const response = {
                    requestedUri: 'http://some/id/',
                } as HydraResponse

                // when
                const root = trailingSlash(resources, response)

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
                } as HydraResponse

                // when
                const root = trailingSlash(resources, response)

                // then
                expect(Object.is(root, expectedRoot)).toBeTruthy()
            })
        })
    })
})
