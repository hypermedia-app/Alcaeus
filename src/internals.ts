import {IHydraResource} from "./interfaces";

export interface IIncomingLink{
    subjectId: string;
    subject: IHydraResource;
    predicate: string;
}

export class ExpandedWithDocs {
    constructor(resources:Object, apiDocumentationLink:string, resourceIdentifier:string) {
        this.resources = resources;
        this.apiDocumentationLink = apiDocumentationLink;
        this.resourceIdentifier = resourceIdentifier;
    }

    resourceIdentifier:string;
    resources:Object;
    apiDocumentationLink:string;
}