import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import {getValueFromAuthConfigList} from '../commom/commonMethod';

import { apiCall } from '../commom/commonApiCalling';

const getLiveNessService = async (docImage, imageName) => {
    const Request = {
        "orn": config.ORN,
        "whiteBackground": "0",
        "eyesCheck": "1",
        "capture_type": "0",
        "image": docImage,
        "image2": "",
        "imageFileName": imageName,
        "lowerScore": getValueFromAuthConfigList('FM_VM_LOWERSCORE'),
        "upperScore": getValueFromAuthConfigList('FM_VM_UPPERSCORE')

    };
    // console.log("Request : ", Request)
    // const  service =apiCall("GetTaxSummaryGST")
    // const  name=service.MICROSERVICENAME
    // const  url=service.ZONEURL
    // const APIURL = `${url}${name}`;

    const APIURL = "https://devfin.ril.com:8443/HealthService/getLiveNess";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getLiveNessService;