import {HydraResource} from './Resources';

export interface IIncomingLink {
    subjectId: string;
    subject: HydraResource;
    predicate: string;
}

export interface IAsObject {
    _reverseLinks: IIncomingLink[];
}
