import {HydraResource} from './interfaces';

export interface IIncomingLink {
    subjectId: string;
    subject: HydraResource;
    predicate: string;
}

export interface IAsObject {
    _links: IIncomingLink[];
}
