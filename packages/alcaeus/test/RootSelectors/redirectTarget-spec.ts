import { expect } from 'chai'
import { ResponseWrapper } from 'alcaeus-core'
import { redirectTarget } from '../../RootSelectors/redirectTarget.js'
import $rdf from '../env.js'

describe('RootSelector', () => {
  describe('redirectTarget', () => {
    it('when resource is in response should select the redirect target', () => {
      // given
      const response = {
        redirectUrl: 'redirected-to',
      } as ResponseWrapper

      // when
      const root = redirectTarget($rdf, response)

      // then
      expect(root!.value).to.eq('redirected-to')
    })
  })
})
