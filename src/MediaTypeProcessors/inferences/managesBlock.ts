import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { hydra } from '../../Vocabs'

function countNotNull (...args: (object | null)[]) {
    return args.reduce((previousValue, currentValue) => {
        if (currentValue) {
            return previousValue + 1
        }

        return previousValue
    }, 0)
}

// todo: can this be replaced with rdfine features? or use clownface
export function addExplicitStatementsInferredFromManagesBlock (dataset: DatasetExt) {
    const managesBlocks = dataset.match(null, hydra.manages, null, null).toArray()
        .map(manages => {
            const collection = manages.subject
            const objectMatches = dataset.match(manages.object, hydra.object, null, null)
            const subjectMatches = dataset.match(manages.object, hydra.subject, null, null)
            const propertyMatches = dataset.match(manages.object, hydra.property, null, null)

            return {
                collection,
                subject: subjectMatches.length === 1 ? subjectMatches.toArray()[0].object : null,
                property: propertyMatches.length === 1 ? propertyMatches.toArray()[0].object : null,
                object: objectMatches.length === 1 ? objectMatches.toArray()[0].object : null,
            }
        })

    managesBlocks.forEach(({ collection, object, property, subject }) => {
        if (countNotNull(object, property, subject) !== 2) {
            return
        }

        const members = dataset.match(collection, hydra.member, null, null)

        members.forEach(memberQuad => {
            const member = memberQuad.object as any
            dataset.add($rdf.triple(
                subject || member,
                property || member,
                object || member,
            ))
        })
    })
}
