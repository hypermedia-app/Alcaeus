import {Core, JsonLd} from '../../Constants';
import {isA} from '../../ResourceHelper';
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

export function shouldApply(resource) {
    const isTemplate = isA(Core.Vocab('IriTemplate'))(resource);

    const isUndefined = typeof resource[Core.Vocab('variableRepresentation')] === 'undefined'
        || resource[Core.Vocab('variableRepresentation')] === null;

    const isExactMatch = resource[Core.Vocab('variableRepresentation')]
        && resource[Core.Vocab('variableRepresentation')][JsonLd.Id] === Core.Vocab('BasicRepresentation');

    return isTemplate && (isUndefined || isExactMatch);
}
