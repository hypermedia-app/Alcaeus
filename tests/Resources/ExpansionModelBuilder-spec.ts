import { hydra, rdf, schema } from '@tpluscode/rdf-ns-builders'
import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode } from 'rdf-js'
import namespace from '@rdfjs/namespace'
import ExpansionModelBuilderMixin, { ExpandedValue } from '../../src/Resources/Mixins/ExpansionModelBuilder'
import { IriTemplateMixin } from '../../src/Resources/Mixins/IriTemplate'
import { Resource } from './_TestResource'

const ex = namespace('http://example.com/vocab#')

class ExpansionModelBuilder extends ExpansionModelBuilderMixin(IriTemplateMixin(Resource)) {
    public mapExpandedValue(value: ExpandedValue) {
        return value['@value']
    }

    public mapShorthandValue(value: string) {
        return value
    }
}

describe('ExpansionModelBuilder', () => {
    let node: GraphPointer<BlankNode>
    let builder: ExpansionModelBuilder

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() }).blankNode()

        node.addOut(rdf.type, hydra.IriTemplate)
    })

    describe('expand', () => {
        it('uses parent name node identifier to resolve relative references', () => {
            const params = {
                [schema.name.value]: 'John',
                [ex.tag.value]: 'friend',
            }
            node.addOut(hydra.mapping, mapping => {
                mapping.addOut(hydra.property, schema.name)
                mapping.addOut(hydra.variable, 'name')
            })
            node.addOut(hydra.mapping, mapping => {
                mapping.addOut(hydra.property, ex.tag)
                mapping.addOut(hydra.variable, 'tag')
            })
            node.addOut(hydra.template, '{?name,tag}')
            const parent = new Resource(node.namedNode('http://example.com/collection/'))

            // when
            builder = new ExpansionModelBuilder(node, {}, parent)
            const expanded = builder.expand(params)

            // then
            expect(expanded).toEqual('http://example.com/collection/?name=John&tag=friend')
        })

        it('does not resolve relative references when parent is a blank node', () => {
            const params = {
                [schema.name.value]: 'John',
                [ex.tag.value]: 'friend',
            }
            node.addOut(hydra.mapping, mapping => {
                mapping.addOut(hydra.property, schema.name)
                mapping.addOut(hydra.variable, 'name')
            })
            node.addOut(hydra.mapping, mapping => {
                mapping.addOut(hydra.property, ex.tag)
                mapping.addOut(hydra.variable, 'tag')
            })
            node.addOut(hydra.template, '{?name,tag}')
            const parent = new Resource(node.blankNode())

            // when
            builder = new ExpansionModelBuilder(node, {}, parent)
            const expanded = builder.expand(params)

            // then
            expect(expanded).toEqual('?name=John&tag=friend')
        })
    })
})
