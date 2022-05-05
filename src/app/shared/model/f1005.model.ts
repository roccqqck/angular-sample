export interface f1005_query {
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


export interface f1005_change {
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
