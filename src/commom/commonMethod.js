
//Added by cc
export function numcheck(e) {

    const re = /^[0-9\b]+$/;
    if (e !== '' && re.test(e)) {
        return true;
    }
    else if (e !== '') {
        return false;
    }
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



