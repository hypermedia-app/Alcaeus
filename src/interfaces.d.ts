import {IResponseWrapper} from './ResponseWrapper';

export type VariableRepresentation = 'BasicRepresentation' | 'ExplicitRepresentation';

export interface IResourceGraph {
    [uri: string]: IHydraResource;
}

export declare interface IHydraClient {
    rootSelectors: IRootSelector[];
    mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };
    loadResource(uri: string): Promise<IHydraResponse>;
    invokeOperation(operation: IOperation, uri: string, body: any, mediaType?: string): Promise<IHydraResponse>;
}

export declare interface IMediaTypeProcessor {
    canProcess(mediaType: string);
    process(
        alcaeus: IHydraClient,
        uri: string,
        response: IResponseWrapper,
        apiDocumentation: IApiDocumentation): Promise<IResourceGraph>;
}

export declare interface IHydraResponse extends Iterable<IHydraResource> {
    /**
     * Gets the URI used to perform the request
     */
    readonly requestedUri: string;

    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: IHydraResource;

    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): IHydraResource;

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<IHydraResource>}
     */
    ofType(classId: string): IResource[];
}

export interface IRootSelector {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper & IHydraResponse): IHydraResource;
}

export declare interface IResource {
    id: string;
    types: ITypeCollection;
}

export declare interface ITypeCollection extends ReadonlyArray<string> {
    contains(clas: string): boolean;
}

export declare interface IApiDocumentation extends IResource {
    classes: IClass[];
    getClass(classId: string): IClass;
    getOperations(classUri: string, predicateUri?: string): ISupportedOperation[];
    getProperties(classUri: string): ISupportedProperty[];
    getEntrypoint(): Promise<IHydraResource>;
}

export interface IClass extends IDocumentedResource {
    supportedOperations: ISupportedOperation[];
    supportedProperties: ISupportedProperty[];
}

export interface IDocumentedResource extends IResource {
    title: string;
    description: string;
}

export interface ISupportedProperty extends IDocumentedResource {
    readable: boolean;
    writable: boolean;
    required: boolean;
    property: IRdfProperty;
}

export interface ISupportedOperation extends IDocumentedResource {
    method: string;
    expects: IClass;
    returns: IClass;
    requiresInput: boolean;
}

export interface IRdfProperty extends IDocumentedResource {
    range: IClass;
    domain: IClass;
    supportedOperations: ISupportedOperation[];
}

export interface IOperation extends IResource {
    title: string;
    description: string;
    method: string;
    expects: IClass;
    returns: IClass;
    requiresInput: boolean;
    invoke(body: any, mediaType?: string);
}

export interface IHydraResource extends IResource {
    operations: IOperation[];
    apiDocumentation: IApiDocumentation;
}

export interface IPartialCollectionView extends IHydraResource {
    first: IHydraResource;
    previous: IHydraResource;
    next: IHydraResource;
    last: IHydraResource;
    collection: IHydraResource;
}

export interface ICollection extends IHydraResource {
    members: IHydraResource[];
    views: IPartialCollectionView[];
}

export interface IResourceFactory {
    createResource(
        alcaeus: IHydraClient,
        obj: object,
        apiDocumentation: IApiDocumentation,
        resources,
        typeOverride?: string): IResource;
}

export interface IStatusCodeDescription {
    code: number;
    description: string;
}

export interface IIriTemplate {
    template: string;
    mappings: IIriTemplateMapping[];
    variableRepresentation: VariableRepresentation;
    expand(): string;
}

export interface IIriTemplateMapping {
    property: IRdfProperty;
    variable: string;
    required: boolean;
}

export default IHydraClient;
