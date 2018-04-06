import {IHydraResource} from "./interfaces";

export interface IIncomingLink{
    subjectId: string;
    subject: IHydraResource;
    predicate: string;
}
