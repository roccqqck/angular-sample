declare var isPluginAvailOrFill:any,
            ListReaders:any,
            ReaderSelect:any,
            ReadCardData:any,
            js_getCardAccount:any,
            VerifyPIN:any
    


/**
 * 判斷是否已經安裝元件，否則提供連結到下載頁
 */
export function checkThenShowIcReader() {
    console.log("firstCard,checkThenShowIcReader")
    isPluginAvailOrFill('FCB-WebATM-plugin','src/assets/temp/FCBATM-Plugin.exe')
}

/**
 * 取得讀卡機清單
 * @param selectElement 
 */
export function listReaders(selectElement:any){
 ListReaders(selectElement);
}

/**
 * 選擇讀卡機
 * @param selectElement 
 */
export function readerSelect(selectElement:any){
    ReaderSelect(selectElement)
}


/**
 * 檢查是否插入卡片
 * @param val
 */
export function  readCardData(selectElement:any)
{
    ReadCardData(selectElement,"",null,false)

}


/**
 * 取得晶片金融卡帳號
 * @returns 晶片金融卡帳號
 */
export function jsGetCardAccount(val :string ){
    return js_getCardAccount(val);
}


/**
 * 驗證晶片金融卡密碼
 * @param selectElementValue 
 * @returns 
 */
export function verifyPIN(selectElementValue:any){
  return VerifyPIN("form1",selectElementValue)
}
