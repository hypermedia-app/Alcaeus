export function getAbsoluteUri(uri: string, baseUri?: string): string {
  if (uri.match(/^https?:\/\//) === null && baseUri) {
    return new URL(uri, baseUri).toString()
  }

  return uri
}
