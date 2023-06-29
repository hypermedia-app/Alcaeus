import $rdf from 'rdf-ext'
import clownface from 'clownface'
import { hydra, rdf, schema } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { ResponseWrapper } from '../../src/ResponseWrapper.js'
import { problemDetails } from '../../src/RootSelectors/problemDetails.js'

describe('RootSelector', () => {
  describe('problemDetails', () => {
    it('returns undefined when response is not application/problem+json', () => {
      // given
      const response = {
        resourceUri: 'id',
        xhr: {
          headers: new Headers({
            'content-type': 'application/ld+json',
          }),
        },
      } as ResponseWrapper

      // when
      const root = problemDetails(response, $rdf.dataset())

      // then
      expect(root).to.be.undefined
    })

    it('returns top node when response is application/problem+json', () => {
      // given
      const dataset = $rdf.dataset()
      clownface({ dataset })
        .blankNode('foo')
        .addOut(schema.identifier, id => {
          id.addOut(schema.value, 'foo')
        })
        .addOut(schema.name, 'error')
      const response = {
        resourceUri: 'id',
        xhr: {
          headers: new Headers({
            'content-type': 'application/problem+json',
          }),
        },
      } as ResponseWrapper

      // when
      const root = problemDetails(response, dataset)

      // then
      expect(root).to.deep.eq($rdf.blankNode('foo'))
    })

    it('returns top node when response is application/problem+json with params', () => {
      // given
      const dataset = $rdf.dataset()
      clownface({ dataset })
        .blankNode('foo')
        .addOut(schema.identifier, id => {
          id.addOut(schema.value, 'foo')
        })
      const response = {
        resourceUri: 'id',
        xhr: {
          headers: new Headers({
            'content-type': 'application/problem+json; profile=foobar',
          }),
        },
      } as ResponseWrapper

      // when
      const root = problemDetails(response, dataset)

      // then
      expect(root).to.deep.eq($rdf.blankNode('foo'))
    })

    it('returns node with rdf:type hydra:Error', () => {
      // given
      const dataset = $rdf.dataset()
      clownface({ dataset })
        .blankNode('foo')
        .addOut(schema.identifier, id => {
          id.addOut(schema.value, 'foo')
        })
        .blankNode('bar')
        .addOut(rdf.type, hydra.Error)
        .addOut(schema.identifier, id => {
          id.addOut(schema.value, 'bar')
        })
      const response = {
        resourceUri: 'id',
        xhr: {
          headers: new Headers({
            'content-type': 'application/problem+json',
          }),
        },
      } as ResponseWrapper

      // when
      const root = problemDetails(response, dataset)

      // then
      expect(root).to.deep.eq($rdf.blankNode('bar'))
    })
  })
})
