// ********************************************************
// 計算字串中數量(大寫、小寫、數字)
// 1.countInt()：回傳字串中數字個數
// 2.countLo()：回傳字串中小寫個數
// 3.countUp()：回傳字串中大寫個數
// 4.check_number()：檢查是否為數字
// 5.check_lowercase()：檢查是否為小寫字母
// 6.check_uppercase()：檢查是否為大寫字母
// ********************************************************

//1.回傳字串中數字個數
export function countInt(val: any) {

  let intCount = 0;
  const str = val.toString();

  for (let i = 0; i < str.length; i++) {
    if (check_number(str.charAt(i))) {
      intCount++;
    }
  }
  return intCount;
}

//2.回傳字串中小寫個數
export function countLo(val: any) {

  let lowerCount = 0;
  const str = val.toString();

  for (let i = 0; i < str.length; i++) {
    if (check_lowercase(str.charAt(i))) {
      lowerCount++;
    }
  }
  return lowerCount;
}

//3.回傳字串中大寫個數
export function countUp(val: any) {

  let upperCount = 0;
  const str = val.toString();

  for (let i = 0; i < str.length; i++) {
    if (check_uppercase(str.charAt(i))) {
      upperCount++;
    }
  }
  return upperCount;
}

//4.確認是否為數字
export function check_number(val: any) {

  val = val.toString();

  if (/^[0-9]+$/.test(val)) {
    return true;
  } else {
    return false;
  }
}

//5.確認是否為小寫字母
export function check_lowercase(val: any) {

  val = val.toString();

  if (/^[a-z]+$/.test(val)) {
    return true;
  } else {
    return false;
  }
}

//6.確認是否為大寫字母
export function check_uppercase(val: any) {

  val = val.toString();

  if (/^[A-Z]+$/.test(val)) {
    return true;
  } else {
    return false;
  }
}



// ==================下拉式選單增加搜尋功能，並給予中文備註(偉康元件)===============
declare var $: any;
export function select2Init(){
  $("select.select2").select2({
    language: {
      noResults: function (params: any) {
        return "查無資料";
      }
    }
  }
  ).one('select2:open', function (e: any) {
    $('input.select2-search__field').prop('placeholder', '請輸入關鍵字');
  });
}

// =========================切換NETBANK風格=====================================================
/**
 *偵測通路變化netbank樣式
 *
 * @export
 * @param {string} channel
 */
export function netbankStyle(channel:string){
  console.log("change netbank style :"+channel);
  let title='iLEO'
  switch(channel){
    case 'W' :
      title='iLEO';
      break;
    case 'W_N' :
      title='mBank'
      break;
    case 'W_M' :
      title='mBank'
      break;
    case 'W_L' :
      title='iLEO'
      break;
    default :
      title='iLEO'
  }

  //用dom方法獲取所有link元素
  const links = document.getElementsByTagName("link");
  for (let i=0; links[i]; i++){
    if ((links[i] as any).getAttribute("rel").indexOf("style") != -1 && links[i].getAttribute("title")) {
      //把所有link設為disabled
      links[i].disabled = true;
      //再來判斷title中是否有指定的title字串 有則把當前的link設為可視 即啟用當前的link
      if ((links[i].getAttribute("title")as any).indexOf(title) != -1) {
          links[i].disabled = false;
          //alert("ok");
      }
    }
  }

}
