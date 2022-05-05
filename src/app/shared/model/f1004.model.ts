export interface f1004_query {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    custName:string,
    usrId:string,
    lastModifyDttm:string,
  };
  responseId:string;
  statusCode:string;
}


export interface f1004_change {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    transDttm:string,
  };
  responseId:string;
  statusCode:string;
}
