import { owl } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { NothingMixin } from 'alcaeus-model/Nothing.js'
import $rdf from '../env.js'
import { Resource } from './_TestResource.js'

class Nothing extends NothingMixin(Resource) {}

describe('Nothing', () => {
  const nothing = new Nothing($rdf.clownface({
    dataset: $rdf.dataset(),
  }).node(owl.Nothing), $rdf)

  it('has title and description', () => {
    expect(nothing.title).to.eq('Nothing')
    expect(nothing.description).to.eq('Nothing')
  })

  it('applies to owl:Nothing', () => {
    expect(NothingMixin.shouldApply(nothing)).to.eq(true)
  })
})
