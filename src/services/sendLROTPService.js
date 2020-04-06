import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const sendLROTPService = async (mobileNo, action, name, lrOTP) => {
    const Request = {

        "LRMobileNo": mobileNo,
        "LRCustName": name,
        "AgentId": "10051311",
        "Orn": "NO86673333",
        "Action": action,
        "LROtp": lrOTP,
        "StoreNo": "INT9",
        "guId": config.guid,
    };
    console.log("Request : ", Request)

    const APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_CouponManagement/api/v1.0//SendLROTP`;

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default sendLROTPService;