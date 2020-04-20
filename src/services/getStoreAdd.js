import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const getStoreAdd = async (pincode, storeNo) => {
    const Request = {

        "pincode": pincode,
        // "guId": config.guid,
        "store_ID": storeNo
    };
    console.log("Request : ", Request)
    const  service =apiCall("GetPincode")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`

//    const APIURL = `${process.env.REACT_APP_API_URL}/ECommerce/GetPincode`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getStoreAdd;