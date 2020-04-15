import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getTransactionIdService = async () => {
    const Request = {
        "StoreID": config.storeID,
        "PosID": config.posid,
        "guId": config.guid,
    };
    console.log("Request : ", Request)
    const APIURL = "http://devfin.ril.com:8080/SelfDkycTransactionManagement/GetTransactionId";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getTransactionIdService;