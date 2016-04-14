import {Operation} from "./src/ApiDocumentation";
interface IResource {
    id:string
}

interface IApiDocumentation extends IResource {
    getClasses():Promise<Array<IClass>>;
    getClass(classId:string):Promise<IClass>;
    getOperations(classUri:string):Promise<Array<ISupportedOperation>>;
    getProperties(classUri:string):Promise<Array<ISupportedProperty>>;
}

interface IClass extends IResource {
    getSupportedOperations():Promise<Array<ISupportedOperation>>
    getSupportedProperties():Promise<Array<ISupportedProperty>>
}

interface IDocumentedResource extends IResource {
    title:string;
    description:string;
    getRaw(context:any = null):Object;
}

interface ISupportedProperty extends IDocumentedResource {
    readable:boolean;
    writable:boolean;
    required:boolean;
    property:Object;
}

interface ISupportedOperation extends IDocumentedResource {
    method:string;
    expects:string;
    returns:string;
    getExpected():Promise<IClass>;
    getReturned():Promise<IClass>;
}

interface IHydraResource extends IResource {
    getOperations():Promise<Array<Operation>>
}