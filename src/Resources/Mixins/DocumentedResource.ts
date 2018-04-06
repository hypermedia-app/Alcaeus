import {Core} from '../../Constants';
import {rdfs, Schema} from '../../Vocabs';
import {Constructor} from '../Mixin';

function getTitle(res) {
    return res[Core.Vocab('title')] || res[rdfs('label')] || res[Schema('title')];
}

function getDescription(res) {
    return res[Core.Vocab('description')] || res[rdfs('comment')] || res[Schema('description')];
}

export function Mixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        get description(): string {
            return getDescription(this);
        }

        get title(): string {
            return getTitle(this);
        }
    };
}

export function shouldApply(res) {
    const hasDescription = !!(getDescription(res));
    const hasTitle = !!(getTitle(res));

    return hasDescription || hasTitle;
}
