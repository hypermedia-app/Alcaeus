import { property } from '@tpluscode/rdfine'
import type { Constructor } from '@tpluscode/rdfine'
import type { Resource } from '@rdfine/hydra'
import { hydra, rdfs, schema } from '@tpluscode/rdf-ns-builders'

declare module '@rdfine/hydra' {
    export interface Resource {
        /**
         * Gets the value of either hydra:title or schema:title or rdfs:label property
         */
        title: string | undefined
        /**
         * Gets the value of either hydra:description or schema:description or rdfs:comment property
         */
        description: string | undefined
    }
}

export function DocumentedResourceMixin<TBase extends Constructor<Resource>>(Base: TBase) {
    class DocumentedResourceClass extends Base implements Resource {
        @property.literal({ path: hydra.title })
        public __hydraTitle!: string

        @property.literal({ path: hydra.description })
        public __hydraDescription!: string

        @property.literal({ path: rdfs.label })
        public __rdfsLabel!: string

        @property.literal({ path: rdfs.comment })
        public __rdfsComment!: string

        @property.literal({ path: schema.title })
        public __schemaTitle!: string

        @property.literal({ path: schema.description })
        public __schemaDescription!: string

        public get description(): string {
            return this.__hydraDescription || this.__rdfsComment || this.__schemaDescription
        }

        public get title(): string {
            return this.__hydraTitle || this.__rdfsLabel || this.__schemaTitle
        }
    }

    return DocumentedResourceClass
}

DocumentedResourceMixin.appliesTo = hydra.Resource
