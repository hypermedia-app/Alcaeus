export type VariableRepresentation = 'BasicRepresentation' | 'ExplicitRepresentation';

export interface IResourceGraph {
    [uri: string]: HydraResource;
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
        apiDocumentation: ApiDocumentation): Promise<IResourceGraph>;
}

export interface IResponseWrapper {
    /**
     * Gets the URI used to perform the request
     */
    readonly requestedUri: string;

    /**
     * Gets the response content type, as advertised in response HTTP header
     */
    mediaType: string;

    /**
     * Gets the URI identifying the ApiDocumentation resource if present in the response Link header
     */
    apiDocumentationLink: string;

    /**
     * If the request was redirected, returns the target resource
     */
    redirectUrl: string;

    /**
     * Gets the actual XMLHttpResponse object which can be used to do custom processing
     */
    xhr: Response;
}

export declare interface IHydraResponse extends Iterable<HydraResource>, IResponseWrapper {

    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: HydraResource;

    /**
     * Gets the number of resource within this representation
     */
    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): HydraResource;

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<HydraResource>}
     */
    ofType(classId: string): IResource[];
}

export interface IRootSelector {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper & IHydraResponse): HydraResource;
}

export declare interface IResource {
    id: string;
    types: ITypeCollection;
}

export declare interface ITypeCollection extends ReadonlyArray<string> {
    contains(clas: string): boolean;
}

export declare interface IApiDocumentation {
    classes: Class[];
    getClass(classId: string): Class;
    getOperations(classUri: string, predicateUri?: string): SupportedOperation[];
    getProperties(classUri: string): SupportedProperty[];

    /**
     * @deprecated
     */
    getEntrypoint(): Promise<HydraResource>;

    loadEntrypoint(): Promise<HydraResource>;
}

export interface IClass {
    /**
     * Gets the operations supported by this class
     */
    supportedOperations: SupportedOperation[];

    /**
     * Gets the properties supported by this class
     */
    supportedProperties: SupportedProperty[];
}

export interface IDocumentedResource {
    title: string;
    description: string;
}

export interface ISupportedProperty {
    readable: boolean;
    writable: boolean;
    required: boolean;
    property: RdfProperty;
}

export interface ISupportedOperation {
    method: string;
    expects: Class;
    returns: Class;
    requiresInput: boolean;
}

export interface IRdfProperty {
    range: Class;
    domain: Class;
    supportedOperations: SupportedOperation[];
}

export interface IOperation {
    title: string;
    description: string;
    method: string;
    expects: Class;
    returns: Class;
    requiresInput: boolean;
    invoke(body: any, mediaType?: string);
}

export interface IHydraResource {
    /**
     * Gets the operations which can be performed on this resource
     */
    readonly operations: IOperation[];
    /**
     * Gets the API Documentation which was linked to this resource representation
     */
    readonly apiDocumentation: ApiDocumentation;
}

export interface IView {
    /**
     * Gets the actual collection resource, of which this view is part
     */
    readonly collection: HydraResource;
}

export interface IPartialCollectionView {
    /**
     * Gets the first page resource of a collection
     */
    readonly first: HydraResource;
    /**
     * Gets the previous page resource of a collection
     */
    readonly previous: HydraResource;
    /**
     * Gets the next page resource of a collection
     */
    readonly next: HydraResource;
    /**
     * Gets the last page resource of a collection
     */
    readonly last: HydraResource;
}

export interface ICollection {
    /**
     * Gets the total number of items within the entire collection.
     * Note that this number can be larger then the number of `members` in the case of partial collections
     */
    readonly totalItems: number;
    /**
     * Gets the collection member included in the current representation.
     * In the case of partial collections they may only be a subset of all members
     */
    readonly members: HydraResource[];
    /**
     * Gets the views of a partial collection
     */
    readonly views?: IView[];
}

export interface IResourceFactory {
    createResource(
        obj: object,
        apiDocumentation: ApiDocumentation,
        resources,
        clientAccessorMixin?): IResource;
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
    property: RdfProperty;
    variable: string;
    required: boolean;
}

export type HydraResource = IHydraResource & IResource;
export type DocumentedResource = IDocumentedResource & HydraResource;
export type Class = IClass & DocumentedResource;
export type SupportedOperation = ISupportedOperation & DocumentedResource;
export type SupportedProperty = ISupportedProperty & DocumentedResource;
export type Collection = ICollection & HydraResource;
export type PartialCollectionView = IPartialCollectionView & IView & HydraResource;
export type RdfProperty = IRdfProperty & DocumentedResource;
export type ApiDocumentation = IApiDocumentation & IResource;

export default IHydraClient;
