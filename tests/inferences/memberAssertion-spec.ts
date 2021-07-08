import { addExplicitStatementsInferredFromMemberAssertion } from '../../src/inferences'
import * as specGraphs from './memberAssertion-spec-graphs'

describe('member assertion inference', () => {
    it('adds rdf:type triples', async () => {
        // given
        const dataset = await specGraphs.memberAssertionWithType()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('adds triples for multiple member assertions', async () => {
        // given
        const dataset = await specGraphs.multipleMemberAssertions()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('ignores malformed member assertion', async () => {
        // given
        const dataset = await specGraphs.incompleteMemberAssertions()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })
})
