import { HydraResource } from '../../src/Resources'
import { ResponseWrapper } from '../../src/ResponseWrapper'
import { redirectTarget } from '../../src/RootSelectors/redirectTarget'

describe('RootSelector', () => {
    describe('redirectTarget', () => {
        it('when resource is in response should select the redirect target', () => {
        // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('redirected-to', expectedRoot)
            const response = {
                xhr: {
                    url: 'redirected-to',
                },
            } as ResponseWrapper

            // when
            const root = redirectTarget(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })

        it('when resource is not in response should not select the redirect target', () => {
        // given
            const resources = new Map<string, HydraResource>()
            resources.set('something-else', {} as HydraResource)
            const response = {
                xhr: {
                    url: 'redirected-to',
                },
            } as ResponseWrapper

            // when
            const root = redirectTarget(resources, response)

            // then
            expect(root).toBeUndefined()
        })
    })
})
