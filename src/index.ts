import apply_params_to_script_wasm from './pkg/apply_params_to_script_bg.wasm'
import init, {apply_params_to_script} from './pkg/apply_params_to_script'

let initialized: Promise<void> | undefined = undefined

/**
 * On first call this function will initialize the underlying WASM code, expect
 * a few tens of milliseconds delay.
 *
 * @param paramBytes CBOR serialized params, params need to be in a PlutusData array
 * @param plutusScriptBytes Plutus script CBOR, not double-encoded
 * @returns Bytes of script with applied parameters
 */
export const applyParamsToScript = async (paramBytes: Uint8Array, plutusScriptBytes: Uint8Array) => {
  if (initialized === undefined) {
    // @ts-ignore
    initialized = init(apply_params_to_script_wasm()).then(() => void 0)
  }
  await initialized

  return apply_params_to_script(paramBytes, plutusScriptBytes)
}
