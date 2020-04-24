import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const getPoiList = async (isAadhaar) => {
    const Request = {

        "Guid": config.guid,
        "Storeid": config.storeID,
        // "AgentId": "10051311",
        "IsAadharKyc": isAadhaar,
        "CircleId": config.custCircleHeader
    };
    console.log("Request : ", Request)

    const  service =apiCall("GetPOAPOIMaster")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;

//     const APIURL =  "http://devfin.ril.com:8080/CouponManagement/GetPOAPOIMaster"

// debugger;
    // const APIURL = `${process.env.REACT_APP_API_URL}/CouponManagement/GetPOAPOIMaster`;
    //main const APIURL = "https://devfin.ril.com:8443/SelfDkycCouponManagement/GetPOAPOIMaster";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getPoiList;