import {Core, JsonLd} from '../../Constants';
import {Constructor} from '../Mixin';
import {IResource} from '../Resource';
import ExpansionModelBuilder, {IExpandedValue} from './ExpansionModelBuilder';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class ExplicitRepresentationExpansion extends Base {
        public mapShorthandValue(value: string) {
            return `"${value}"`;
        }

        public mapExpandedValue(value: IExpandedValue) {
            if (value['@id']) {
                return value['@id'];
            }

            if (value['@language']) {
               return `"${value['@value']}"@${value['@language']}`;
            }

            if (value['@type']) {
                return `"${value['@value']}"^^${value['@type']}`;
            }

            return `"${value['@value']}"`;
        }
    }

    return ExpansionModelBuilder(ExplicitRepresentationExpansion);
}

export function shouldApply(resource: IResource) {
    const isTemplate = resource.types.contains(Core.Vocab('IriTemplate'));

    const isUndefined = typeof resource[Core.Vocab('variableRepresentation')] === 'undefined'
        || resource[Core.Vocab('variableRepresentation')] === null;

    const isExactMatch = resource[Core.Vocab('variableRepresentation')]
        && resource[Core.Vocab('variableRepresentation')][JsonLd.Id] === Core.Vocab('ExplicitRepresentation');

    return isTemplate && (!isUndefined && isExactMatch);
}
