import { HydraResource } from '../../src/Resources'
import LocationSelector from '../../src/RootSelectors/201LocationSelector'
import 'isomorphic-fetch'

describe('201LocationSelector', () => {
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
        const root = LocationSelector.selectRoot(resources, response)

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
        const root = LocationSelector.selectRoot(resources, response)

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
        const root = LocationSelector.selectRoot(resources, response)

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
        const root = LocationSelector.selectRoot(resources, response)

        // then
        expect(root).toBeUndefined()
    })
})
