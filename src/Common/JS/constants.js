import config from '../../config';

export const publickey='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCc+UXdQqm/CxgMIZX/9/isWS3sgbE8Gc2eP1/9KH1gxp7GTLZTI8eSRMHYOIu3aXEPQ1lMiiMXHG3avrS7vYDqAkuQym2ivqOU7YdupmJ6m/9qxY0GPDCT5nkqLI2K8EIkZEMKeI2s9sHUG8PWQH5nYRk4bTdKT+FlYW9HmwUx3QIDAQAB';

export const customerContent='(a) I have read and understood the terms and conditions as available at Point of Sale / www.jio.com and unconditionally accept them as binding on me. I further declare and undertake that all the information provided by me is true and correct in all aspects.\n\n'+
'(b) I have understood all the rates, tariffs and other related conditions at which services will be provided inside and outside India as applicable on this date as amended from time to time. I hereby undertake to pay all the charges raised on account of service availed.\n\n'+
'(c) I understand that an individual is permitted only 9 mobile connections in a LSA and that any connection activated in violation of this is liable to be disconnected.\n\n'+
'(d) In case of MNP, I hereby declare that I own the mobile number for which the porting has been requested and undertake to pay any unpaid dues to my previous operator (from whom I am porting to Reliance Jio) and understand that failure to pay unpaid dues will lead to disconnection of services as per regulatory norms. I have been with the previous operator for at least 90 days and have not done any porting in the last 90 days.\n\n'+
'(e) I have received the subscriber identification module (SIM). I understand that SIM/Reliance Jio Services are non-transferable. Any misuse of SIM/Reliance Jio service by me or any other person is illegal and liable for criminal action.\n\n'+
'(f) I have verified all the details filled in the CAF before sharing OTP.\n\n'+
'(g) This OTP authentication to be treated as my signature.\n\n\n';

export const agentContentSameLocation='a)               I have seen the customer and also taken/captured a live photograph of customer and his/her original documents.\n\n'+
'b)I have not used my registered mobile number or any of my numbers for getting the OTP in Customer Signature.\n\n'+
'c)OTP received on my registered number %1$s on %2$s verified on %3$s shall be treated as my signature &amp; the photograph captured on this CAF is my live photograph.\n\n'+
'd)I confirm that I have not saved the customer photograph &amp; POI/POA documents photograph during this process.\n\n'+
'e)I have issued the SIM card and handed over the same to the customer.\n\n\n\n';

export const apiTimeOut=90000;
//added by cc
export function getValueFromAuthConfigList(key) {
    var value = "";
    if (config.objSupervisorLogin.AuthConfigLst != null
            && !config.objSupervisorLogin.AuthConfigLst.length === 0 ) {
                
        for (let i = 0; i < config.objSupervisorLogin.AuthConfigLst.length; i++) {
            const model = config.objSupervisorLogin.AuthConfigLst.get(i);
            if (model.getKey()=== key) {
                if (model.getValue() != null) {
                    key = model.getValue();
                    return key;
                }
            }
        }
    }
    return value;
}


//added by cc
export function getHttpStatus(code) {
    switch(code) {
        case 100:
          return "Continue";

        case 304:
          return "Not Modified";

          case 305:
          return "Use Proxy";

          case 400:
          return "Bad Request";

          case 401:
          return "Unauthorized";

          case 403:
          return "Forbidden";

          case 404:
          return "Not Found";

          case 408:
          return "Request Timeout";

          case 407:
          return "Proxy Authentication Required";

          case 409:
          return "Conflict";

          case 500:
          return "Internal Server Error";

          case 501:
          return "Not Implemented";

          case 502:
          return "Bad Gateway";

          case 503:
          return "Service Unavailable";

          case 504:
          return "Gateway Timeout";

          case 505:
          return "HTTP Version Not Supported";


        default:
        return "Some Error occured.Please try again"
      }
    
}