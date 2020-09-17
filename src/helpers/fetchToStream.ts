import stream from 'readable-stream'
import buffer from 'buffer'

// from https://github.com/bergos/nodeify-fetch/blob/master/lib/WhatwgReadable.js
class WhatwgReadable extends stream.Readable {
    public constructor(stream) {
        super({
            read: () => {
                stream.read().then((chunk) => {
                    if (chunk.done) {
                        this.push(null)
                    } else {
                        this.push(buffer.Buffer.from(chunk.value))
                    }
                }).catch((err) => {
                    this.emit('error', err)
                })
            },
        })
    }
}

class ArrayBufferReadable extends stream.Readable {
    public constructor(callback) {
        let done = false

        super({
            read: () => {
                if (done) {
                    return
                }

                done = true

                callback().then((arrayBuffer) => {
                    this.push(buffer.Buffer.from(arrayBuffer))
                    this.push(null)
                })
            },
        })
    }
}

export function patchResponseBody(body: Response | Body) {
    if (body.body && 'readable' in body.body) {
        return body.body
    }

    if (body.body && body.body.getReader) {
        return new WhatwgReadable(body.body.getReader())
    }

    return new ArrayBufferReadable(() => {
        return body.arrayBuffer()
    })
}
