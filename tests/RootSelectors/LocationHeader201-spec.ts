import { HydraResource } from '../../src/Resources'
import { locationHeader201 } from '../../src/RootSelectors/locationHeader201'
import 'isomorphic-fetch'

describe('RootSelector', () => {
    describe('locationHeader201', () => {
        it('should select the resource with id matching location header', () => {
            // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('the-real-id', expectedRoot)
            const response = {
                xhr: {
                    status: 201,
                    headers: new Headers({
                        Location: 'the-real-id',
                    }),
                    url: 'redirected-to',
                },
                resolveUri: (uri) => uri,
            } as any

            // when
            const root = locationHeader201(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })

        it('should select the resource with id matching relative location header', () => {
            // given
            const expectedRoot = {} as HydraResource
            const resources = new Map<string, HydraResource>()
            resources.set('the-real-id', expectedRoot)
            const response = {
                xhr: {
                    status: 201,
                    headers: new Headers({
                        Location: 'redirect-location',
                    }),
                },
                resolveUri: () => 'the-real-id',
            } as any

            // when
            const root = locationHeader201(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })

        it('should not select the resource when status is not 201', () => {
            // given
            const resources = new Map<string, HydraResource>()
            const response = {
                xhr: {
                    status: 301,
                    headers: new Headers({
                        Location: 'redirect-location',
                    }),
                },
                resolveUri: (uri) => uri,
            } as any

            // when
            const root = locationHeader201(resources, response)

            // then
            expect(root).toBeUndefined()
        })

        it('should return not select if resource is not found', () => {
            // given
            const resources = new Map<string, HydraResource>()
            const response = {
                xhr: {
                    status: 201,
                    headers: new Headers({
                        Location: 'the-real-id',
                    }),
                    url: 'redirected-to',
                },
                resolveUri: (uri) => uri,
            } as any

            // when
            const root = locationHeader201(resources, response)

            // then
            expect(root).toBeUndefined()
        })
    })
})
