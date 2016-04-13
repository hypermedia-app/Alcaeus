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

interface ISupportedProperty extends IResource {

}

interface ISupportedOperation extends IResource {
    method:string;
    title:string;
    description:string;
    expects:string;
    returns:string;
    getExpected():Promise<IClass>;
    getReturned():Promise<IClass>;
    getRaw(context:any = null):Object;
}