import $rdf from 'rdf-ext'
import { DatasetCore, Stream } from 'rdf-js'
import * as inferences from './inferences'

function runInferences (dataset: DatasetCore) {
    Object.values(inferences).forEach(inference => inference(dataset))
}

export default {
    async process (quadStream: Stream) {
        const dataset = await $rdf.dataset().import(quadStream)
        runInferences(dataset)

        return dataset.toStream()
    },
}
