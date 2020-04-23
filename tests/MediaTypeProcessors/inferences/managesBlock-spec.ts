import { addExplicitStatementsInferredFromManagesBlock } from '../../../src/RdfProcessor/inferences'
import * as specGraphs from './managesBlock-spec-graphs'

describe('manages block inference', () => {
    it('adds rdf:type triples', async () => {
        // given
        const dataset = await specGraphs.managesWithType()

        // when
        addExplicitStatementsInferredFromManagesBlock(dataset)

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('adds triples for multiple manages blocks', async () => {
        // given
        const dataset = await specGraphs.multipleManagesBlocks()

        // when
        addExplicitStatementsInferredFromManagesBlock(dataset)

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('ignores malformed manages blocks', async () => {
        // given
        const dataset = await specGraphs.incompleteManagesBlocks()

        // when
        addExplicitStatementsInferredFromManagesBlock(dataset)

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })
})
