import {deprecated} from 'core-decorators';
import {Core, JsonLd} from '../../Constants';
import {IApiDocumentation, IResource, ISupportedProperty} from '../../interfaces';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    abstract class ApiDocumentation extends Base implements IApiDocumentation {
        public abstract get _alcaeus();

        get classes() {
            if (Array.isArray(this[Core.Vocab('supportedClass')])) {
                return this[Core.Vocab('supportedClass')];
            }

            return [this[Core.Vocab('supportedClass')]];
        }

        public getOperations(classUri: string, predicateUri?: string) {
            const clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }

            if (!predicateUri) {
                return clas.supportedOperations;
            }

            const supportedProperty = clas.supportedProperties.find((prop: ISupportedProperty) => {
                return prop.property && prop.property.id === predicateUri;
            });
            if (!supportedProperty) {
                return [];
            }

            return supportedProperty.property.supportedOperations;
        }

        public getProperties(classUri: string) {
            const clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }
            return clas.supportedProperties;
        }

        public getClass(classId) {
            return this.classes.find((clas) => clas[JsonLd.Id] === classId) || null;
        }

        @deprecated
        public getEntrypoint() {
            return this.loadEntrypoint();
        }

        public loadEntrypoint() {
            if (!this[Core.Vocab('entrypoint')]) {
                return Promise.reject('The ApiDocumentation doesn\'t have an entrypoint.');
            }

            return this._alcaeus.loadResource(this[Core.Vocab('entrypoint')][JsonLd.Id]);
        }
    }

    return ApiDocumentation;
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('ApiDocumentation'));
