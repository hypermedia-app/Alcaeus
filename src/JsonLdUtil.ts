export class JsonLdUtil {
    public static trimTrailingSlash (uri: string): string {
        if (!uri || !uri.replace) {
            return uri
        }

        // todo: is this really correct to ignore trailing slash?
        return uri.replace(/\/$/, '')
    }
}
