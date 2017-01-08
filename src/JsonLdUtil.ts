'use strict';

export class JsonLdUtil{
    static trimTrailingSlash(uri:string):string {
        if(!uri || !uri.replace) {
            return null;
        }

        // todo: is this really correct to ignore trailing slash?
        return uri.replace(/\/$/, '');
    }
}