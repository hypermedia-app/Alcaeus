import {nonenumerable} from 'core-decorators';
import {promises as jsonld} from 'jsonld';
import {Core, JsonLd} from '../Constants';
import {IHydraClient, IResource} from '../interfaces';
import TypeCollection from '../TypeCollection';

const isProcessed = new WeakMap<IResource, boolean>();

export default class implements IResource {
    constructor(actualResource: object) {
        Object.assign(this, actualResource);

        isProcessed.set(this, false);
    }

    @nonenumerable
    get id() {
        return this[JsonLd.Id];
    }

    @nonenumerable
    get types() {
        return TypeCollection.create(this[JsonLd.Type]);
    }

    @nonenumerable
    get _processed() {
        return isProcessed.get(this);
    }

    set _processed(val: boolean) {
        isProcessed.set(this, val);
    }

    public compact(context: any = null) {
        return jsonld.compact(this, context || Core.Context);
    }
}
