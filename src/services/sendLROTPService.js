import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const sendLROTPService = async (mobileNo, action, name, lrOTP) => {
    const Request = {

        "LRMobileNo": mobileNo,
        "LRCustName": name,
        "AgentId": config.custNumber,
        "Orn": config.ORN,
        "Action": action,
        "LROtp": lrOTP,
        "StoreNo": "INT9",
        "guId": config.guid,
    };
    console.log("Request : ", Request)
    
    const  service =apiCall("SendLROTP")
    const  names=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${names}`;


    // const APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_CouponManagement/api/v1.0/SendLROTP`;
    // const APIURL = `https://devfin.ril.com:8443/SelfDkycCouponManagement/SendLROTP`;

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default sendLROTPService;