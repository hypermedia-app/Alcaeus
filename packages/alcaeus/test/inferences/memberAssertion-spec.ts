import chai, { expect } from 'chai'
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot'
import { addExplicitStatementsInferredFromMemberAssertion } from '../../inferences/memberAssertion.js'
import env from '../env.js'
import * as specGraphs from './memberAssertion-spec-graphs.js'

describe('member assertion inference', () => {
  chai.use(jestSnapshotPlugin())

  it('adds rdf:type triples', async () => {
    // given
    const dataset = await specGraphs.memberAssertionWithType()

    // when
    dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset, env)])

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('adds triples for multiple member assertions', async () => {
    // given
    const dataset = await specGraphs.multipleMemberAssertions()

    // when
    dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset, env)])

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('ignores malformed member assertion', async () => {
    // given
    const dataset = await specGraphs.incompleteMemberAssertions()

    // when
    dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset, env)])

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })
})
