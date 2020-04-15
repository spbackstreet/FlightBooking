import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const cAFValidationService = async (caffields) => {
    const Request = {

        "CAFFields": caffields,
        "GuId": config.guid,
        "DeviceId": config.deviceId,
        "storeno": config.storeID
    };
    console.log("Request : ", Request)
    const APIURL = "http://devfin.ril.com:8080/SelfDkycTransactionManagement/CAFValidation";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default cAFValidationService;