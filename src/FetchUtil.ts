import 'isomorphic-fetch';
import * as Constants from './Constants';
import {ResponseWrapper} from './ResponseWrapper';

// tslint:disable:max-line-length
const requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

export async function fetchResource(uri: string): Promise<ResponseWrapper> {
    const res = await fetch(uri, {
        headers: new Headers({
            accept: requestAcceptHeaders,
        }),
    });

    return new ResponseWrapper(uri, res);
}

export async function invokeOperation(
    method: string,
    uri: string,
    body?: BodyInit,
    mediaType = Constants.MediaTypes.jsonLd): Promise<ResponseWrapper> {

    const res = await fetch(uri, {
        body,
        headers: new Headers({
            'Accept': requestAcceptHeaders,
            'Content-Type': mediaType,
        }),
        method,
    });

    return new ResponseWrapper(uri, res);
}
