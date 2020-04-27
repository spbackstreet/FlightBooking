import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';


const checkMobile = async (msisdn, action) => {

    
    const Request = {

        "msisdn": msisdn,
        "action" : action
    };
    console.log("Request : ", Request)
    // const  service =apiCall("CheckMobile")
    // const  name=service.MICROSERVICENAME
    // const  url=service.ZONEURL
    // const APIURL = `${url}${name}`;

    const APIURL = `${process.env.REACT_APP_API_URLS}/HealthService/CheckMobile`;
    // const APIURL = `${process.env.REACT_APP_OTP_URL}/HealthService/CheckMobile`;

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default checkMobile;