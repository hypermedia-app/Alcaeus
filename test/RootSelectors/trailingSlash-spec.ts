import { expect } from 'chai'
import { ResponseWrapper } from '../../src/ResponseWrapper.js'
import { trailingSlash } from '../../src/RootSelectors/trailingSlash.js'

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
      expect(root!.value).to.eq('http://some/id/')
    })

    it('removes trailing slash if ends in one', () => {
      // given
      const response = {
        requestedUri: 'http://some/id/',
      } as ResponseWrapper

      // when
      const root = trailingSlash(response)

      // then
      expect(root!.value).to.eq('http://some/id')
    })
  })
})
