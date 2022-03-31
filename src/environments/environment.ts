// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AES_KEY: "9y$B&E)H@McQeThWmZq4t7w!z%C*F-Ja",//AES256 要放32字元
  AES_IV:"D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeT",//位元數同上
  //API PATH
  APIURL_CAPTCHA:"https://common-platform-apply.apps.devocp.firstbank.com.tw/common/createcaptcha",
  APIURL_FAVORITE:"https:/customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/personal/getusrfnct",
  APIURL_LOGIN:"http://localhost:4200/json/login.json",
  APIURL_F10003:"http://localhost:4200/json/f1003query.json",
  APIURL_F10004:"http://localhost:4200/json/f1004query.json",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
