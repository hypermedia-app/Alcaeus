import cf from 'clownface'
import $rdf from 'rdf-ext'
import { owl } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { NothingMixin } from '../../src/Resources/Nothing.js'
import { Resource } from './_TestResource.js'

class Nothing extends NothingMixin(Resource) {}

describe('Nothing', () => {
  const nothing = new Nothing(cf({
    dataset: $rdf.dataset(),
  }).node(owl.Nothing))

  it('has title and description', () => {
    expect(nothing.title).to.eq('Nothing')
    expect(nothing.description).to.eq('Nothing')
  })

  it('applies to owl:Nothing', () => {
    expect(NothingMixin.shouldApply(nothing)).to.eq(true)
  })
})
