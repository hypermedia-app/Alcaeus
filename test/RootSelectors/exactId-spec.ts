import $rdf from 'rdf-ext'
import { expect } from 'chai'
import { ResponseWrapper } from '../../src/ResponseWrapper.js'
import { exactId } from '../../src/RootSelectors/exactId.js'

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
      expect(root).to.deep.eq($rdf.namedNode('id'))
    })
  })
})
