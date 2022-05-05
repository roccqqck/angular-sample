export interface favorite {
  success: boolean;
  clientResponse: {
    functionList:[
      {
        custId:string,
        functionId:string,
        seq:string
      }
    ]
  };
  responseId:string;
  statusCode:string;
}
