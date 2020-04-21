import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const uploadTxnDataNextGenService = async (Request) => {
    
    console.log("Request : ", Request)
    const APIURL = "http://devfin.ril.com:8080/SelfDkycTransactionManagement/UploadTxnDataNextGen";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default uploadTxnDataNextGenService;