import {
    createHash,
    randomBytes as rand,
    type BinaryToTextEncoding
} from 'node:crypto'
export * from '../util.js'
export * from '../types.js'

const decoder = new TextDecoder()

export const arr2text = (data:Uint8Array, enc?:BufferEncoding) => {
    if (data.byteLength > 1024) {
        if (!enc) return decoder.decode(data)
        const dec = new TextDecoder(enc)
        return dec.decode(data)
    }

    return Buffer.from(data).toString(enc || 'utf8')
}

export const text2arr = (str:string) => new Uint8Array(Buffer.from(str, 'utf8'))

export const arr2base = (data:ArrayBuffer|SharedArrayBuffer):string => {
    return Buffer.from(data).toString('base64')
}

export const base2arr = (str:string):Uint8Array => {
    return new Uint8Array(Buffer.from(str, 'base64'))
}

export const hex2bin = (hex:string):string => {
    return Buffer.from(hex, 'hex').toString('binary')
}

export const bin2hex = (bin:string) => {
    return Buffer.from(bin, 'binary').toString('hex')
}

export async function hash (
    data:Uint8Array,
    format:BinaryToTextEncoding
):Promise<string>

export async function hash (data:Uint8Array):Promise<Uint8Array>

export async function hash (
    data:Uint8Array,
    format?:BinaryToTextEncoding,
    algo = 'sha1'
):Promise<string|Uint8Array> {
    algo = algo.replace('sha-', 'sha')
    const out = createHash(algo).update(data)
    return format ? out.digest(format) : new Uint8Array(out.digest().buffer)
}

export const randomBytes = size => {
    return new Uint8Array(rand(size))
}
