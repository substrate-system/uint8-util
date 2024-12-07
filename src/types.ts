export type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | BigInt64Array
    | BigUint64Array

export type Encoding =
    | 'utf-8'
    | 'utf-16le'
    | 'latin-1'
    | 'ascii'

export type HashType =
    | 'hex'
    | 'base64'

export type HashAlgo =
    | 'sha-1'
    | 'sha-256'
    | 'sha-384'
    | 'sha-512'

export type Uint8 = Uint8Array | Array<number>

export type Hex = string

export type Base64 = string
