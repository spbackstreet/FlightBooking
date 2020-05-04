
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

import { apiCall } from '../commom/commonApiCalling';

const getBilldeskModalQueryStr = async () => {
    const Request = {
        "orn": 'NO00000B4BF8',
        "amount": '100',
        "guid": '7341ec33-be23-437a-8138-00739a55bf5a:INT9',
        "mobile" : '7008124658'
    };
    // console.log("Request : ", Request)
    // const  service =apiCall("GetTaxSummaryGST")
    // const  name=service.MICROSERVICENAME
    // const  url=service.ZONEURL
    // const APIURL = `${url}${name}`;
    
    const APIURL = "https://devfin.ril.com:8443/HealthService/getCheckSumBillDesk";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getBilldeskModalQueryStr;