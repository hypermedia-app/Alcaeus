'use strict';

import 'core-js/es6/array';
import {Core, JsonLd} from './Constants';
import {Schema, rdfs, owl} from './Vocabs';
import {Resource} from './Resources';
import {default as nonenumerable} from "core-decorators/lib/nonenumerable";
import {
    IApiDocumentation, IHeracles, IClass, ISupportedOperation, ISupportedProperty, IHydraResource,
    IDocumentedResource, IStatusCodeDescription, IRdfProperty
} from './interfaces';

var heraclesWeakMap = new WeakMap();

export class ApiDocumentation extends Resource implements IApiDocumentation {

    constructor(heracles:IHeracles, apiDoc:any) {
        super(apiDoc);

        heraclesWeakMap.set(this, heracles);
    }

    get classes():Array<IClass> {
        if (Array.isArray(this[Core.Vocab.supportedClass])) {
            return this[Core.Vocab.supportedClass];
        }

        return [ this[Core.Vocab.supportedClass] ];
    }

    @nonenumerable
    get _heracles():IHeracles {
        return heraclesWeakMap.get(this);
    }

    getOperations(classUri:string):Array<ISupportedOperation>;

    getOperations(classUri:string, predicateUri?:string):Array<ISupportedOperation> {
        var clas = this.getClass(classUri);
        if (!clas) {
            return [];
        }
        
        if(!predicateUri) {
            return clas.supportedOperations;
        }

        var supportedProperty = clas.supportedProperties.find((prop:ISupportedProperty) => {
            return prop.property && prop.property.id === predicateUri;
        });
        if(!supportedProperty) {
            return [];
        }

        return supportedProperty.property.supportedOperations;
    }

    getProperties(classUri:string):Array<ISupportedProperty> {
        var clas = this.getClass(classUri);
        if (!clas) {
            return [];
        }
        return clas.supportedProperties;
    }

    getClass(classId):IClass {
        return this.classes.find(clas => clas[JsonLd.Id] === classId) || null;
    }

    getEntrypoint():Promise<IHydraResource> {
        return this._heracles.loadResource(this[Core.Vocab.entrypoint][JsonLd.Id]);
    }
}

export class DocumentedResource extends Resource implements IDocumentedResource {
    constructor(hydraResource:any) {
        super(hydraResource);
    }

    get description():string {
        return this[Core.Vocab.description] ||
            this[rdfs.comment] ||
            this[Schema.description]
    }

    get title():string {
        return this[Core.Vocab.title] ||
            this[rdfs.label] ||
            this[Schema.title];
    }
}

export class SupportedOperation extends DocumentedResource implements ISupportedOperation {

    constructor(hydraOperation:any, heracles:IHeracles) {
        super(hydraOperation);
        heraclesWeakMap.set(this, heracles);
    }

    get method():string {
        return this[Core.Vocab.method];
    }

    get expects():IClass {
        return this[Core.Vocab.expects];
    }

    get returns():IClass {
        return this[Core.Vocab.returns];
    }

    get requiresInput():boolean {
        const method = this.method || '';
        var methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE';

        var operationExpectsBody = !!this.expects && this.expects.id !== owl.Nothing;

        return methodExpectsBody || operationExpectsBody;
    }
}

export class SupportedProperty extends DocumentedResource implements ISupportedProperty {

    constructor(hydraSupportedProperty:any) {
        super(hydraSupportedProperty);
    }

    get readable() {
        if (typeof this[Core.Vocab.readable] === 'boolean') {
            return this[Core.Vocab.readable];
        }

        return true;
    }

    get writable() {
        if (typeof this[Core.Vocab.writable] === 'boolean') {
            return this[Core.Vocab.writable];
        }

        return true;
    }

    get required() {
        if (typeof this[Core.Vocab.required] === 'boolean') {
            return this[Core.Vocab.required];
        }

        return false;
    }

    get property() {
        return this[Core.Vocab.property];
    }
}

export class Class extends DocumentedResource implements IClass {

    constructor(hydraClass:Object) {
        super(hydraClass);
    }

    get supportedOperations():Array<ISupportedOperation> {
        var operations = this[Core.Vocab.supportedOperation];
        
        if(typeof operations ==='undefined' || operations === null) {
            return [];
        }
        
        if(Array.isArray(operations)) {
            return this[Core.Vocab.supportedOperation];
        }

        return [ operations ];
    }

    get supportedProperties():Array<ISupportedProperty> {
        var properties = this[Core.Vocab.supportedProperty];
        
        if(typeof properties === 'undefined' || properties === null ) {
            return [];
        }
        
        if(Array.isArray(properties)) {
            return properties;
        }

        return [ properties ];
    }
}

export class StatusCodeDescription extends Resource implements IStatusCodeDescription {
    
    get code():number {
        return this[Core.Vocab.code];
    }
    
    get description():string {
        return this[Core.Vocab.description] || '';
    }
}

export class RdfProperty extends DocumentedResource implements IRdfProperty {
    get range():IClass {
        return this[rdfs.range];
    }

    get domain():IClass {
        return this[rdfs.domain];
    }

    get supportedOperations():Array<ISupportedOperation> {
        var value = this[Core.Vocab.supportedOperation];

        if(typeof value === 'undefined'){
            return [];
        }

        if(Array.isArray(value) === false) {
            return [ value ];
        }

        return this[Core.Vocab.supportedOperation];
    }
}