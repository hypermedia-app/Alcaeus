import {nonenumerable} from 'core-decorators';
import {MediaTypes} from '../Constants';
import {IClass, IHydraClient, IHydraResource, IOperation, IResource, ISupportedOperation} from '../interfaces';
import Resource from './Resource';

const supportedOperations = new WeakMap<IOperation, ISupportedOperation>();
const resources = new WeakMap<IOperation, IResource>();
const clients = new WeakMap<IOperation, IHydraClient>();

export class Operation extends Resource implements IOperation {

    constructor(supportedOperation: ISupportedOperation, alcaeus: IHydraClient, resource: IHydraResource) {
        super(resource);

        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter');
        }

        supportedOperations.set(this, supportedOperation);
        resources.set(this, resource);
        clients.set(this, alcaeus);
    }

    get method(): string {
        return this._supportedOperation.method;
    }

    get expects(): IClass {
        return this._supportedOperation.expects;
    }

    get returns(): IClass {
        return this._supportedOperation.returns;
    }

    get requiresInput(): boolean {
        return this._supportedOperation.requiresInput;
    }

    get title(): string {
        return this._supportedOperation.title;
    }

    get description(): string {
        return this._supportedOperation.description;
    }

    @nonenumerable
    get _supportedOperation(): ISupportedOperation {
        return supportedOperations.get(this);
    }

    @nonenumerable
    get _resource(): IResource {
        return resources.get(this);
    }

    public invoke(body: any, mediaType = MediaTypes.jsonLd) {
        const alcaeus = clients.get(this);
        return alcaeus.invokeOperation(this, this._resource.id, body, mediaType);
    }
}
