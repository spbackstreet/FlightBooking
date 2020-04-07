import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const checkMobile = async (msisdn) => {
    const Request = {

        "msisdn" : msisdn
    };
    console.log("Request : ", Request)
    const APIURL = `${process.env.REACT_APP_OTP_URL}/HealthService/CheckMobile`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default checkMobile;