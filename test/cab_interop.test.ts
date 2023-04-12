import {PubKeyHash, TxDatum, TxScript} from '@wingriders/cab/types'
import {BaseDatumConstr} from '@wingriders/cab/ledger/plutus'
import {cborizeTxDatums} from '@wingriders/cab/ledger/transaction'
import {encode} from 'cbor'
import {assert, test} from 'vitest'
import {applyParamsToScript} from '../'

// Demonstrates a potential usage with @wingriders/cab package
const applyParametersToScript = async (
  parameterizedScript: TxScript,
  parameters: TxDatum[]
): TxScript => ({
  bytes: Buffer.from(
    await applyParamsToScript(encode(cborizeTxDatums(parameters)), parameterizedScript.bytes)
  ),
})

// Script take takes one datum parameter, defined by DatumParam below
const datumLockedScript: TxScript = {
  bytes: Buffer.from(
    '58E30100003232323232323222223232323232533300B323232533300E3370E9000001099919191801119801001000918011198010010009129998090008A50153330113375E602800200629444C008C04C004C044010DD618089808191808980898089808980898089808800980698089806804899BAF30110013011301000430110023011001375400E2930B1804804299980499B87480000084C926533300A00114985854CCC024CDC3A40040042646464649329998068008A4C2C601A0066EB8004C03000458C030008C030004DD5001118031BAA0015734AAE7D5D12BA15573CAAE75',
    'hex'
  ),
}

class DatumParam extends BaseDatumConstr {
  static readonly CONSTR = 0
  constructor(public readonly owner: PubKeyHash, public readonly password: string) {
    super(DatumParam.CONSTR, [Buffer.from(owner, 'hex'), password])

    if (owner.length !== 56) {
      throw new Error('DatumParam: owner must be a 28-byte PubKeyHash')
    }
  }
}

test('Applies DatumParam to datumLockedScript', async () =>
  assert.deepEqual(
    await applyParametersToScript(datumLockedScript, [
      new DatumParam(
        '75C8003B344B2E740E2A1116C52726C9E8974673E1A319D00624ECBD' as PubKeyHash,
        'Hello World!'
      ),
    ]),
    {
      bytes: Buffer.from(
        '59011701000033232323232323222223232323232533300b323232533300e3370e9000001099919191801119801001000918011198010010009129998090008a50153330113375e602800200629444c008c04c004c044010dd618089808191808980898089808980898089808800980698089806804899baf30110013011301000430110023011001375400e2930b1804804299980499b87480000084c926533300a00114985854ccc024cdc3a40040042646464649329998068008a4c2c601a0066eb8004c03000458c030008c030004dd5001118031baa0015734aae7d5d12ba15573caae753012fd8799f581c75c8003b344b2e740e2a1116c52726c9e8974673e1a319d00624ecbd4c48656c6c6f20576f726c6421ff0001',
        'hex'
      ),
    }
  ))
