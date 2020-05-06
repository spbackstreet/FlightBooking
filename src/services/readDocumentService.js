import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

import { apiCall } from '../commom/commonApiCalling';

const readDocumentService = async (isback, e, filename) => {
    const Request = {
        "ORN": config.ORN,
        "is_back": isback,
        "image": e,
        "imageFileName": filename
    };
    // console.log("Request : ", Request)
    // const  service =apiCall("GetTaxSummaryGST")
    // const  name=service.MICROSERVICENAME
    // const  url=service.ZONEURL
    // const APIURL = `${url}${name}`;

    console.log('req : ', JSON.stringify(Request));
    
    const APIURL = "https://devfin.ril.com:8443/HealthService/ReadDocument";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default readDocumentService;