

/*
/
/**
 *
 * @param dateString
 * @returns
 * 說明：14位字串日期時間轉日期格式 (return Date)
 * 範例：yyyyMMddHHmmss(ex:"20220413211218") to yyyy/MM/dd HH:mm:ss(ex:2022/04/13 21:12:18)
 * 其他：可使用管線(DatePipe)自定義顯示樣式{{ xxxdttm | date:'yyyy/MM/dd HH:mm:ss'}}
 */
export function convertStrToDate(dateString: string) {

      return new Date(dateString.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,'$1/$2/$3 $4:$5:$6'))

}





import { formatDate } from "@angular/common"
/**
 *
 * @param dateString
 * @returns
 * 說明：將14位字串日期時間格式化yyyy/MM/dd HH:mm:ss(return string)
 * 範例：yyyyMMddHHmmss(ex:"20220413211218") to yyyy/MM/dd HH:mm:ss(ex:"2022/04/13 21:12:18")
 * 可使用管線(DatePipe)自定義顯示樣式{{ xxxdttm | date:'yyyy/MM/dd HH:mm:ss'}}
 */
export function convertStrToDateString(dateString: string) {
    console.log("日期轉換:",formatDate( new Date(dateString.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,'$1/$2/$3 $4:$5:$6')) ,'yyyy/MM/dd HH:mm:ss',getCurrentLanguage() ) )
    return formatDate( new Date(dateString.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,'$1/$2/$3 $4:$5:$6')) ,'yyyy/MM/dd HH:mm:ss',getCurrentLanguage() )

}


function getCurrentLanguage() {
    const lang = ['en', 'tw'];
    const currentLang = lang.find(l => new RegExp(`/${l}/`).test(window.location.pathname));
    if(currentLang=="en"){
        return 'en-US'
    }else{
        return 'zh-Hant-TW';
    }
    
  };
