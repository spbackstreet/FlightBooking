import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getStoreAdd = async (pincode, storeNo) => {
    const Request = {

        "pincode": pincode,
        // "guId": config.guid,
        "store_ID": storeNo
    };
    console.log("Request : ", Request)
    const APIURL = `${process.env.REACT_APP_API_URL}/ECommerce/GetPincode`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getStoreAdd;