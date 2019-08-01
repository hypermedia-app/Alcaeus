import { ResourceGraph } from '../../src/ResourceGraph'
import { HydraResource } from '../../src/Resources'
import { IResponseWrapper } from '../../src/ResponseWrapper'
import CanonicalLinkSelector from '../../src/RootSelectors/CanonicalLinkSelector'

describe('CanonicalLinkSelector', () => {
    it('should select the resource with id matching canonical link', () => {
        // given
        const expectedRoot = {} as HydraResource
        const resources = new ResourceGraph()
        resources['redirected-to'] = {} as HydraResource
        resources['the-real-id'] = expectedRoot
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
        const root = CanonicalLinkSelector.selectRoot(resources, response)

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy()
    })

    it('should return null if canonical link rel is not present', () => {
        // given
        const resources = new ResourceGraph()
        const response = {
            xhr: {
                headers: new Headers({
                    Link: '<the-real-id>; rel=prev',
                }),
            },
        } as IResponseWrapper

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response)

        // then
        expect(root).toBeNull()
    })

    it('should return null if link header is not present', () => {
        // given
        const resources = new ResourceGraph()
        const response = {
            xhr: {
                headers: new Headers({}),
            },
        } as IResponseWrapper

        // when
        const root = CanonicalLinkSelector.selectRoot(resources, response)

        // then
        expect(root).toBeNull()
    })
})
