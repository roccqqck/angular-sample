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

export interface editStarFavorite {
  success: boolean;
  clientResponse: boolean;
  responseId:string;
  statusCode:string;
}
