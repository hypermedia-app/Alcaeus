import {nonenumerable} from 'core-decorators';
import {promises as jsonld} from 'jsonld';
import {Core, JsonLd} from '../Constants';
import {IHydraClient, IResource} from '../interfaces';
import TypeCollection from '../TypeCollection';

const isProcessed = new WeakMap<IResource, boolean>();
const alcaeus = new WeakMap<IResource, IHydraClient>();

export default class implements IResource {
    constructor(actualResource: object, client: IHydraClient = null) {
        Object.assign(this, actualResource);

        isProcessed.set(this, false);
        alcaeus.set(this, client);
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

    @nonenumerable
    get _alcaeus() {
        return alcaeus.get(this);
    }

    public compact(context: any = null) {
        return jsonld.compact(this, context || Core.Context);
    }
}
