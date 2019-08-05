import { nonenumerable } from 'core-decorators'
import { Core } from '../../Constants'
import { IIriTemplate, IIriTemplateMapping, VariableRepresentation } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    abstract class IriTemplate extends Base implements IIriTemplate {
        @nonenumerable
        public get template (): string {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.getString(Core.Vocab('template'), { strict: true })!
        }

        @nonenumerable
        public get mappings () {
            return this.getArray<IIriTemplateMapping>(Core.Vocab('mapping'))
        }

        @nonenumerable
        public get variableRepresentation () {
            return this.get<VariableRepresentation>(Core.Vocab('variableRepresentation')) ||
                Core.Vocab('BasicRepresentation') as VariableRepresentation
        }

        public abstract expand(): string;
    }

    return IriTemplate
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('IriTemplate'))
