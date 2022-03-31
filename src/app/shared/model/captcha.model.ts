export interface captcha {
  success: boolean;
  clientResponse: {
    captchaImage:string,
    commonToken:string,
    responseId:string,
    statusCode:string,
    success:string
  };
  responseId:string;
  statusCode:string;
}
