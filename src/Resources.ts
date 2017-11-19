import {promises as jsonld} from 'jsonld';
import {nonenumerable} from 'core-decorators';
import {JsonLd, Core, MediaTypes} from './Constants';
import {
    IOperation, ISupportedOperation, IHydraClient, IHydraResource, IClass, IResource,
    IPartialCollectionView, IApiDocumentation, ICollection, IIriTemplate, IIriTemplateMapping, VariableRepresentation
} from "./interfaces";
import {IIncomingLink} from "./internals";
import ensureArray from "./ResourceHelper";

const _isProcessed = new WeakMap<IResource, boolean>();
const _apiDocumentation = new WeakMap<IResource, IApiDocumentation>();
const _incomingLinks = new WeakMap<IResource, IIncomingLink[]>();
const _alcaeus = new WeakMap<IResource, IHydraClient>();
const _supportedOperation = new WeakMap<IOperation, ISupportedOperation>();
const _resource = new WeakMap<IOperation, IResource>();

export class Resource implements IResource {

    constructor(actualResource:any) {
        Object.assign(this, actualResource);

        _isProcessed.set(this, false);
    }

    @nonenumerable
    get id() {
        return this[JsonLd.Id];
    }

    @nonenumerable
    get types() {
        let types = this[JsonLd.Type];

        if(typeof types === 'string'){
            return [ types ];
        }

        if(typeof types === 'undefined') {
            return [];
        }

        return types;
    }

    @nonenumerable
    get _processed() {
        return _isProcessed.get(this);
    }

    set _processed(val:boolean) {
        _isProcessed.set(this, val);
    }

    compact(context:any = null) {
        return jsonld.compact(this, context || Core.Context);
    }
}

export class HydraResource extends Resource implements IHydraResource {
    constructor(alcaeus:IHydraClient, actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        super(actualResource);

        _apiDocumentation.set(this, apiDoc);
        _incomingLinks.set(this, incomingLinks);
        _alcaeus.set(this, alcaeus);
    }

    @nonenumerable
    get apiDocumentation(): IApiDocumentation {
        return _apiDocumentation.get(this);
    }

    @nonenumerable
    get _alcaeus() {
        return _alcaeus.get(this);
    }

    getIncomingLinks():Array<IIncomingLink> {
        return _incomingLinks.get(this);
    }

    @nonenumerable
    get operations() {
        let classOperations;
        if(Array.isArray(this[JsonLd.Type])) {
            classOperations = this[JsonLd.Type].map((type:string) => this.apiDocumentation.getOperations(type));
        } else {
            classOperations = [ this.apiDocumentation.getOperations(this[JsonLd.Type]) ];
        }

        const mappedLinks = this.getIncomingLinks()
            .map(link => link.subject.types.map(type => ({type: type, predicate: link.predicate})));
        const flattened = [].concat.apply([], mappedLinks);
        const propertyOperations = flattened.map((link: any) => this.apiDocumentation.getOperations(link.type, link.predicate));

        const operations = [].concat.apply([], [...classOperations, ...propertyOperations]);
        return operations.map((supportedOperation:ISupportedOperation) => {
            return new Operation(supportedOperation, this._alcaeus, this);
        });
    }
}

export class IriTemplate extends Resource implements IIriTemplate {
    @nonenumerable
    get mappings() {
        return ensureArray(this, Core.Vocab.mapping);
    }

    @nonenumerable
    get variableRepresentation(): VariableRepresentation {
        return this[Core.Vocab.variableRepresentation] || 'BasicRepresentation';
    }
}

export class IriTemplateMapping extends Resource implements IIriTemplateMapping {
    @nonenumerable
    get variable() {
        return this[Core.Vocab.variable];
    }

    @nonenumerable
    get property() {
        return this[Core.Vocab.property];
    }

    @nonenumerable
    get required() {
        return this[Core.Vocab.required] || false;
    }
}

export class Operation extends Resource implements IOperation {

    constructor(supportedOperation: ISupportedOperation, alcaeus: IHydraClient, resource: IHydraResource) {
        super(resource);

        if(!supportedOperation) {
            throw new Error('Missing supportedOperation parameter');
        }

        if(!alcaeus) {
            throw new Error('Missing alcaeus parameter');
        }

        _supportedOperation.set(this, supportedOperation);
        _resource.set(this, resource);
        _alcaeus.set(this, alcaeus);
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

    @nonenumerable
    get _alcaeus():IHydraClient {
        return _alcaeus.get(this);
    }

    invoke(body:any, mediaType = MediaTypes.jsonLd) {
        return this._alcaeus.invokeOperation(this, this._resource.id, body, mediaType);
    }
}

export class PartialCollectionView extends HydraResource implements IPartialCollectionView {

    @nonenumerable
    get first() { return this[Core.Vocab.first] || null; }

    @nonenumerable
    get previous() { return this[Core.Vocab.previous] || null; }

    @nonenumerable
    get next() { return this[Core.Vocab.next] || null; }

    @nonenumerable
    get last() { return this[Core.Vocab.last] || null; }

    @nonenumerable
    get collection():IHydraResource {
        const collectionLink = this.getIncomingLinks().find((linkArray: IIncomingLink) => {
            return linkArray.predicate === Core.Vocab.view
        });

        return collectionLink ? collectionLink.subject : null
    }
}

export class Collection extends HydraResource implements ICollection {
    @nonenumerable
    get members(): IHydraResource[] {
        const members = this[Core.Vocab.member];

        if(Array.isArray(members) === false) {
            return [ members ];
        }

        return members;
    }

    @nonenumerable
    get views(): IPartialCollectionView[] {
        return ensureArray(this, Core.Vocab.view);
    }
}
