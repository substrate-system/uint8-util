# Uint8 Utilities
[![types](https://img.shields.io/npm/types/@substrate-system/uint8-util?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/uint8-util)](https://packagephobia.com/result?p=@substrate-system/uint8-util)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This libraries brings features from Node's `Buffer` to JS's Uint8Arrays and in some cases other Typed Arrays, in the fastest ways possible, often faster than Node's own `Buffer`'s methods.

# Usage

```js
import { arr2text, text2arr, arr2hex, hex2arr, arr2base, base2arr } from 'uint8-util'

const str = arr2text(new Uint8Array([1, 2, 3]))

const uint8 = text2arr('uflnpq')

const hexString = arr2hex(new Uint8Array([1, 2, 3]))

const uint8 = hex2arr('abc')

const base64String = arr2base(new Uint8Array([89, 87, 74, 106, 77, 84, 73]))

const uint8 = base2arr('YWJjMTI')

import { concat, equal, hash, randomBytes } from 'uint8-util'

const joined = concat([[1,2,3], new Uint8Array([1, 2, 3])])

const same = equal([1,2,3], [1,2,3])

const hash = await hash('mystring')

const hash = await hash(new Uint8Array([1, 2, 3]))

const rand = arr2hex(randomBytes(128))
