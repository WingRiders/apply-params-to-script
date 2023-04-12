<p align="center"><img src="https://assets.wingriders.com/wingriders_logo.png" /></p>

# `@wingriders/apply-params-to-script`

Simple isomorphic WASM wrapper around [`apply_params_to_script`](https://github.com/aiken-lang/aiken/blob/main/crates/uplc/src/tx.rs#L150) function from [`uplc`](https://github.com/aiken-lang/aiken/tree/main/crates/uplc). It enables you to take a parametrized script and apply the parameters to it.

Same functionality is also part of [lucid](https://deno.land/x/lucid@0.10.1/mod.ts?s=applyParamsToScript), which integrates it further with the [cardano-multiplatform-lib](https://github.com/dcSpark/cardano-multiplatform-lib). So if you are already using CML that might be a better fit for you.

The goal of this library is to be a very thin WASM wrapper that communicates using buffers, and leaves the CBOR serialization of params and working with the script to you, so you can plug it into whatever toolchain you might be using.

## Get started

### npm
```sh
npm install @wingriders/apply-params-to-script
```

### pnpm
```sh
pnpm add @wingriders/apply-params-to-script
```

### yarn
```sh
yarn add @wingriders/apply-params-to-script
```

## Usage

```ts
import {applyParamsToScript} from '@wingriders/apply-params-to-script'

// In this example our script is parametrized by one integer parameter
// so we'll apply the parameter 42 to this script

// This package works directly with the script CBOR, it doesn't accept double CBOR encoded scripts
const script = Buffer.from('your script cbor', 'hex')

// Our parameter needs to be wrapped in a PlutusData array
// so 42 becomes [42] which CBOR encoded is 81182A
const params = Buffer.from('81182A', 'hex')

// This returns Uint8Array type by default
const scriptWithAppliedParams = await applyParamsToScript(params, script)

// so we can cast it to a Buffer, so it's easier to work with
const scriptWithAppliedParamsBuffer = Buffer.from(scriptWithAppliedParams)

// No you can continue working with the script as you want to
```

You can also refer to the tests to see example usage. In case the application of the paramter is not successful, the function will throw an error.


## Development

### Building
To build this project you need to:
1. Install rust - [refer to the their guide](https://www.rust-lang.org/tools/install)
2. Install `wasm-pack` - [refer to the their guide](https://rustwasm.github.io/wasm-pack/installer/)
3. After that run `wasm-pack build --target nodejs` to build the library

### Testing
First you need to build the project, after that you need to install the development dependencies using pnpm
```sh
pnpm
```
Then you can run the included tests with:
```sh
pnpm test
```

### Contributing
This is a very simple and single focused library, but if you see any room for improvement, for example reducing the size of the outputted WASM bundle, or improving the isomorphic building and bundling, feel free to open a PR. 

<p align="center">
<a href="https://www.wingriders.com/">WingRiders</a> ·
<a href="https://community.wingriders.com/">Community Portal</a> ·
<a href="https://twitter.com/wingriderscom">Twitter</a> ·
<a href="https://discord.gg/t7CdyhK8JA">Discord</a> ·
<a href="https://medium.com/@wingriderscom">Medium</a>
</p>
