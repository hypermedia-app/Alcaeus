'use strict';

export class JsonLdUtil{
    static idsEqual(id1, id2):boolean {
        return JsonLdUtil.trimTrailingSlash(id1) === JsonLdUtil.trimTrailingSlash(id2);
    }
    
    static trimTrailingSlash(uri:string):string {
        if(!uri || !uri.replace) {
            return null;
        }

        // todo: is this really correct to ignore trailing slash?
        return uri.replace(/\/$/, '');
    }
}