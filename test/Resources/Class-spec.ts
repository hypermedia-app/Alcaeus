import { NamedNode } from '@rdfjs/types'
import { turtle } from '@tpluscode/rdf-string'
import * as HydraClass from '@rdfine/hydra/lib/Class'
import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import stringToStream from 'string-to-stream'
import Parser from '@rdfjs/parser-n3'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { DatasetExt } from 'rdf-ext/lib/Dataset.js'
import { ClassMixin } from '../../src/Resources/Mixins/Class.js'
import { Resource } from './_TestResource.js'
import * as graphs from './Class-spec-graphs.js'

const parser = new Parser()
const vocab = $rdf.namespace('http://example.com/vocab#')

class Class extends ClassMixin(HydraClass.ClassMixin(Resource)) {}

describe('Class', () => {
  let hydraClassNode: GraphPointer<NamedNode>
  let dataset: DatasetExt

  beforeEach(() => {
    dataset = $rdf.dataset()
    hydraClassNode = cf({ dataset })
      .namedNode('http://example.com/vocab#SomeClass')
  })

  describe('getting operations', () => {
    it('should return operations', async () => {
      // then
      hydraClassNode.addOut(hydra.supportedOperation, hydraClassNode.blankNode())

      // when
      const clas = new Class(hydraClassNode)

      // then
      expect(clas.supportedOperation.length).to.eq(1)
    })

    it('should return from every graph', async () => {
      // then
      await dataset.import(parser.import(stringToStream(turtle`
                ${vocab.G1} {
                    ${vocab.SomeClass} ${hydra.supportedOperation} [
                       ${hydra.title} "Operation 1"
                    ] .
                }

                ${vocab.G2} {
                    ${vocab.SomeClass} ${hydra.supportedOperation} [
                        ${hydra.title} "Operation 2"
                    ] .
                }
            `.toString())))

      // when
      const clas = new Class(hydraClassNode)

      // then
      expect(clas.supportedOperation.length).to.eq(2)
      expect(clas.supportedOperation.map(so => so.title)).to.contain.all.members(
        ['Operation 1', 'Operation 2'],
      )
    })

    it('should return empty array if property is missing', () => {
      // when
      const clas = new Class(hydraClassNode)

      // then
      expect(clas.supportedOperation.length).to.eq(0)
    })

    it('should combine own operations with inherited operations', async () => {
      // given
      const dataset = await graphs.multiLevelSupportedOperations()
      const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

      // when
      const properties = clas.supportedOperation

      // then
      expect(properties).to.have.length(3)
    })

    it('should deduplicate supported operations by operation id', async () => {
      // given
      const dataset = await graphs.duplicateInheritedOperationsSameId()
      const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

      // when
      const operations = clas.supportedOperation

      // then
      expect(operations).to.have.length(1)
    })
  })

  describe('getting properties', () => {
    it('should return properties', () => {
      // given
      hydraClassNode.addOut(hydra.supportedProperty, hydraClassNode.blankNode())

      // when
      const clas = new Class(hydraClassNode)

      // then
      expect(clas.supportedProperty.length).to.eq(1)
    })

    it('should return empty array if property is missing', () => {
      const clas = new Class(hydraClassNode)

      expect(clas.supportedProperty.length).to.eq(0)
    })

    it('should combine own properties with inherited properties', async () => {
      // given
      const dataset = await graphs.multiLevelSupportedProperties()
      const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

      // when
      const properties = clas.supportedProperty

      // then
      expect(properties).to.have.length(4)
    })

    it('should deduplicate supported properties by rdf property', async () => {
      // given
      const dataset = await graphs.duplicateInheritedProperties()
      const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

      // when
      const properties = clas.supportedProperty

      // then
      expect(properties).to.have.length(1)
      expect(properties[0].title).to.eq('Overridden title')
    })
  })

  describe('getTypeHierarchy', () => {
    it('retrieves own types and superclasses', async () => {
      // given
      const dataset = await graphs.multiLevelSupportedOperations()
      const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

      // when
      const types = [...clas.getTypeHierarchy()]

      // then
      expect(types.map(t => t.id.value)).to.contain.all.members(
        [
          vocab.DraftIssue.value,
          vocab.Issue.value,
          vocab.BaseClass.value,
        ],
      )
    })
  })
})
