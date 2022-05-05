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
// ==============================================================================
