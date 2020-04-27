import { ResponseWrapper } from '../../src/ResponseWrapper'
import { trailingSlash } from '../../src/RootSelectors/trailingSlash'

describe('RootSelector', () => {
    describe('TrailingSlashSelector', () => {
        it('adds trailing slash if needed', () => {
            // given
            const response = {
                requestedUri: 'http://some/id',
            } as ResponseWrapper

            // when
            const root = trailingSlash(response)

            // then
            expect(root!.value).toEqual('http://some/id/')
        })

        it('removes trailing slash if ends in one', () => {
            // given
            const response = {
                requestedUri: 'http://some/id/',
            } as ResponseWrapper

            // when
            const root = trailingSlash(response)

            // then
            expect(root!.value).toEqual('http://some/id')
        })
    })
})
