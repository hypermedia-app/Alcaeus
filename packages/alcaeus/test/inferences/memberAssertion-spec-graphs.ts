import { createGraph } from '../test-utils.js'

const memberAssertionWithTypeGraph = `
    <collection> 
      a hydra:Collection ;
      hydra:memberAssertion [
        hydra:property rdf:type ;
        hydra:object <vocab#Member>
      ] ;
      hydra:member <member1>, <member2> .
`

const multipleMemberAssertionsGraph = `
    <collection> 
      a hydra:Collection ;
      hydra:memberAssertion [
        hydra:property rdf:type ;
        hydra:object <vocab#Member>
      ], [
        hydra:property foaf:friend ;
        hydra:subject <member3> ;
      ] ;
      hydra:member <member1>, <member2> .
`

const incompleteMemberAssertionsGraph = `
  <collection> 
      a hydra:Collection ;
      hydra:memberAssertion [
        hydra:property rdf:type ;
        hydra:object <vocab#Member> ; # member assertion must only have two objects
        hydra:subject rdf:bar
      ], [
        hydra:subject <member3> # member assertion must only have two objects
      ] ;
      hydra:member <member1>, <member2> .`

export const memberAssertionWithType = createGraph(memberAssertionWithTypeGraph)
export const multipleMemberAssertions = createGraph(multipleMemberAssertionsGraph)
export const incompleteMemberAssertions = createGraph(incompleteMemberAssertionsGraph)
