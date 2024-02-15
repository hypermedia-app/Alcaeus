import type { DatasetCore, Quad } from '@rdfjs/types'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraEnvironment } from 'alcaeus-core'

export function * addExplicitStatementsInferredFromMemberAssertion(dataset: DatasetCore, env: HydraEnvironment): Iterable<Quad> {
  for (const collection of env.clownface({ dataset }).has([hydra.manages, hydra.memberAssertion]).toArray()) {
    const assertions = collection.out([hydra.manages, hydra.memberAssertion]).toArray()

    for (const member of collection.out(hydra.member).toArray()) {
      for (const assertion of assertions) {
        let blanks = 0

        let subject = assertion.out(hydra.subject)
        let predicate = assertion.out(hydra.property)
        let object = assertion.out(hydra.object)

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
          for (const s of subject.terms) {
            for (const p of predicate.terms) {
              for (const o of object.terms) {
                yield env.quad(<any>s, <any>p, <any>o)
              }
            }
          }
        }
      }
    }
  }
}
