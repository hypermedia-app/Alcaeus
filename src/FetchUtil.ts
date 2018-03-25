import * as Constants from "./Constants";
import {ResponseWrapper} from "./ResponseWrapper";
import 'isomorphic-fetch';

const requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

export async function fetchResource(uri: string): Promise<ResponseWrapper> {
    const res = await fetch(uri, {
        headers: new Headers({
            accept: requestAcceptHeaders
        })
    });

    return new ResponseWrapper(res);
}

export async function invokeOperation(method: string, uri: string, body?: any, mediaType = Constants.MediaTypes.jsonLd): Promise<ResponseWrapper> {

    const res = await fetch(uri, {
        method: method,
        headers: new Headers({
            'Content-Type': mediaType,
            Accept: requestAcceptHeaders
        })
    });

    return new ResponseWrapper(res);
}
