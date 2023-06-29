import { expect } from 'chai'
import { inferTypesFromPropertyRanges } from '../../src/inferences/index.js'
import * as specGraphs from './propertyTypes-spec-graphs.js'

describe('property types inference', () => {
  it('adds rdf:type assertions for known properties', async () => {
    // given
    const dataset = await specGraphs.managesWithType()

    // when
    dataset.addAll([...inferTypesFromPropertyRanges(dataset)])

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })
})
