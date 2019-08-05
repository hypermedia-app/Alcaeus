import { IHydraClient } from '../../alcaeus'
import { Constructor } from '../Mixin'

export default function (alcaeus: IHydraClient) {
    return <TBase extends Constructor>(Base: TBase) => {
        return class extends Base {
            protected constructor (...rest: any[]) {
                super(...rest)

                Object.defineProperty(this, '_alcaeus', {
                    enumerable: false,
                    get (): IHydraClient {
                        return alcaeus
                    },
                })
            }
        }
    }
}
