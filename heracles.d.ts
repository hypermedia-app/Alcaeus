interface IHeracles {
    resourceFactory:IResourceFactory;
    loadResource(uri:string):Promise<IHydraResource>;
    invokeOperation(operation:IOperation, uri:string, body:any, mediaType?:string):Promise<IHydraResource>;
}

interface IResource {
    id:string;
}

interface IApiDocumentation extends IResource {
    classes:Array<IClass>;
    getClass(classId:string):IClass;
    getOperations(classUri:string):Array<ISupportedOperation>;
    getOperations(classUri:string, predicateUri:string):Array<ISupportedOperation>;
    getProperties(classUri:string):Array<ISupportedProperty>;
    getEntrypoint():Promise<IHydraResource>
}

interface IClass extends IDocumentedResource {
    supportedOperations:Array<ISupportedOperation>;
    supportedProperties:Array<ISupportedProperty>;
}

interface IDocumentedResource extends IResource {
    title:string;
    description:string;
}

interface ISupportedProperty extends IDocumentedResource {
    readable:boolean;
    writable:boolean;
    required:boolean;
    property:IRdfProperty;
}

interface ISupportedOperation extends IDocumentedResource {
    method:string;
    expects:IClass;
    returns:IClass;
    requiresInput:boolean;
}

interface IRdfProperty extends IDocumentedResource {
    range:IClass;
    domain:IClass;
    supportedOperations:Array<ISupportedOperation>;
}

interface IOperation {
    title:string;
    description:string;
    method:string;
    expects:IClass;
    returns:IClass;
    requiresInput:boolean;
    invoke();
}

interface IHydraResource extends IResource {
    operations:Array<IOperation>;
    apiDocumentation:IApiDocumentation;
}

interface IPartialCollectionView extends IHydraResource {
    first:IHydraResource;
    previous:IHydraResource;
    next:IHydraResource;
    last:IHydraResource;
    collection:IHydraResource;
}

interface IResourceFactory {
    createResource(heracles:IHeracles, obj:Object, apiDocumentation:IApiDocumentation, resources, typeOverride?:string):IResource
}

interface IStatusCodeDescription {
    code:number,
    description:string;
}

var Hydra:IHeracles;
