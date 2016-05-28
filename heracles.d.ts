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
    getOperations(classUri:string):Array<IOperation>;
    getOperations(classUri:string, predicateUri:string):Array<IOperation>;
    getProperties(classUri:string):Array<ISupportedProperty>;
    getEntrypoint():Promise<IHydraResource>
}

interface IClass extends IDocumentedResource {
    supportedOperations:Array<IOperation>;
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

interface IRdfProperty extends IDocumentedResource {
    range:IClass;
    domain:IClass;
    supportedOperations:Array<IOperation>;
}

interface IOperation extends IDocumentedResource {
    method:string;
    expects:IClass;
    returns:IClass;
    requiresInput:boolean;
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
