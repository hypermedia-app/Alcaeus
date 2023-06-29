import { expect } from 'chai'
import { ResponseWrapper } from '../../src/ResponseWrapper.js'
import { redirectTarget } from '../../src/RootSelectors/redirectTarget.js'

describe('RootSelector', () => {
  describe('redirectTarget', () => {
    it('when resource is in response should select the redirect target', () => {
      // given
      const response = {
        redirectUrl: 'redirected-to',
      } as ResponseWrapper

      // when
      const root = redirectTarget(response)

      // then
      expect(root!.value).to.eq('redirected-to')
    })
  })
})
