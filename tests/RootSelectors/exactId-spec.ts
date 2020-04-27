import $rdf from 'rdf-ext'
import { ResponseWrapper } from '../../src/ResponseWrapper'
import { exactId } from '../../src/RootSelectors/exactId'

describe('RootSelector', () => {
    describe('exactId', () => {
        it('when resource is in response should select the redirect target', () => {
            // given
            const response = {
                resourceUri: 'id',
            } as ResponseWrapper

            // when
            const root = exactId(response)

            // then
            expect(root).toEqual($rdf.namedNode('id'))
        })
    })
})
