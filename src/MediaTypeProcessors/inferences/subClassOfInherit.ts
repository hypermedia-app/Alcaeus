import $rdf from 'rdf-ext'
import { NamedNode, Quad, Term } from 'rdf-js'
import { Core } from '../../Constants'
import { rdf, rdfs } from '../../Vocabs'

const rdfType = $rdf.namedNode(rdf.type)
const subClassOf = $rdf.namedNode(rdfs('subClassOf'))
const hydraClass = $rdf.namedNode(Core.Vocab('Class'))

function reAssert (superClass: Term, subClass: Term, dataset: any, prop: NamedNode) {
    const triplesToReassert = dataset.match(superClass, prop, null, null).toArray() as Quad[]

    triplesToReassert.forEach(quad => {
        dataset.add($rdf.triple(
            subClass,
            prop,
            quad.object,
        ))
    })
}

export function inheritFromSuperclasses (dataset: any) {
    const rootClasses = dataset.match(null, rdfType, hydraClass, null)
        .filter((quad: Quad) => {
            return dataset.match(quad.subject, subClassOf, null, null).length === 0
        })
        .toArray() as Quad[]

    let classQueue = rootClasses.map((quad: Quad) => quad.subject)
    const doneClass: string[] = []

    while (classQueue.length) {
        const superClass = classQueue.shift()
        if (!superClass || doneClass.includes(superClass.value)) {
            continue
        }
        doneClass.push(superClass.value)
        const subclasses = (dataset.match(null, subClassOf, superClass, null).toArray() as Quad[]).map(q => q.subject)
        classQueue = [...classQueue, ...subclasses]

        subclasses.forEach(subclass => {
            dataset.add($rdf.triple(
                subclass,
                rdfType,
                hydraClass
            ))
            reAssert(superClass, subclass, dataset, $rdf.namedNode(Core.Vocab('supportedProperty')))
            reAssert(superClass, subclass, dataset, $rdf.namedNode(Core.Vocab('supportedOperation')))
        })
    }
}
