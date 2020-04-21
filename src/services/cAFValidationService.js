import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';


const cAFValidationService = async (caffields) => {
    const Request = {

        "CAFFields": caffields,
        "GuId": config.guid,
        "DeviceId": config.deviceId,
        "storeno": config.storeID,
        "cafType":"SE"
    };
    console.log("Request : ", Request)

    const  service =apiCall("CAFValidation")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;

    //const APIURL = "http://devfin.ril.com:8080/SelfDkycTransactionManagement/CAFValidation";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default cAFValidationService;