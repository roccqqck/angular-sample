import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { DynamicPadComponent } from 'src/app/shared/component/dynamic-pad/dynamic-pad.component';


declare var $: any
declare var jQuery: any;


@Injectable({
  providedIn: 'root'
})
export class DynamicPadService {

  textId!: any;
  padId!: string;
  length!: number;
  garbage!: any;
  html!: any;
  obj!:any;
  currectValue!:any;
  keyboardList: { list: Array<string> }={list:[]}


  public navElement!: HTMLElement;

  constructor() { }

  dynamicPad( id: string, length: number) {
    this.obj="id_"+id;
    this.textId = id;
    this.padId = 'dynaKeyPad' + Math.floor((Math.random() * 10000) + 1000);
    this.length = length
    this.garbage = $('[id^=dynaKeyPad]');

    if (this.garbage.length > 0) {
      this.garbage.remove();
    }
    $('<div id="' + this.padId + '"></div>').hide().appendTo('body');

    this.createDynamicPad(this.textId, this.padId, length)

    this.shiftToRightPlace(this.textId);

    $(".dynamic-pad-e").show();
    // $(".dynamic-pad-e").eq(0).hide();

  }


  //傳遞給ＳＳＬ動態鍵盤鍵盤元件
  createDynamicPad(textId: any, padId: string, length: number) {

    $('#' + padId).empty();
    $('#' + padId).off('focusout');
    $('body').off('click');
    $('#' + padId).off('selectstart');

    //從動態鍵盤元件取得
    this.sortNum();
    $('#' + padId).html(this.setDynamicPadHTML());
    //開啟時重置鍵盤資料
    $("form[name='formPad'] input[name='PIN']")[0].value="";
    jQuery(document.getElementById("pwdLen")).text(0);

    $('#' + padId).fadeIn();
    $("body").click(function (e: any) {
      var target = $(e.target);
      if (target.closest('#' + padId).length > 0) {
        return;
      }
      if (isTargetOnDynaKeyPadListener(target)) {
        return;
      }
      if (target.closest("#" + textId).length == 0) {
        $('#' + padId).fadeOut();
      }
    })
  }

  //取得動態鍵盤元件ＨＴＭＬ
  setDynamicPadHTML() {
    console.log('DynamicPadComponent',this.navElement)
    return this.navElement;
  }

  shiftToRightPlace(textId:string){
    var ipt =$('#'+textId);
    if(textId=="sslSecurity" || textId=="cardSecurity" || textId=="otpSecurity"){
      //only for 安控（未使用 form-row-ssl元件）
      var leftOfPad=ipt.offset().left+60;
      var topOfPad=ipt.offset().top+40 ;
    }else{
      var leftOfPad=ipt.offset().left +ipt.width() + 130;
      var topOfPad=ipt.offset().top + ipt.height() +50;
    }

    topOfPad=topOfPad<0? 0:topOfPad;
    // console.log("dynamic pad ipt top:",ipt.offset().top," left:",ipt.offset().left)
    // console.log("dynamic pad top:",topOfPad," left:",leftOfPad)

    $(".dynamic-pad-e").css({
      "left":leftOfPad,
      "top":topOfPad
    });
  }

  maxlength!: any;

  enter_Num(enterValue:any){
    // console.log("enter_Num:", enterValue)
    if(this.maxlength == null || this.maxlength ==""){
      this.maxlength=0;
    }
    // var pswd = this.obj.value;
    if( $("form[name='formPad'] input[name='PIN']")[0].value.length<this.length){
      // $('#'+this.obj)[0].value +=enterValue
      $("form[name='formPad'] input[name='PIN']")[0].value += enterValue;
      jQuery(document.getElementById("pwdLen")).text( $("form[name='formPad'] input[name='PIN']")[0].value.length );
    }

    if(enterValue == "clear"){
      $("form[name='formPad'] input[name='PIN']")[0].value="";
      jQuery(document.getElementById("pwdLen")).text(0);
    }

  }


  processReturn(){
    console.log("SSL確認",$("form[name='formPad'] input[name='PIN']").val()," id:",$("#"+this.textId))
    console.log("obj:",this.obj,' rtn:',rtn,"textId",this.textId)
    var rtn=$("form[name='formPad'] input[name='PIN']").val();
    if(this.textId=="sslSecurity"||this.textId=="cardSecurity" || this.textId=="otpSecurity"){
      //only for SSL安控（未使用 form-row-ssl元件）
      $("#"+this.textId).val(rtn);
    }else {
      console.log("送出 obj:",this.obj,' rtn:',rtn);
      $("#"+this.obj).val(rtn);
    }
    $("#"+this.padId).fadeOut();
  }



  sortNum() {
    this.keyboardList={list:[]};
    let i = 0;
    while (i < 10) {
      let j = Math.random();
      j = j * 10;
      let str = String(j).substring(0, 1);
      if (parseInt(str) >= 0 && parseInt(str) <= 9) {
        if (this.keyboardList.list.length == 0 || !this.containsValue(str)) {
          this.keyboardList.list.push(str);
          i++;
        }
      }
    }
    console.log("排序後數字:",this.keyboardList.list)
    return this.keyboardList.list;

  }

  containsValue(value: any) {
    let isContains = false;
    if (value == null) {
      isContains = false;
    }

    this.keyboardList.list.forEach((item) => {
      if (value == item) {
        isContains = true;
      }
    })
    return isContains;
  }



}

function isTargetOnDynaKeyPadListener(target: any) {
  var onclicks = target.attr('onclick')
  if (onclicks && onclicks.indexOf('dynamicPad') >= 0)
    return true;
  return false;
}




