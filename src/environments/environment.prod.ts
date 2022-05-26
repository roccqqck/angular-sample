export const environment = {
  production: true,
  AES_KEY: "9y$B&E)H@McQeThWmZq4t7w!z%C*F-Ja",//AES256 要放32字元
  AES_IV:"D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeT",//位元數同上
  AES_KEY_128: "SYSTEX.6214@FCB@",
  AES_IV_128: "1234567890abcdef",
  //API PATH
  API_COMMON_PATH:"https://common-platform-apply.apps.devocp.firstbank.com.tw/common/",
  API_PATH:"https://customer-common-ibank.apps.devocp.firstbank.com.tw/api/",
  
  APIURL_CAPTCHA:"https://common-platform-apply.apps.devocp.firstbank.com.tw/common/createcaptcha",
  APIURL_FAVORITE:"https:/customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/personal/getusrfnct",
  APIURL_LOGIN:"http://localhost:8888/json/login.json",
  APIURL_F10003:"https://customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/security/getusrid",
  APIURL_F10004:"http://localhost:8888/json/f1004query.json",
};
