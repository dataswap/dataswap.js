//import nock from "nock"
//
//const defaultUrl = "http://14.198.182.244:1234"
//const defaultPath = "/rpc/v1"
//
//export function mochaGlobalSetup() {
//    mochaAddHookDefault(0xc33ff2a, 200, "1")
//    // mochaAddHookDefault(0x111111111)
//    console.log(`@@@@ Mocha add hooks finished @@@@`)
//}
//
//function mochaAddHookDefault(
//    filterContent: any,
//    errorCode: any,
//    replyData: any
//) {
//    mochaAddHook(defaultUrl, defaultPath, filterContent, errorCode, replyData)
//}
//
//function mochaAddHook(
//    url: any,
//    path: any,
//    filterContent: any,
//    errorCode: any,
//    replyData: any
//) {
//    nock(url)
//        .post(path, new RegExp("(?=0x" + filterContent.toString(16) + ")"))
//        .reply(200, {
//            jsonrpc: "2.0",
//            result: "0x000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000015b2896f76cee4e2c567e7bc671bb701d7339b30000000000000000000000000000000000000000000000000000000000000bc5900000000000000000000000000000000000000000000000000000000004e200000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000d7469746c652d3069613130396a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010696e6475737472792d3069613130396a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f646174617365742d3069613130396a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000136465736372697074696f6e2d3069613130396a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000166177733a2f2f736466612e636f6d2d3069613130396a00000000000000000000000000000000000000000000000000000000000000000000000000000000001964617461737761702e636f6d2f746573742d3069613130396a00000000000000",
//            id: "d9038463-6ec7-45d2-a0cb-c3dda7958196",
//        })
//    console.log(`==== Add filter 0x${filterContent.toString(16)} Hook ====`)
//}
//