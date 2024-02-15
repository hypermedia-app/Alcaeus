import { expect } from 'chai'
import { inferTypesFromPropertyRanges } from '../../inferences/propertyTypes.js'
import env from '../env.js'
import * as specGraphs from './propertyTypes-spec-graphs.js'

describe('property types inference', () => {
  it('adds rdf:type assertions for known properties', async () => {
    // given
    const dataset = await specGraphs.managesWithType()

    // when
    dataset.addAll([...inferTypesFromPropertyRanges(dataset, env)])

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })
})
