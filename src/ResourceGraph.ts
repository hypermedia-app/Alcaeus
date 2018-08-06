import {HydraResource} from './Resources';
import {IResource} from './Resources/Resource';

export interface IResourceGraph {
    get(uri: string): HydraResource;
}

export class ResourceGraph implements IResourceGraph {
    public get(uri: string): HydraResource {
        return this[uri] || this[decodeURI(uri)];
    }

    public add(resource: IResource) {
        this[resource.id] = resource;
    }
}
