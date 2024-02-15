import type { EventEmitter } from 'events'
import type { Stream } from '@rdfjs/types'
import type { SinkMap } from '@rdfjs/sink-map'
import li from 'parse-link-header'
import type { ResponseWrapper } from 'alcaeus-core'
import * as Constants from './Constants.js'
import { patchResponseBody } from './helpers/fetchToStream.js'
import { stripContentTypeParameters } from './mediaType.js'

export default class implements ResponseWrapper {
  public constructor(
    public readonly requestedUri: string,
    public readonly xhr: Response,
    private readonly parsers: SinkMap<EventEmitter, Stream>,
    private readonly jsonLdContext?: unknown,
  ) {}

  public quadStream(): Stream | null {
    const quadStream = this.parsers.import(
      stripContentTypeParameters(this.mediaType),
      patchResponseBody(this.xhr),
      { baseIRI: this.effectiveUri, context: this.jsonLdContext })
    if (quadStream == null) {
      return null
    }

    return quadStream
  }

  public get status(): number {
    return this.xhr.status
  }

  public get apiDocumentationLink() {
    if (this.xhr.headers.has(Constants.Headers.Link)) {
      const apiDocumentation = this.links[Constants.LinkRelations.apiDocumentation]
      if (apiDocumentation) {
        return this.resolveUri(apiDocumentation.url)
      }
    }

    return null
  }

  public get links() {
    const linkHeaders = this.xhr.headers.get(Constants.Headers.Link) || ''
    return li(linkHeaders) || {}
  }

  public get mediaType(): string {
    if (this.links[Constants.LinkRelations.context]) {
      return 'application/ld+json'
    }

    return this.xhr.headers.get(Constants.Headers.ContentType) || ''
  }

  public get redirectUrl() {
    if (this.xhr.redirected) {
      return this.xhr.url
    }

    return null
  }

  public get effectiveUri() {
    return this.redirectUrl || this.xhr.url
  }

  public get resourceUri(): string {
    return this.createdResourceUri || this.canonicalUri || this.effectiveUri
  }

  private get createdResourceUri(): string | undefined {
    const location = this.xhr.headers.get(Constants.Headers.Location)

    if (this.xhr.status === 201 && location !== null) {
      return this.resolveUri(location)
    }

    return undefined
  }

  private get canonicalUri(): string | undefined {
    const canonical = this.links[Constants.LinkRelations.canonical]
    if (canonical) {
      return this.resolveUri(canonical.url)
    }

    return undefined
  }

  public resolveUri(uri: string) {
    return new URL(uri, this.effectiveUri).toString()
  }
}
