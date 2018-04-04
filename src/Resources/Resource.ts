import {promises as jsonld} from 'jsonld';
import {nonenumerable} from 'core-decorators';
import {JsonLd, Core} from '../Constants';
import {IHydraClient, IResource} from "../interfaces";
import TypeCollection from '../TypeCollection';

const _isProcessed = new WeakMap<IResource, boolean>();
const _alcaeus = new WeakMap<IResource, IHydraClient>();

export default class implements IResource {
    constructor(actualResource:object, alcaeus:IHydraClient = null) {
        Object.assign(this, actualResource);

        _isProcessed.set(this, false);
        _alcaeus.set(this, alcaeus);
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
        return _isProcessed.get(this);
    }

    @nonenumerable
    get _alcaeus() {
        return _alcaeus.get(this);
    }

    set _processed(val:boolean) {
        _isProcessed.set(this, val);
    }

    compact(context:any = null) {
        return jsonld.compact(this, context || Core.Context);
    }
}
