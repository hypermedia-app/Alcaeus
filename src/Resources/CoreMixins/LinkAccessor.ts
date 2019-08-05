import { IAsObject, IIncomingLink } from '../../internals'
import { Constructor } from '../Mixin'

export default function (getIncomingLinks: () => IIncomingLink[]) {
    return <TBase extends Constructor>(Base: TBase) => {
        return class extends Base implements IAsObject {
            protected constructor (...rest: any[]) {
                super(...rest)

                Object.defineProperty(this, '_reverseLinks', {
                    enumerable: false,
                    get: getIncomingLinks,
                })
            }

            // @ts-ignore
            public _reverseLinks: IIncomingLink[]
        }
    }
}
