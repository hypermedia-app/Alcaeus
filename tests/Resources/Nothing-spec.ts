import cf from 'clownface'
import $rdf from 'rdf-ext'
import { NothingMixin } from '../../src/Resources/Nothing'
import Resource from '../../src/Resources/Resource'
import { owl } from '../../src/Vocabs'

class Nothing extends NothingMixin(Resource) {}

describe('Nothing', () => {
    const nothing = new Nothing(cf({
        dataset: $rdf.dataset(),
    }).node(owl.Nothing))

    it('has title and description', () => {
        expect(nothing.title).toEqual('Nothing')
        expect(nothing.description).toEqual('Nothing')
    })

    it('applies to owl:Nothing', () => {
        expect(NothingMixin.shouldApply(nothing)).toEqual(true)
    })
})
