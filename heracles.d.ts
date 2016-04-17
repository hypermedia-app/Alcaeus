interface IHeracles {
    resourceFactory:IResourceFactory;
    loadResource(uri:string):Promise<IHydraResource>;
}

interface IResource {
    id:string
}

interface IApiDocumentation extends IResource {
    getClasses():Promise<Array<IClass>>;
    getClass(classId:string):Promise<IClass>;
    getOperations(classUri:string):Promise<Array<IOperation>>;
    getProperties(classUri:string):Promise<Array<ISupportedProperty>>;
    getEntrypoint():Promise<IHydraResource>
}

interface IClass extends IResource {
    getSupportedOperations():Promise<Array<IOperation>>
    getSupportedProperties():Promise<Array<ISupportedProperty>>
}

interface IDocumentedResource extends IResource {
    title:string;
    description:string;
    compact(context:any = null):Object;
}

interface ISupportedProperty extends IDocumentedResource {
    readable:boolean;
    writable:boolean;
    required:boolean;
    property:Object;
}

interface IOperation extends IDocumentedResource {
    method:string;
    expects:string;
    returns:string;
    getExpected():Promise<IClass>;
    getReturned():Promise<IClass>;
}

interface IHydraResource extends IResource {
    getOperations():Promise<Array<IOperation>>
}

interface IResourceFactory {
    createResource(obj:Object, apiDocumentation:IApiDocumentation, resources):IHydraResource
}
