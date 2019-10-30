import stringToStream from 'string-to-stream'
import rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-n3'
import { prefixes } from '@zazuko/rdf-vocabularies'

const parser = new Parser()

const managesWithTypeGraph = `
    <collection> 
      a hydra:Collection ;
      hydra:manages [
        hydra:property rdf:type ;
        hydra:object <vocab#Member>
      ] ;
      hydra:member <member1>, <member2> .
`

const multipleManagesBlocksGraph = `
    <collection> 
      a hydra:Collection ;
      hydra:manages [
        hydra:property rdf:type ;
        hydra:object <vocab#Member>
      ], [
        hydra:property foaf:friend ;
        hydra:subject <member3> ;
      ] ;
      hydra:member <member1>, <member2> .
`

const malformedManagesBlocksGraph = `
  <collection> 
      a hydra:Collection ;
      hydra:manages [
        hydra:property rdf:type ;
        hydra:property rdf:foo ; # property twice
        hydra:object <vocab#Member>
      ], [
        hydra:property rdf:type ;
        hydra:object <vocab#Member> ; # manages block must only have two objects
        hydra:subject rdf:bar
      ], [
        hydra:subject <member3> # manages block must only have two objects
      ] ;
      hydra:member <member1>, <member2> .`

function createGraph (ntriples: string) {
    return async () => {
        const dataset = rdf.dataset()
        const stream = stringToStream(`
    BASE <http://example.com/>
    PREFIX rdf: <${prefixes.rdf}>
    PREFIX foaf: <${prefixes.foaf}>
    PREFIX hydra: <${prefixes.hydra}>

    ${ntriples}`)
        return dataset.import(await parser.import(stream))
    }
}

export const managesWithType = createGraph(managesWithTypeGraph)
export const multipleManagesBlocks = createGraph(multipleManagesBlocksGraph)
export const malformedManagesBlocks = createGraph(malformedManagesBlocksGraph)
