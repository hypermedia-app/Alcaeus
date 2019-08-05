import { Maybe } from 'tsmonad'
import { JsonLd } from '../Constants'
import { owl } from '../Vocabs'
import { IHydraResponse } from '../HydraResponse'
import { ApiDocumentation, Class, IOperation } from './index'
import Resource from './Resource'
import { Mixin } from './Mixins/Class'

export default class extends Mixin(Resource) implements Class {
    private readonly __apiDocs: Maybe<ApiDocumentation>

    public constructor (apiDocs: Maybe<ApiDocumentation>) {
        super({
            [JsonLd.Id]: owl.Nothing,
        })
        this.__apiDocs = apiDocs
    }

    public get title () {
        return 'Nothing'
    }

    public get description () {
        return 'Nothing'
    }
    public get operations (): IOperation[] {
        return []
    }

    public get apiDocumentation () {
        return this.__apiDocs
    }

    public getCollections () {
        return []
    }

    public getLinks () {
        return []
    }

    public getProperties () {
        return []
    }

    public load () {
        return Promise.reject<IHydraResponse>(new Error('Method not implemented.'))
    }
}
