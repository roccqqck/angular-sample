export interface security_query {
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
    efingerStatus:string,
  };
  responseId:string;
  statusCode:string;
}


export interface send_efinger {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    custId:string,
    timestamp:string,
    seqNo:string,
  };
  responseId:string;
  statusCode:string;
}

export interface security_efinger {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    result:boolean,
    resultMsg:string,
    custId:string,
  };
  responseId:string;
  statusCode:string;
}

export interface security_fxml {
  success: boolean;
  error:{
    code:string,
    message:string,
    details:[]
  }
  clientResponse: {
    result:boolean,
    resultMsg:string,
    custId:string,
  };
  responseId:string;
  statusCode:string;
}



