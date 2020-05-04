
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import {getValueFromAuthConfigList} from '../commom/commonMethod';

import { apiCall } from '../commom/commonApiCalling';

const facematchService = async (customerImage, customerImageName) => {
    const Request = {
        "orn": config.ORN,
        "match_type": "2",
        "image": config.aadharFront,
        "imageFileName": config.frontFileName,
        "image2": customerImage,
        "image2FileName": customerImageName,
        "lowerScore": getValueFromAuthConfigList('FM_VM_LOWERSCORE'),
        "upperScore": getValueFromAuthConfigList('FM_VM_UPPERSCORE')

    };
    console.log("Request : ", Request)
    console.log("JSON : ", JSON.stringify(Request))
    // const  service =apiCall("GetTaxSummaryGST")
    // const  name=service.MICROSERVICENAME
    // const  url=service.ZONEURL
    // const APIURL = `${url}${name}`;

    const APIURL = "https://devfin.ril.com:8443/HealthService/matchFace";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default facematchService;