import { addExplicitStatementsInferredFromMemberAssertion } from '../../src/inferences'
import * as specGraphs from './managesBlock-spec-graphs'

describe('manages block inference', () => {
    it('adds rdf:type triples', async () => {
        // given
        const dataset = await specGraphs.managesWithType()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('adds triples for multiple manages blocks', async () => {
        // given
        const dataset = await specGraphs.multipleMemberAssertions()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('ignores malformed manages blocks', async () => {
        // given
        const dataset = await specGraphs.incompleteMemberAssertions()

        // when
        dataset.addAll([...addExplicitStatementsInferredFromMemberAssertion(dataset)])

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })
})
