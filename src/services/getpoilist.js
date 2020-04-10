import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getPoiList = async (isAadhaar) => {
    const Request = {

        "Guid": config.guid,
        "Storeid": "INT9",
        // "AgentId": "10051311",
        "IsAadharKyc": isAadhaar,
        "CircleId": 'MU'
    };
    console.log("Request : ", Request)
    // const APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_CouponManagement/api/v1.0/GetPOAPOIMaster`;
    const APIURL = `${process.env.REACT_APP_API_URL}/CouponManagement/GetPOAPOIMaster`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getPoiList;