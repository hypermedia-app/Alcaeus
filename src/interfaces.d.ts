export type VariableRepresentation = 'BasicRepresentation' | 'ExplicitRepresentation';

export declare interface IHydraClient {
    resourceFactory:IResourceFactory;
    loadResource(uri:string):Promise<IHydraResource>;
    invokeOperation(operation:IOperation, uri:string, body:any, mediaType?:string):Promise<IHydraResource>;
}

export declare interface IResource {
    id:string;
    types:string[];
}

export declare interface IApiDocumentation extends IResource {
    classes:Array<IClass>;
    getClass(classId:string):IClass;
    getOperations(classUri:string):Array<ISupportedOperation>;
    getOperations(classUri:string, predicateUri:string):Array<ISupportedOperation>;
    getProperties(classUri:string):Array<ISupportedProperty>;
    getEntrypoint():Promise<IHydraResource>
}

export interface IClass extends IDocumentedResource {
    supportedOperations:Array<ISupportedOperation>;
    supportedProperties:Array<ISupportedProperty>;
}

export interface IDocumentedResource extends IResource {
    title:string;
    description:string;
}

export interface ISupportedProperty extends IDocumentedResource {
    readable:boolean;
    writable:boolean;
    required:boolean;
    property:IRdfProperty;
}

export interface ISupportedOperation extends IDocumentedResource {
    method:string;
    expects:IClass;
    returns:IClass;
    requiresInput:boolean;
}

export interface IRdfProperty extends IDocumentedResource {
    range:IClass;
    domain:IClass;
    supportedOperations:Array<ISupportedOperation>;
}

export interface IOperation extends IResource{
    title:string;
    description:string;
    method:string;
    expects:IClass;
    returns:IClass;
    requiresInput:boolean;
    invoke(body:any, mediaType?:string);
}

export interface IHydraResource extends IResource {
    operations:Array<IOperation>;
    apiDocumentation:IApiDocumentation;
}

export interface IPartialCollectionView extends IHydraResource {
    first:IHydraResource;
    previous:IHydraResource;
    next:IHydraResource;
    last:IHydraResource;
    collection:IHydraResource;
}

export interface ICollection extends IHydraResource {
    members:Array<IHydraResource>;
    views:Array<IPartialCollectionView>;
}

export interface IResourceFactory {
    createResource(alcaeus:IHydraClient, obj:Object, apiDocumentation:IApiDocumentation, resources, typeOverride?:string):IResource
}

export interface IStatusCodeDescription {
    code:number,
    description:string;
}

export interface IIriTemplate {
    template:string;
    mappings:IIriTemplateMapping[];
    variableRepresentation: VariableRepresentation;
    expand():string;
}

export interface IIriTemplateMapping {
    property:IRdfProperty;
    variable:string;
    required:boolean;
}

export default IHydraClient;
