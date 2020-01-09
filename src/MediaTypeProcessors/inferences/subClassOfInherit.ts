import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { NamedNode, Quad, Term } from 'rdf-js'
import { rdf, rdfs, hydra } from '../../Vocabs'

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

export function inheritFromSuperclasses (dataset: DatasetExt) {
    const rootClasses = dataset.match(null, rdf.type, hydra.Class, null)
        .filter((quad: Quad) => {
            return dataset.match(quad.subject, rdfs.subClassOf, null, null).length === 0
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
        const subclasses = (dataset.match(null, rdfs.subClassOf, superClass, null).toArray() as Quad[]).map(q => q.subject)
        classQueue = [...classQueue, ...subclasses]

        subclasses.forEach(subclass => {
            dataset.add($rdf.triple(
                subclass,
                rdf.type,
                hydra.Class
            ))
            reAssert(superClass, subclass, dataset, hydra.supportedProperty)
            reAssert(superClass, subclass, dataset, hydra.supportedOperation)
        })
    }
}
