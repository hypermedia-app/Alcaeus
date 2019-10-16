import { HydraResource } from './Resources'
import { IResource } from './Resources/Resource'
import { rdf } from './Vocabs'

export class RdfList<T extends IResource = HydraResource> extends Array<T> {
    public constructor (listNode: RdfList<T>) {
        let items: T[]
        const restNode = listNode[rdf.rest]

        if (restNode instanceof RdfList) {
            items = [listNode[rdf.first], ...restNode]
        } else {
            items = []
        }

        super(...items)
    }
}
