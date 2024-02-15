import { expect } from 'chai'
import { ResponseWrapper } from 'alcaeus-core'
import { trailingSlash } from '../../RootSelectors/trailingSlash.js'
import $rdf from '../env.js'

describe('RootSelector', () => {
  describe('TrailingSlashSelector', () => {
    it('adds trailing slash if needed', () => {
      // given
      const response = {
        requestedUri: 'http://some/id',
      } as ResponseWrapper

      // when
      const root = trailingSlash($rdf, response)

      // then
      expect(root!.value).to.eq('http://some/id/')
    })

    it('removes trailing slash if ends in one', () => {
      // given
      const response = {
        requestedUri: 'http://some/id/',
      } as ResponseWrapper

      // when
      const root = trailingSlash($rdf, response)

      // then
      expect(root!.value).to.eq('http://some/id')
    })
  })
})
