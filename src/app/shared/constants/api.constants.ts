//API CONSTANTS

// ************************************************************************
// 設定 SETTING
// ************************************************************************
    import { HttpHeaders } from "@angular/common/http";
    /**
     * HTTP HEADER OPTIONS
     */
     export const API_SETTING_HTTPOPTIONS={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

// ************************************************************************
// 共用COMMON API
// ************************************************************************

    /**
     * 共用API-產生圖形驗證碼
     */
    export const API_COMMON_CREATECAPTCHA="/api/common/shared/v1/shared/createcaptcha";

     /**
     * 共用API-客戶常用查詢
     */
    export const API_COMMON_GETUSRFNCT="/api/customer/personal/v1/personal/getusrfnct";

     /**
     * 共用API-修改常用功能(星號)
     * type:A(新增)、D(移除) 
     */
    export const API_COMMON_EDITUSRFNCTBYSTAR="/api/customer/personal/v1/personal/editusrfnctbystar";

// ************************************************************************
// 安控元件SECURITY API
// ************************************************************************

    /**
     * 安控元件API-查詢安控狀態
     */
    export const API_SECURITY_GETALLSECURITY="/api/security/securityinfo/v1/status/getallsecurity";

    /**
     * 安控元件API-驗證SSL
     */
    export const API_SECURITY_GETSSL="/api/security/securityauth/v1/ssl/getssl";

    /**
     * 安控元件API-發送e指通訊息
     */
    export const API_SECURITY_SENDMESSAGE="/api/security/securityauth/v1/efinger/sendmessage";

    /**
     * 安控元件API-驗證e指通(第e行動 APP)/裝置綁定(iLEO APP)
     */
    export const API_SECURITY_VERIFYEFINGER="/api/security/securityauth/v1/efinger/verifyefinger";

    /**
     * 安控元件API-驗證實體OTP
     */
    export const API_SECURITY_VERIFYOTP="/api/security/securityauth/v1/otp/verifyotp";

    /**
     * 安控元件API-驗證電子憑證(FXML)
     */
    export const API_SECURITY_VERIFYFXML="/api/security/securityauth/v1/fxml/verifyfxml";



// ************************************************************************
// 個人化服務API
// ************************************************************************

    /**
     * 個人化服務API-登入代號變更(F1003)-查詢
     */
    export const API_F1003_GETUSRID="/api/customer/personal/v1/security/getusrid";

    /**
     * 個人化服務API-登入代號變更(F1003)-變更
     */
    export const API_F1003_MODIFYUSRID="/api/customer/personal/v1/security/modifyusrid";

    /**
     * 個人化服務API-登入密碼變更(F1004)-查詢
     */
    export const API_F1004_GETUSRPD="/api/customer/personal/v1/security/getusrpd";

    /**
     * 個人化服務API-登入密碼變更(F1004)-變更
     */
    export const API_F1004_MODIFYUSRPD="/api/customer/personal/v1/security/modifyusrpd";

    /**
     * 個人化服務API-SSL交易密碼變更(F1005)-查詢
     */
    export const API_F1005_GETSSL="/api/customer/personal/v1/security/getssl";

    /**
     * 個人化服務API-SSL交易密碼變更(F1005)-變更
     */
    export const API_F1005_MODIFYSSL="/api/customer/personal/v1/security/modifyssl";