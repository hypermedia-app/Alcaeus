import {IClass, ISupportedOperation} from "../interfaces";
import {rdf, rdfs} from "../Vocabs";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {Constructor} from "./Mixin";
import DocumentedResource from './DocumentedResource';

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class RdfProperty extends Base {
        get range(): IClass {
            return this[rdfs('range')];
        }

        get domain(): IClass {
            return this[rdfs('domain')];
        }

        get supportedOperations(): Array<ISupportedOperation> {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }
    }

    return DocumentedResource(RdfProperty);
};

Mixin['shouldApply'] = isA(rdf.Property);

export default Mixin;
