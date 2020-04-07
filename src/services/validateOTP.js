import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const validateOTP = async (msisdn, custOtp) => {
    const Request = {

        "msisdn" : msisdn,
        "otp": custOtp
    };
    console.log("Request : ", Request)
    const APIURL = `${process.env.REACT_APP_OTP_URL}/HealthService/ValidateOTP`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default validateOTP;