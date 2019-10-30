import $rdf from 'rdf-ext'
import { Core } from '../../Constants'

function countNotNull (...args: (object | null)[]) {
    return args.reduce((previousValue, currentValue) => {
        if (currentValue) {
            return previousValue + 1
        }

        return previousValue
    }, 0)
}

export function addExplicitStatementsInferredFromManagesBlock (dataset) {
    const managesBlocks = dataset.match(null, $rdf.namedNode(Core.Vocab('manages')), null, null).toArray()
        .map(manages => {
            const collection = manages.subject
            const objectMatches = dataset.match(manages.object, $rdf.namedNode(Core.Vocab('object'), null, null))
            const subjectMatches = dataset.match(manages.object, $rdf.namedNode(Core.Vocab('subject'), null, null))
            const propertyMatches = dataset.match(manages.object, $rdf.namedNode(Core.Vocab('property'), null, null))

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

        const members = dataset.match(collection, $rdf.namedNode(Core.Vocab('member'), null, null))

        members.forEach(memberQuad => {
            const member = memberQuad.object
            dataset.add($rdf.triple(
                subject || member,
                property || member,
                object || member,
            ))
        })
    })
}
