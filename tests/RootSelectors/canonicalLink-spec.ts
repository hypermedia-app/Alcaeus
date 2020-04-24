import { HydraResource } from '../../src/Resources'
import { ResponseWrapper } from '../../src/ResponseWrapper'
import { canonicalLink } from '../../src/RootSelectors/canonicalLink'
import 'isomorphic-fetch'

describe('RootSelector', () => {
    describe('canonicalLink', () => {
        it('should select the resource with id matching canonical link', () => {
        // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('redirected-to', {} as HydraResource)
            resources.set('the-real-id', expectedRoot)
            const response = {
                xhr: {
                    headers: new Headers({
                        Link: '<the-real-id>; rel=canonical',
                    }),
                    url: 'redirected-to',
                },
                resolveUri: () => 'the-real-id',
            } as any

            // when
            const root = canonicalLink(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })

        it('should return null if canonical link rel is not present', () => {
        // given
            const resources = new Map<string, HydraResource>()
            const response = {
                xhr: {
                    headers: new Headers({
                        Link: '<the-real-id>; rel=prev',
                    }),
                },
            } as ResponseWrapper

            // when
            const root = canonicalLink(resources, response)

            // then
            expect(root).toBeUndefined()
        })

        it('should not select if link header is not present', () => {
        // given
            const resources = new Map<string, HydraResource>()
            const response = {
                xhr: {
                    headers: new Headers({}),
                },
            } as ResponseWrapper

            // when
            const root = canonicalLink(resources, response)

            // then
            expect(root).toBeUndefined()
        })
    })
})
