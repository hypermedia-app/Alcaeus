import {nonenumerable} from 'core-decorators';
import {JsonLd} from '../Constants';
import {IApiDocumentation, IHydraResource, IResource, ISupportedOperation} from '../interfaces';
import {ReverseLinks} from './Maps';
import {Operation} from './Operation';
import Resource from './Resource';

const apiDocumentation = new WeakMap<IResource, IApiDocumentation>();

export default class extends Resource implements IHydraResource {
    constructor(actualResource, apiDoc: IApiDocumentation, incomingLinks) {
        super(actualResource);

        apiDocumentation.set(this, apiDoc);
        ReverseLinks.set(this, incomingLinks);
    }

    @nonenumerable
    get apiDocumentation(): IApiDocumentation {
        return apiDocumentation.get(this);
    }

    @nonenumerable
    get operations() {
        let classOperations;
        const alcaeus = (this as any)._alcaeus;
        if (Array.isArray(this[JsonLd.Type])) {
            classOperations = this[JsonLd.Type].map((type: string) => this.apiDocumentation.getOperations(type));
        } else {
            classOperations = [ this.apiDocumentation.getOperations(this[JsonLd.Type]) ];
        }

        const mappedLinks = ReverseLinks.get(this)
            .map((link) => link.subject.types.map((type) => ({type, predicate: link.predicate})));
        const flattened = [].concat.apply([], mappedLinks);
        const propertyOperations = flattened.map(
            (link: any) => this.apiDocumentation.getOperations(link.type, link.predicate));

        const operations = [].concat.apply([], [...classOperations, ...propertyOperations]);
        return operations.map((supportedOperation: ISupportedOperation) => {
            return new Operation(supportedOperation, alcaeus, this);
        });
    }
}
