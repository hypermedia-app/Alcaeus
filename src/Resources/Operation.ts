import type { RdfResource } from '@tpluscode/rdfine'
import type { HydraClient, HydraResponse } from '../alcaeus'
import nonenumerable from '../helpers/nonenumerable'
import type * as Supported from './Mixins/Operation'

export interface RuntimeOperation extends Pick<Supported.Operation, 'title' | 'description' | 'method' | 'expects' | 'returns' | 'requiresInput'> {
    /**
     * Gets the title of the operation
     */
    invoke(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse>
    supportedOperation: Supported.Operation

    /**
     * Gets the resource on which the operation will be invoked
     */
    target: RdfResource
}

export default class implements RuntimeOperation {
    public readonly supportedOperation: Supported.Operation

    public readonly target: RdfResource

    @nonenumerable
    private readonly __client: HydraClient

    public constructor(supportedOperation: Supported.Operation, alcaeus: HydraClient, resource: RdfResource) {
        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter')
        }
        if (!alcaeus) {
            throw new Error('Missing alcaeus parameter')
        }
        if (!resource) {
            throw new Error('Missing resource parameter')
        }

        this.supportedOperation = supportedOperation
        this.__client = alcaeus
        this.target = resource
    }

    public get method() {
        return this.supportedOperation.method
    }

    public get expects() {
        return this.supportedOperation.expects
    }

    public get returns() {
        return this.supportedOperation.returns
    }

    public get requiresInput(): boolean {
        return this.supportedOperation.requiresInput
    }

    public get title() {
        return this.supportedOperation.title
    }

    public get description() {
        return this.supportedOperation.description
    }

    public invoke(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse> {
        if (body !== null && typeof body !== 'undefined' && headers !== null && typeof headers !== 'undefined') {
            return this.__client.invokeOperation(this, headers, body)
        }

        return this.__client.invokeOperation(this)
    }
}
