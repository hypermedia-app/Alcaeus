interface IResource {
    id:string
}

interface IApiDocumentation extends IResource {
    getClasses():Promise<Array<IClass>>;
    getClass(classId:string):Promise<IClass>;
    getOperations(classUri:string):Promise<Array<IOperation>>;
    getProperties(classUri:string):Promise<Array<ISupportedProperty>>;
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

var Resource:ResourceStatic;
var ApiDocumentation:ApiDocumentationStatic;

interface ResourceStatic {
    load(uri:string):Promise<IHydraResource>;
}

interface ApiDocumentationStatic {
    load(uri:string):Promise<IApiDocumentation>;
}