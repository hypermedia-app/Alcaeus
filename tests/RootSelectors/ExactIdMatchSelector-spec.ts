import { IHydraResponse } from '../../src/HydraResponse'
import { ResourceGraph } from '../../src/ResourceGraph'
import { HydraResource } from '../../src/Resources'
import ExactIdMatchSelector from '../../src/RootSelectors/ExactIdMatchSelector'

describe('ExactIdMatchSelector', () => {
    it('when resource is in response should select the redirect target', () => {
        // given
        const expectedRoot = { id: 'id' } as HydraResource
        const resources = new ResourceGraph()
        resources.add(expectedRoot)
        const response = {
            requestedUri: 'id',
        } as IHydraResponse

        // when
        const root = ExactIdMatchSelector.selectRoot(resources, response)

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy()
    })

    it('should handle inconsistently encoded id', () => {
        // given
        const expectedRoot = { id: 'http://wikibus-test.gear.host/magazine/Ciężarówki Świata' } as HydraResource
        const resources = new ResourceGraph()
        resources.add(expectedRoot)
        const response = {
            requestedUri: 'http://wikibus-test.gear.host/magazine/Ciężarówki%20Świata',
        } as IHydraResponse

        // when
        const root = ExactIdMatchSelector.selectRoot(resources, response)

        // then
        expect(Object.is(root, expectedRoot)).toBeTruthy()
    })
})
