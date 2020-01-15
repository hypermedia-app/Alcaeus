import { createGraph } from '../../test-utils'

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

const incompleteManagesBlocksGraph = `
  <collection> 
      a hydra:Collection ;
      hydra:manages [
        hydra:property rdf:type ;
        hydra:object <vocab#Member> ; # manages block must only have two objects
        hydra:subject rdf:bar
      ], [
        hydra:subject <member3> # manages block must only have two objects
      ] ;
      hydra:member <member1>, <member2> .`

export const managesWithType = createGraph(managesWithTypeGraph)
export const multipleManagesBlocks = createGraph(multipleManagesBlocksGraph)
export const incompleteManagesBlocks = createGraph(incompleteManagesBlocksGraph)
