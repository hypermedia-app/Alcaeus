interface IResource {
    id:string
}

interface IApiDocumentation extends IResource {
    getClasses():Promise<Array<IClass>>;
    getClass(classId:string):Promise<IClass>;
    getOperations(classUri:string):Promise<Array<IOperation>>;
}

interface IClass extends IResource {
    getSupportedOperations():Promise<Array<IOperation>>
}

interface IOperation extends IResource {
    method:string;
    title:string;
    description:string;
    expects:string;
    returns:string;
    getExpected():Promise<IClass>;
    getReturned():Promise<IClass>;
    getRaw(context:any = null):Object;
}