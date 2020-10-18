# Resource representations

The main method of Alcaeus client is `loadResource(string)` which performs a `GET`
request for the given identifier and returns an object wrapping the XHR object and the actual response. The
JS object will implement the below interface. 

```typescript
export interface IResponseWrapper {
    /**
     * Gets the URI used to perform the request
     */
    readonly requestedUri: string;
    
    /**
     * Gets the response content type, as advertised in response HTTP header
     */
    mediaType: string;

    /**
     * Gets the URI identifying the ApiDocumentation resource if present in the
     * response Link header
     */
    apiDocumentationLink: string;

    /**
     * If the request was redirected, returns the target resource
     */
    redirectUrl: string;

    /**
     * Gets the actual XMLHttpResponse object which can be used to do custom
     * processing
     */
    xhr: Response;
}
```
