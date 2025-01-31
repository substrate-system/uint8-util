import { decode, encode } from 'base64-arraybuffer'
import { arr2hex, hex2arr, alphabet } from './util.js'
export * from './types.js'

const decoder = new TextDecoder()
// 50% slower at < 48 chars, but little impact at 4M OPS/s vs 8M OPS/s
export const arr2text = (data:Uint8Array, enc?:string):string => {
    if (!enc) return decoder.decode(data)
    const dec = new TextDecoder(enc)
    return dec.decode(data)
}

// sacrifice ~20% speed for bundle size
const encoder = new TextEncoder()
export const text2arr = (str:string):Uint8Array => encoder.encode(str)

export const arr2base = (data:ArrayBufferLike):string => encode(data)

export const base2arr = (str:string):Uint8Array => new Uint8Array(decode(str))

export const bin2hex = (str:string):string => {
    let res = ''
    let c
    let i = 0
    const len = str.length

    while (i < len) {
        c = str.charCodeAt(i++)
        res += alphabet[c >> 4] + alphabet[c & 0xF]
    }

    return res
}

const MAX_ARGUMENTS_LENGTH = 0x10000
export const hex2bin = (hex:string):string => {
    const points = hex2arr(hex)
    if (points.length <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode(...points)

    let res = ''
    let i = 0
    while (i < points.length) {
        res += String.fromCharCode(...points.subarray(i, i += MAX_ARGUMENTS_LENGTH))
    }
    return res
}

const scope = typeof window !== 'undefined' ? window : globalThis
const crypto = scope.crypto || scope.msCrypto || {}
// @ts-expect-error old browsers
const subtle = crypto.subtle || crypto.webkitSubtle

const formatMap = {
    hex: arr2hex,
    base64: arr2base
}

export async function hash (
    data:Uint8Array,
    format:string
):Promise<string>

export async function hash (data:Uint8Array):Promise<Uint8Array>

export async function hash (
    data:Uint8Array,
    format?:string,
    algo:string = 'sha-1'
):Promise<string|Uint8Array> {
    if (!subtle) throw new Error('no web crypto support')
    if (typeof data === 'string') data = text2arr(data)
    const out = new Uint8Array(await subtle.digest(algo, data))
    return format ? formatMap[format](out) : out
}

export const randomBytes = (size:number):Uint8Array => {
    const view = new Uint8Array(size)
    return crypto.getRandomValues(view)
}

export * from './util.js'
