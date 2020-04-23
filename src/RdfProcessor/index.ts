import createDs from 'rdf-dataset-indexed'
import { DatasetCore, Stream } from 'rdf-js'
import * as inferences from './inferences'

function runInferences(dataset: DatasetCore) {
    Object.values(inferences).forEach(inference => inference(dataset))
}

export default {
    async process(quadStream: Stream) {
        const dataset = await (createDs() as any).import(quadStream)
        runInferences(dataset)

        return dataset.toStream()
    },
}
