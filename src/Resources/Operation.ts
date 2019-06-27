import { nonenumerable } from 'core-decorators'
import { IHydraClient } from '../alcaeus'
import { MediaTypes } from '../Constants'
import { HydraResource, IOperation, SupportedOperation } from './index'
import { IResource } from './Resource'

const supportedOperations = new WeakMap<IOperation, SupportedOperation>()
const resources = new WeakMap<IOperation, IResource>()
const clients = new WeakMap<IOperation, IHydraClient>()

export class Operation implements IOperation {
    public constructor (supportedOperation: SupportedOperation, alcaeus: IHydraClient, resource: HydraResource) {
        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter')
        }

        supportedOperations.set(this, supportedOperation)
        resources.set(this, resource)
        clients.set(this, alcaeus)
    }

    public get method (): string {
        return this._supportedOperation.method
    }

    public get expects () {
        return this._supportedOperation.expects
    }

    public get returns () {
        return this._supportedOperation.returns
    }

    public get requiresInput (): boolean {
        return this._supportedOperation.requiresInput
    }

    public get title (): string {
        return this._supportedOperation.title
    }

    public get description (): string {
        return this._supportedOperation.description
    }

    @nonenumerable
    protected get _supportedOperation () {
        return supportedOperations.get(this)
    }

    @nonenumerable
    protected get _resource (): IResource {
        return resources.get(this)
    }

    public invoke (body: BodyInit, mediaType = MediaTypes.jsonLd) {
        const alcaeus = clients.get(this)
        return alcaeus.invokeOperation(this, this._resource.id, body, mediaType)
    }
}
