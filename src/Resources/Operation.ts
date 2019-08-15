import { IHydraClient } from '../alcaeus'
import { MediaTypes } from '../Constants'
import { HydraResource, IOperation, SupportedOperation } from './index'

const supportedOperations = new WeakMap<Operation, SupportedOperation>()
const resources = new WeakMap<Operation, HydraResource>()
const clients = new WeakMap<Operation, IHydraClient>()

export class Operation implements IOperation {
    public constructor (supportedOperation: SupportedOperation, alcaeus: IHydraClient, resource: HydraResource) {
        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter')
        }
        if (!alcaeus) {
            throw new Error('Missing alcaeus parameter')
        }
        if (!resource) {
            throw new Error('Missing resource parameter')
        }

        supportedOperations.set(this, supportedOperation)
        resources.set(this, resource)
        clients.set(this, alcaeus)
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

    public get supportedOperation () {
        const supportedOperation = supportedOperations.get(this)

        if (!supportedOperation) {
            throw new Error('Supported operation was not found for operation')
        }

        return supportedOperation
    }

    public get target () {
        const resource = resources.get(this)

        if (resource) {
            return resource
        }

        throw new Error('Could not determine the target of the operation')
    }

    public invoke (body?: BodyInit, headers: HeadersInit = { 'content-type': MediaTypes.jsonLd }) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const alcaeus = clients.get(this)!

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return alcaeus.invokeOperation(this, this.target.id, body, headers)
    }
}
