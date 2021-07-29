// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BLOCKCHAIN_ENDPOINT: "https://rpc-mumbai.maticvigil.com/",
  BLOCKCHAIN_CHAIN_ID: 80001,
  CONTRACT_ADDRESS: "0xE8Be7162CA383Abe338A81e1e30f3b579E390580",
  BLOCK_EXPLORER_URL: "https://mumbai.polygonscan.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
