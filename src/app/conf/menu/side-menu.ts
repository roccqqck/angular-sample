/**
 * 2022/4/26
 * current functionId source：FNCT(table)
 */
export const menus = [
  {
      "text": "帳戶總覽",
      "textEn":"OverView",
      "link": "/01",
      "menuShow": true,
      "target": "_self",
      "sideMenuShow": true,
      "functionId": "01",
  },
  {
      "text": "臺幣服務",
      "textEn":"NTD",
      "link": "/02",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "02",
  },
  {
      "text": "外幣服務",
      "textEn":"Foreign Currency",
      "link": "/03",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "03",
  },
  {
      "text": "基金/信託",
      "textEn":"Funds/Trusts",
      "link": "/06",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "06",
      "node": [
          {
              "text": "基金/信託",
              "textEn":"",
              "link": "/02",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "F0001"
          },
          {
              "text": "基金交易",
              "textEn":"",
              "link": "/02",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "F0002"
          },
          {
              "text": "國外債專區",
              "textEn":"",
              "link": "/02",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "abc",
              "node": [
                  {
                      "text": "預約圈存申購",
                      "textEn":"",
                      "link": "/02",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0003"
                  },
                  {
                      "text": "預約圈存贖回",
                      "textEn":"",
                      "link": "/02",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0004"
                  },
                  {
                      "text": "基金/信託",
                      "textEn":"",
                      "link": "/02",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0005"
                  },
                  {
                      "text": "預約圈存交易明細查詢",
                      "textEn":"",
                      "link": "/02",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0006"
                  }
              ]
          }
      ]
  },
  {
      "text": "繳費繳稅",
      "textEn":"Fee/Tax",
      "link": "/05",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "05",
      "node": [
          {
              "text": "公用事業費繳費",
              "textEn":"",
              "link": "公用事業費繳費01.htm",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "F0511"
          },
          {
              "text": "公用事業費約定代繳",
              "textEn":"",
              "link": "公用事業費約定代繳01.htm",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "F0511-1"
          }
      ]
  },
  {
      "text": "員工儲蓄信託",
      "textEn":"Profit Fund",
      "link": "/17",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "17",
  },
  {
      "text": "黃金存摺",
      "textEn":"Gold",
      "link": "/15",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "15",
      "node": [
          {
              "text": "申購/回售/轉帳交易",
              "textEn":"",
              "link": "15/00",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "00",
              "node": [
                  {
                      "text": "黃金存摺申購",
                      "textEn":"",
                      "link": "../黃金存摺交易/黃金存摺申購_01.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0001"
                  },
                  {
                      "text": "黃金存摺回售",
                      "textEn":"",
                      "link": "../黃金存摺交易/黃金存摺回售_01.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0002"
                  },
                  {
                      "text": "黃金存摺轉帳",
                      "textEn":"",
                      "link": "../黃金存摺交易/黃金存摺轉帳_01.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0003"
                  },

              ]
          },
          {
              "text": "黃金存摺投資查詢",
              "textEn":"",
              "link": "/15/02",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "01",
              "node": [
                  {
                      "text": "投資損益查詢",
                      "textEn":"",
                      "link": "../黃金存摺投資查詢/投資損益查詢.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0001"
                  },
                  {
                      "text": "近期交易明細查詢",
                      "textEn":"",
                      "link": "../黃金存摺投資查詢/近期交易明細查詢.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0002"
                  },
                  {
                      "text": "網路交易處理查詢",
                      "textEn":"",
                      "link": "../黃金存摺投資查詢/網路交易處理查詢_01_查詢.htm",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0003"
                  },

              ]
          }
      ]
  },
  {
      "text": "信用卡",
      "textEn":"Credit Card",
      "link": "/16",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "16",
  },
  {
      "text": "保險專區",
      "textEn":"Insurance",
      "link": "/19",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "19",
  },
  {
      "text": "貸款專區",
      "textEn":"NTD Loan",
      "link": "/18",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "18",
  },
  {
      "text": "個人化服務",
      "textEn":"Personalized",
      "link": "/10",
      "target": "_self",
      "menuShow": true,
      "sideMenuShow": true,
      "functionId": "10",
      "node": [
          {
              "text": "安全設定",
              "textEn":"Security Settings",
              "link": "/10/00",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "00",
              "node": [
                  {
                      "text": "登入代號變更",
                      "textEn":"Change User ID",
                      "link": "/10/00/f1003",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F1003"
                  },
                  {
                      "text": "登入密碼變更",
                      "textEn":"Login Password Change",
                      "link": "/10/00/f1004",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F1004"
                  },
                  {
                      "text": "SSL交易密碼變更",
                      "textEn":"SSL Transcation Password Change",
                      "link": "/10/00/f1005",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0005"
                  },
                  {
                      "text": "電腦裝置認證安全服務",
                      "textEn":"Computer Device Authentication Security Services",
                      "link": "/10/00/f1019",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F1019"
                  },
                  {
                      "text": "存摺通提(取款)密碼變更",
                      "textEn":"Passbook universal withdrawal(withdrawal) password change",
                      "link": "/10/00/f1021",
                      "target": "_self",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F1021"
                  }
              ]
          },
          {
              "text": "安全設定(mail)",
              "textEn": "安全設定(mail)",
              "link": "/10/11",
              "target": "_self",
              "menuShow": true,
              "sideMenuShow": true,
              "functionId": "20",
              "node": [
                  {
                      "text": "登入代號變更-mail",
                      "textEn": "登入代號變更-mail",
                      "link": "../mailTemplate/登入代號變更通知.html",
                      "target": "_blank",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0021"
                  },
                  {
                      "text": "登入密碼變更-mail",
                      "textEn": "登入密碼變更-mail",
                      "link": "../mailTemplate/登入密碼變更通知.html",
                      "target": "_blank",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0022"
                  },
                  {
                      "text": "SSL交易密碼變更-mail",
                      "link": "../mailTemplate/SSL交易密碼變更通知.html",
                      "target": "_blank",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0023"
                  },
                  {
                      "text": "存摺通提(取款)密碼變更-成功-mail",
                      "link": "../mailTemplate/存摺通提(取款)密碼變更成功通知.html",
                      "target": "_blank",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0024"
                  },
                  {
                      "text": "存摺通提(取款)密碼變更-失敗-mail",
                      "link": "../mailTemplate/存摺通提(取款)密碼變更失敗通知.html",
                      "target": "_blank",
                      "menuShow": true,
                      "sideMenuShow": true,
                      "functionId": "F0025"
                  },
              ]
          }
      ]
  }
];
