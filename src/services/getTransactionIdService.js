import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';


const getTransactionIdService = async () => {
    const Request = {
        "StoreID": config.storeID,
        "PosID": config.posid,
        "guId": config.guid,
    };
    console.log("Request : ", Request)
    const  service =apiCall("GetTransactionId")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;

   // const APIURL = "http://devfin.ril.com:8080/SelfDkycTransactionManagement/GetTransactionId";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getTransactionIdService;