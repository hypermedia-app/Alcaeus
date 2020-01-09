import { RdfResource } from '@tpluscode/rdfine'
import { IHydraClient } from '../alcaeus'
import nonenumerable from '../helpers/nonenumerable'
import { HydraResource, IDocumentedResource, IOperation, ISupportedOperation } from './index'

export class Operation implements IOperation {
    public readonly supportedOperation: RdfResource & ISupportedOperation & IDocumentedResource

    public readonly target: HydraResource

    @nonenumerable
    private readonly __client: IHydraClient

    public constructor (supportedOperation: RdfResource & ISupportedOperation & IDocumentedResource, alcaeus: IHydraClient, resource: HydraResource) {
        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter')
        }
        if (!alcaeus) {
            throw new Error('Missing alcaeus parameter')
        }
        if (!resource) {
            throw new Error('Missing resource parameter')
        }

        this.supportedOperation = supportedOperation
        this.__client = alcaeus
        this.target = resource
    }

    public get method (): string {
        return this.supportedOperation.method
    }

    public get expects () {
        return this.supportedOperation.expects
    }

    public get returns () {
        return this.supportedOperation.returns
    }

    public get requiresInput (): boolean {
        return this.supportedOperation.requiresInput
    }

    public get title (): string {
        return this.supportedOperation.title
    }

    public get description (): string {
        return this.supportedOperation.description
    }

    public invoke (body?: BodyInit, headers: string | HeadersInit = { }) {
        return this.__client.invokeOperation(this, this.target.id.value, body, headers)
    }
}
