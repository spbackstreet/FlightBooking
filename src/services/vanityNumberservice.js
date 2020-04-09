

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';


const vanityNumberservice = async () => {

    const Request = {
        "guId": config.guid,
        "storeId": "INT9",
        "circleId": 'MU',
        "orn": "",
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
    const APIURL = "http://devfin.ril.com:8080/MobilityPlan/GetVanityNumbers";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default vanityNumberservice;