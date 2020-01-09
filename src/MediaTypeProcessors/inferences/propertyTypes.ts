import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { hydra, rdf } from '../../Vocabs'

const propertyRangeMappings = [
    [hydra.supportedClass, hydra.Class],
    [hydra.expects, hydra.Class],
    [hydra.returns, hydra.Class],
    [hydra.supportedOperation, hydra.Operation],
    [hydra.operation, hydra.Operation],
    [hydra.supportedProperty, hydra.SupportedProperty],
    [hydra.statusCodes, hydra.StatusCodeDescription],
    [hydra.property, rdf.Property],
    [hydra.mapping, hydra.IriTemplateMapping],
]

// todo: use clownface
export function inferTypesFromPropertyRanges (dataset: DatasetExt) {
    propertyRangeMappings.map((mapping) => {
        const matches = dataset.match(null, mapping[0], null, null)

        matches.forEach((triple) => {
            if (triple.object.termType === 'BlankNode' || triple.object.termType === 'NamedNode') {
                dataset.add($rdf.triple(
                    triple.object,
                    rdf.type,
                    mapping[1],
                ))
            }
        })
    })
}
