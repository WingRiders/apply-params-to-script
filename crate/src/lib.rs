use wasm_bindgen::prelude::{wasm_bindgen, JsError};

#[wasm_bindgen]
pub fn apply_params_to_script(
    params_bytes: &[u8], // PlutusData array
    plutus_script_bytes: &[u8],
) -> Result<Vec<u8>, JsError> {
    // Wrap the call to uplc's function so we can return WASM compatible error
    match uplc::tx::apply_params_to_script(params_bytes, plutus_script_bytes) {
        Ok(res) => Ok(res),
        // The error can be only uplc::tx::error::Error::ApplyParamsError
        // which is defined as the hardcoded string, so no need to use
        // err::to_string(), which lowers the wasm size by about 20kb
        _ => Err(JsError::new("Failed to apply parameters to Plutus script.")),
    }
}
