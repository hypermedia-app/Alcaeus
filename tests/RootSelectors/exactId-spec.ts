import $rdf from 'rdf-ext'
import { HydraResponse } from '../../src/HydraResponse'
import { HydraResource } from '../../src/Resources'
import { exactId } from '../../src/RootSelectors/exactId'

describe('RootSelector', () => {
    describe('exactId', () => {
        it('when resource is in response should select the redirect target', () => {
            // given
            const expectedRoot = { id: $rdf.namedNode('id') } as Partial<HydraResource>
            const resources = new Map<string, HydraResource>()
            resources.set('id', expectedRoot as any)
            const response = {
                requestedUri: 'id',
            } as HydraResponse

            // when
            const root = exactId(resources, response)

            // then
            expect(Object.is(root, expectedRoot)).toBeTruthy()
        })
    })
})
