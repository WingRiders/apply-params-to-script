import apply_params_to_script_wasm from './pkg/apply_params_to_script_bg.wasm'
import init, {apply_params_to_script} from './pkg/apply_params_to_script'

let initialized: Promise<void> | undefined = undefined

export const applyParamsToScript = async (paramBytes: Uint8Array, plutusScriptBytes: Uint8Array) => {
  if (initialized === undefined) {
    // @ts-ignore
    initialized = init(apply_params_to_script_wasm()).then(() => void 0)
  }
  await initialized

  return apply_params_to_script(paramBytes, plutusScriptBytes)
}
