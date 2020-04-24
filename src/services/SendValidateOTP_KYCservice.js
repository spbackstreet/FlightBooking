import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';


const SendValidateOTP_KYCservice = async (custotp, agentotp, action, ORN) => {

    const Request = {

        Agent_id: config.userID,
        DeviceId: "",
        storeid: config.storeID,
        Guid: config.guid,
        Action: action,
        agent_otp: agentotp,
        cust_mobileno: config.custNumber,
        cust_otp: custotp,
        Orn: ORN,
        Agent_mobileno: config.custNumber

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