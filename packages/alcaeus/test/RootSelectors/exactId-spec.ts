import { expect } from 'chai'
import { ResponseWrapper } from 'alcaeus-core'
import { exactId } from '../../RootSelectors/exactId.js'
import $rdf from '../env.js'

describe('RootSelector', () => {
  describe('exactId', () => {
    it('when resource is in response should select the redirect target', () => {
      // given
      const response = {
        resourceUri: 'id',
      } as ResponseWrapper

      // when
      const root = exactId($rdf, response)

      // then
      expect(root).to.deep.eq($rdf.namedNode('id'))
    })
  })
})
