import {IHydraResource} from './interfaces';

export interface IIncomingLink {
    subjectId: string;
    subject: IHydraResource;
    predicate: string;
}

export interface IAsObject {
    _links: IIncomingLink[];
}
