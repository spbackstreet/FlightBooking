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
    const APIURL = "http://rpos.dev.jiolabs.com/Micro_TransactionManagement/api/v1.0/getTransactionId";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getTransactionIdService;