import { HydraClient, OperationHeaders } from '../alcaeus'
import nonenumerable from '../helpers/nonenumerable'
import { HydraResponse } from '../HydraResponse'
import { Class, HydraResource } from './index'
import { SupportedOperation } from './Mixins/SupportedOperation'

export interface Operation {
    /**
     * Gets the title of the operation
     */
    title: string;
    description: string;
    method: string;
    expects: Class;
    returns: Class;
    requiresInput: boolean;
    invoke(): Promise<HydraResponse>;
    invoke(body: BodyInit, headers: OperationHeaders): Promise<HydraResponse>;
    supportedOperation: SupportedOperation;

    /**
     * Gets the resource on which the operation will be invoked
     */
    target: HydraResource;
}

export default class implements Operation {
    public readonly supportedOperation: SupportedOperation

    public readonly target: HydraResource

    @nonenumerable
    private readonly __client: HydraClient

    public constructor (supportedOperation: SupportedOperation, alcaeus: HydraClient, resource: HydraResource) {
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

    public get method (): string {
        return this.supportedOperation.method
    }

    public get expects () {
        return this.supportedOperation.expects
    }

    public get returns () {
        return this.supportedOperation.returns
    }

    public get requiresInput (): boolean {
        return this.supportedOperation.requiresInput
    }

    public get title (): string {
        return this.supportedOperation.title
    }

    public get description (): string {
        return this.supportedOperation.description
    }

    public invoke (body?: BodyInit, headers?: OperationHeaders): Promise<HydraResponse> {
        if (body !== null && typeof body !== 'undefined' && headers !== null && typeof headers !== 'undefined') {
            return this.__client.invokeOperation(this, headers, body)
        }

        return this.__client.invokeOperation(this)
    }
}
