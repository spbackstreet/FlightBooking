

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';


const vanityNumberservice = async () => {

    const Request = {
        "guId": config.guid,
        "storeId": config.storeID,
        "circleId": config.custCircleHeader,
        "orn": config.ORN,
        "identifier": {
            "name": "MSISDN"
        },
        "searchPattern": "",
        "vanityName": "",
        "includeVanityNumber": "false",
        "paging": {
            "pageSize": "1",
            "offset": "1"
        }
    }
    console.log("Request : ", Request)
    const  service =apiCall("GetVanityNumbers")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;


    //const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/GetVanityNumbers";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default vanityNumberservice;