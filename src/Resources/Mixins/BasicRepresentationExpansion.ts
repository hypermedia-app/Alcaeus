import {Core, JsonLd} from '../../Constants';
import {IResource} from '../../interfaces';
import {Constructor} from '../Mixin';
import ExpansionModelBuilder, {IExpandedValue} from './ExpansionModelBuilder';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class BasicRepresentationExpansion extends Base {
        public mapShorthandValue(value: any) {
            return value;
        }

        public mapExpandedValue(value: IExpandedValue) {
            return value['@value'] || value['@id'];
        }
    }

    return ExpansionModelBuilder(BasicRepresentationExpansion);
}

export function shouldApply(resource: IResource) {
    const isTemplate = resource.types.contains(Core.Vocab('IriTemplate'));

    const isUndefined = typeof resource[Core.Vocab('variableRepresentation')] === 'undefined'
        || resource[Core.Vocab('variableRepresentation')] === null;

    const isExactMatch = resource[Core.Vocab('variableRepresentation')]
        && resource[Core.Vocab('variableRepresentation')][JsonLd.Id] === Core.Vocab('BasicRepresentation');

    return isTemplate && (isUndefined || isExactMatch);
}
