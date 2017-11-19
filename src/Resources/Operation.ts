import {MediaTypes} from "../Constants";
import {IClass, IHydraClient, IHydraResource, IOperation, IResource, ISupportedOperation} from "../interfaces";
import {nonenumerable} from "core-decorators";
import Resource from "./Resource";

const _supportedOperation = new WeakMap<IOperation, ISupportedOperation>();
const _resource = new WeakMap<IOperation, IResource>();

export class Operation extends Resource implements IOperation {

    constructor(supportedOperation: ISupportedOperation, alcaeus: IHydraClient, resource: IHydraResource) {
        super(alcaeus, resource);

        if(!supportedOperation) {
            throw new Error('Missing supportedOperation parameter');
        }

        _supportedOperation.set(this, supportedOperation);
        _resource.set(this, resource);
    }

    get method():string {
        return this._supportedOperation.method;
    }

    get expects():IClass {
        return this._supportedOperation.expects;
    }

    get returns():IClass {
        return this._supportedOperation.returns;
    }

    get requiresInput():boolean {
        return this._supportedOperation.requiresInput;
    }

    get title():string {
        return this._supportedOperation.title;
    }

    get description():string {
        return this._supportedOperation.description;
    }

    @nonenumerable
    get _supportedOperation():ISupportedOperation {
        return _supportedOperation.get(this);
    }

    @nonenumerable
    get _resource():IResource {
        return _resource.get(this);
    }

    invoke(body:any, mediaType = MediaTypes.jsonLd) {
        return this._alcaeus.invokeOperation(this, this._resource.id, body, mediaType);
    }
}
