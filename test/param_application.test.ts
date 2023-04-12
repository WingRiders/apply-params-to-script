import {assert, describe, test} from 'vitest'
import {applyParamsToScript} from '../'

/*
Generate by the following Aiken code:

use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}

type Redeemer {
  auth_code: List<Int>,
}

validator(auth_code: List<Int>) {
  fn code_locked(
    datum: Datum,
    redeemer: Redeemer,
    context: ScriptContext,
  ) -> Bool {
    let must_have_correct_auth_code =
      redeemer.auth_code == auth_code

    let must_be_signed =
      list.has(context.transaction.extra_signatories, datum.owner)

    must_have_correct_auth_code && must_be_signed
  }
}
*/
const codeLockedScript = Buffer.from(
  '59021b01000032323232323232323232323223232322223232533300e32325333010002100114a06464660026eb0cc034c03ccc034c03c019200048040dd7198069807802240006002002444a66602e00429404c8c94ccc050cdc78010018a511333005005001003301a003375c603000466ebcdd39bac3300a300c00248000dd38040a4c2c6601c64a66601c66e1d20000011323253330153017002149854cc049241334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375c602a002601800a2a660209212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300c0040043300d32533300d3370e900000089919299980a180b0010998081980380091924c6eb4005261533011491334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602800260160062a6601e9212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300b0020023001001222533300f00214984cc02cc004c040008ccc00c00cc044008004dd600099800800a40004444666600e66e1c00400c0348cccc014014cdc000224004601e0020040044600e6ea80048c014dd5000ab9a5736ae7155ceaab9e5573eae855d101',
  'hex'
)

/*
Generated by the following Aiken code:

type Redeemer {
  magic_number: Int,
  magic_numbers: List<Int>,
}

validator(magic_number: Int, magic_numbers: List<Int>) {
  fn multi_param_locked(_datum: Void, redeemer: Redeemer, _context: Void) {
    let must_have_correct_magic_number =
      magic_number == redeemer.magic_number
    let must_have_correct_magic_numbers =
      magic_numbers == redeemer.magic_numbers

    must_have_correct_magic_number && must_have_correct_magic_numbers
  }
}
*/
const multiParamLockedScript = Buffer.from(
  '5901550100003232323232323232323232232232323222232533300e32325333010002100114a066ebcdd38041ba7375866018601c004900119b87009375a66016601a00290000a4c2c6601c64a66601c66e1d20000011323232325333017301900213301333009001232498dd6800a4c2a660289201334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602e002602e0046eb4c054004c03400c54cc0412412b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016301037540040046002002444a6660200042930998061800980880119980180198090010009bac001375a0026600200290001111199980319b8700100300c233330050053370000890011807000801001118031baa0015734ae6d5ce2ab9d5573caae7d5d0aba21',
  'hex'
)

// Script take takes one datum parameter, composed of a pubkeyhash and a bytestring
const datumLockedScript = Buffer.from(
  '58E30100003232323232323222223232323232533300B323232533300E3370E9000001099919191801119801001000918011198010010009129998090008A50153330113375E602800200629444C008C04C004C044010DD618089808191808980898089808980898089808800980698089806804899BAF30110013011301000430110023011001375400E2930B1804804299980499B87480000084C926533300A00114985854CCC024CDC3A40040042646464649329998068008A4C2C601A0066EB8004C03000458C030008C030004DD5001118031BAA0015734AAE7D5D12BA15573CAAE75',
  'hex'
)

const testCases: Record<string, {params: string; script: Buffer; expectedParamterizedScript: string}> = {
  'Applies [[96]] to codeLockedScript': {
    params: '81811860',
    script: codeLockedScript,
    expectedParamterizedScript:
      '590224010000332323232323232323232323223232322223232533300e32325333010002100114a06464660026eb0cc034c03ccc034c03c019200048040dd7198069807802240006002002444a66602e00429404c8c94ccc050cdc78010018a511333005005001003301a003375c603000466ebcdd39bac3300a300c00248000dd38040a4c2c6601c64a66601c66e1d20000011323253330153017002149854cc0492401334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375c602a002601800a2a660209212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300c0040043300d32533300d3370e900000089919299980a180b0010998081980380091924c6eb4005261533011491334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602800260160062a6601e9212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300b0020023001001222533300f00214984cc02cc004c040008ccc00c00cc044008004dd600099800800a40004444666600e66e1c00400c0348cccc014014cdc000224004601e0020040044600e6ea80048c014dd5000ab9a5736ae7155ceaab9e5573eae855d12601049f1860ff0001',
  },
  'Applies [[]] to codeLockedScript': {
    params: '8180',
    script: codeLockedScript,
    expectedParamterizedScript:
      '590221010000332323232323232323232323223232322223232533300e32325333010002100114a06464660026eb0cc034c03ccc034c03c019200048040dd7198069807802240006002002444a66602e00429404c8c94ccc050cdc78010018a511333005005001003301a003375c603000466ebcdd39bac3300a300c00248000dd38040a4c2c6601c64a66601c66e1d20000011323253330153017002149854cc0492401334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375c602a002601800a2a660209212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300c0040043300d32533300d3370e900000089919299980a180b0010998081980380091924c6eb4005261533011491334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602800260160062a6601e9212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300b0020023001001222533300f00214984cc02cc004c040008ccc00c00cc044008004dd600099800800a40004444666600e66e1c00400c0348cccc014014cdc000224004601e0020040044600e6ea80048c014dd5000ab9a5736ae7155ceaab9e5573eae855d1260101800001',
  },
  'Applies [[-62,0,255,256,65536]] to codeLockedScript': {
    params: '8185383D0018FF1901001A00010000',
    script: codeLockedScript,
    expectedParamterizedScript:
      '59022f010000332323232323232323232323223232322223232533300e32325333010002100114a06464660026eb0cc034c03ccc034c03c019200048040dd7198069807802240006002002444a66602e00429404c8c94ccc050cdc78010018a511333005005001003301a003375c603000466ebcdd39bac3300a300c00248000dd38040a4c2c6601c64a66601c66e1d20000011323253330153017002149854cc0492401334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375c602a002601800a2a660209212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300c0040043300d32533300d3370e900000089919299980a180b0010998081980380091924c6eb4005261533011491334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602800260160062a6601e9212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300b0020023001001222533300f00214984cc02cc004c040008ccc00c00cc044008004dd600099800800a40004444666600e66e1c00400c0348cccc014014cdc000224004601e0020040044600e6ea80048c014dd5000ab9a5736ae7155ceaab9e5573eae855d126010f9f383d0018ff1901001a00010000ff0001',
  },
  'Applies [1, [1,2,3,4]] to multiParamLockedScript': {
    params: '82018401020304',
    script: multiParamLockedScript,
    expectedParamterizedScript:
      '590165010000333232323232323232323232232232323222232533300e32325333010002100114a066ebcdd38041ba7375866018601c004900119b87009375a66016601a00290000a4c2c6601c64a66601c66e1d20000011323232325333017301900213301333009001232498dd6800a4c2a660289201334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602e002602e0046eb4c054004c03400c54cc0412412b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016301037540040046002002444a6660200042930998061800980880119980180198090010009bac001375a0026600200290001111199980319b8700100300c233330050053370000890011807000801001118031baa0015734ae6d5ce2ab9d5573caae7d5d0aba24c10101004c01069f01020304ff0001',
  },
  'Applies [-256, []] to magicLockedScript': {
    params: '8238FF80',
    script: multiParamLockedScript,
    expectedParamterizedScript:
      '590161010000333232323232323232323232232232323222232533300e32325333010002100114a066ebcdd38041ba7375866018601c004900119b87009375a66016601a00290000a4c2c6601c64a66601c66e1d20000011323232325333017301900213301333009001232498dd6800a4c2a660289201334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602e002602e0046eb4c054004c03400c54cc0412412b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016301037540040046002002444a6660200042930998061800980880119980180198090010009bac001375a0026600200290001111199980319b8700100300c233330050053370000890011807000801001118031baa0015734ae6d5ce2ab9d5573caae7d5d0aba24c10238ff004c0101800001',
  },
  "Applies [[121([h'75C8003B344B2E740E2A1116C52726C9E8974673E1A319D00624ECBD', h'48656C6C6F20576F726C6421'])]] to datumLockedScript":
    {
      params:
        '81D87982581C75C8003B344B2E740E2A1116C52726C9E8974673E1A319D00624ECBD4C48656C6C6F20576F726C6421',
      script: datumLockedScript,
      expectedParamterizedScript:
        '59011701000033232323232323222223232323232533300b323232533300e3370e9000001099919191801119801001000918011198010010009129998090008a50153330113375e602800200629444c008c04c004c044010dd618089808191808980898089808980898089808800980698089806804899baf30110013011301000430110023011001375400e2930b1804804299980499b87480000084c926533300a00114985854ccc024cdc3a40040042646464649329998068008a4c2c601a0066eb8004c03000458c030008c030004dd5001118031baa0015734aae7d5d12ba15573caae753012fd8799f581c75c8003b344b2e740e2a1116c52726c9e8974673e1a319d00624ecbd4c48656c6c6f20576f726c6421ff0001',
    },
}

describe('Applies parameters to scripts', () => {
  for (const [testName, testCase] of Object.entries(testCases)) {
    test(testName, async () =>
      assert.deepEqual(
        Buffer.from(await applyParamsToScript(Buffer.from(testCase.params, 'hex'), testCase.script)),
        Buffer.from(testCase.expectedParamterizedScript, 'hex')
      )
    )
  }
})
