import {IApiDocumentation, IHydraClient, IHydraResource, IResource, ISupportedOperation} from "../interfaces";
import {nonenumerable} from "core-decorators";
import {Operation} from "./Operation";
import {JsonLd} from "../Constants";
import Resource from "./Resource";
import {ReverseLinks} from "./Maps";

const _apiDocumentation = new WeakMap<IResource, IApiDocumentation>();

export default class extends Resource implements IHydraResource {
    constructor(alcaeus:IHydraClient, actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        super(alcaeus, actualResource);

        _apiDocumentation.set(this, apiDoc);
        ReverseLinks.set(this, incomingLinks);
    }

    @nonenumerable
    get apiDocumentation(): IApiDocumentation {
        return _apiDocumentation.get(this);
    }

    @nonenumerable
    get operations() {
        let classOperations;
        if(Array.isArray(this[JsonLd.Type])) {
            classOperations = this[JsonLd.Type].map((type:string) => this.apiDocumentation.getOperations(type));
        } else {
            classOperations = [ this.apiDocumentation.getOperations(this[JsonLd.Type]) ];
        }

        const mappedLinks = ReverseLinks.get(this)
            .map(link => link.subject.types.map(type => ({type: type, predicate: link.predicate})));
        const flattened = [].concat.apply([], mappedLinks);
        const propertyOperations = flattened.map((link: any) => this.apiDocumentation.getOperations(link.type, link.predicate));

        const operations = [].concat.apply([], [...classOperations, ...propertyOperations]);
        return operations.map((supportedOperation:ISupportedOperation) => {
            return new Operation(supportedOperation, this._alcaeus, this);
        });
    }
}
