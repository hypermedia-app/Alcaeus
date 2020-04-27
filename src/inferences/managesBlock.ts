import cf, { Clownface } from 'clownface'
import { DatasetCore } from 'rdf-js'
import { hydra } from '@tpluscode/rdf-ns-builders'

interface ManagesBlockAssertion {
    subject: Clownface
    predicate: Clownface
    object: Clownface
}

export function addExplicitStatementsInferredFromManagesBlock(dataset: DatasetCore) {
    cf({ dataset }).has(hydra.manages).forEach(collection => {
        const managesBlocks = collection.out(hydra.manages)

        collection.out(hydra.member).forEach(member => {
            managesBlocks.forEach(managesBlock => {
                let blanks = 0

                let subject = managesBlock.out(hydra.subject)
                let predicate = managesBlock.out(hydra.property)
                let object = managesBlock.out(hydra.object)

                if (subject.terms.length === 0) {
                    subject = member
                    blanks++
                }

                if (predicate.terms.length === 0) {
                    predicate = member
                    blanks++
                }

                if (object.terms.length === 0) {
                    object = member
                    blanks++
                }

                if (blanks === 1) {
                    subject.addOut(predicate, object)
                }
            })
        })
    })
}
