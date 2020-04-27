import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const validateOTP = async (msisdn, custOtp , ORN) => {
    const Request = {

        "msisdn" : msisdn,
        "otp": custOtp,
        "ORN": ORN
    };
    console.log("Request : ", Request)
    // const APIURL = `${process.env.REACT_APP_API_URL}/HealthService/ValidateOTP`;
    const APIURL = `${process.env.REACT_APP_API_URLS}/HealthService/ValidateOTP`;

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default validateOTP;