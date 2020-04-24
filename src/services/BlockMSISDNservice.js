

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';


const BlockMSISDNservice = async (MSISDN) => {

    const Request = {
        "guId": config.guid,
        "storeId": config.storeID,
        "userId": config.userID,
        "orn": config.ORN,
        "circleId": config.userCircelId,
        "orderRefNumber": config.ORN,
        "identifier": [{
            "name": "MSISDN",
            "value": MSISDN
        }]

    }
    console.log("Request : ", Request)
    const  service =apiCall("BlockMSISDN")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;



    //const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/BlockMSISDN";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default BlockMSISDNservice;