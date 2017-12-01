import {
    IClass, IHydraResource, ISupportedOperation, ISupportedProperty
} from "../interfaces";
import {Core, JsonLd} from "../Constants";
import {Constructor} from "./Mixin";
import {isA} from "../ResourceHelper";

const ApiDocumentationMixin = <TBase extends Constructor>(Base: TBase) => {
    class ApiDocumentation extends Base {
        get classes(): Array<IClass> {
            if (Array.isArray(this[Core.Vocab('supportedClass')])) {
                return this[Core.Vocab('supportedClass')];
            }

            return [this[Core.Vocab('supportedClass')]];
        }

        getOperations(classUri: string, predicateUri?: string): Array<ISupportedOperation> {
            let clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }

            if (!predicateUri) {
                return clas.supportedOperations;
            }

            let supportedProperty = clas.supportedProperties.find((prop: ISupportedProperty) => {
                return prop.property && prop.property.id === predicateUri;
            });
            if (!supportedProperty) {
                return [];
            }

            return supportedProperty.property.supportedOperations;
        }

        getProperties(classUri: string): Array<ISupportedProperty> {
            let clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }
            return clas.supportedProperties;
        }

        getClass(classId): IClass {
            return this.classes.find(clas => clas[JsonLd.Id] === classId) || null;
        }

        getEntrypoint(): Promise<IHydraResource> {
            if (!this[Core.Vocab('entrypoint')]) {
                return Promise.reject('The ApiDocumentation doesn\'t have an entrypoint.');
            }

            return this['_alcaeus'].loadResource(this[Core.Vocab('entrypoint')][JsonLd.Id]);
        }
    }

    return ApiDocumentation;
};

ApiDocumentationMixin['shouldApply'] = isA(Core.Vocab('ApiDocumentation'));

export default ApiDocumentationMixin;
