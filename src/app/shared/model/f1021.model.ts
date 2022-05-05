export interface accountList {
  account:string,
  branchTW:string,
  branchEN:string
}



export interface f1021_query {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    accountList:[{
      account:string,
      branchTW:string,
      branchEN:string
    }],
    lastModifyDttm:string,
    lastModifyChannel:string
  };
  responseId:string;
  statusCode:string;
}

export interface f1021_check {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    custId:string,
    sslStatus:string,
    otpStatus:string,
    fxmlStatus:string,
    efingerStatus:string
  };
  responseId:string;
  statusCode:string;
}


export interface f1021_change {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    account:string,
    transDttm:string,
    channel:string
  };
  responseId:string;
  statusCode:string;
}
