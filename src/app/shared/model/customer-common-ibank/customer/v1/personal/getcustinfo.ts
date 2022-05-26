export interface getcustinfo 
{
  "success": boolean,
  "error": {
    "code": string,
    "message": string,
    "details": [
      {
        "code": string,
        "message": string
      }
    ]
  },
  "clientResponse": {
    "name": string,
    "nickName": string,
    "birthday": string,
    "education": string,
    "marriage": string,
    "job": string,
    "company": string,
    "jobTitle": string,
    "homePhone1": string,
    "homePhone2": string,
    "homePhone3": string,
    "companyPhone1": string,
    "companyPhone2": string,
    "companyPhone3": string,
    "cellPhone": string,
    "email": string,
    "emailValidate": string,
    "bankStatementType": string,
    "livingCountry": string,
    "contactAddress": string,
    "companyAddress": string,
    "zip": string,
    "zipList": [
      {
        "zipCode": string,
        "zhCityArea": string,
        "zhCity": string,
        "zhArea": string,
        "enCityArea": string,
        "enCity": string,
        "enArea": string
      }
    ],
    purposeSalay: string,
    purposeInvestment: string,
    purposeSaving: string,
    purposeFundsDisp: string,
    purposeSecurities: string,
    purposeLoan: string,
    purposeCompOperation: string,
    purposeStrongBox: string,
    purposeCreditAcq: string,
    purposeOther: string,
    purposeOtherDesc: string,
    // "accountPurpose": string,
    // "accountPurposeOther": string,
    "income": string,
    "fundSource": string,
    "fundSourceDesc": string,
    "voucherType": string,
    "tfaPhone": string,
    "ssl": string,
    "otp": string,
    "fxml": string,
    "efinger": string,
    "a245": string
  },
  "sourceId": string,
  "responseId": string,
  "transactionId": string,
  "statusCode": string,
  "statusMsg": string
}