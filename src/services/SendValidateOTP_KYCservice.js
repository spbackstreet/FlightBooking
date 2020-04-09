import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';


const SendValidateOTP_KYCservice = async (custotp, agentotp, action, ORN) => {

    const Request = {

        Agent_id: "10051311",
        DeviceId: "",
        storeid: "INT9",
        Guid: config.guid,
        Action: action,
        agent_otp: agentotp,
        cust_mobileno: "9561499434",
        cust_otp: custotp,
        Orn: ORN,
        Agent_mobileno: "9096284056"

        // cust_TVotp: "",
        // agent_TVotp: "",
        // Cust_NE: "",
        // orderType: "",


    };
    console.log("Request : ", Request)
    const APIURL = "http://devfin.ril.com:8080/CouponManagement/SendValidateOTP_KYC";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default SendValidateOTP_KYCservice;