import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';

const validateICCID = async (iccid) => {

    const Request = {
        "guId": config.guid,
        "storeId": "INT9",
        "userId": '10051311',
        "action": "1",
        "circleId": "MU",
        "orn": "NO25464657",
        "identifier": [{
            "name": "ICCID",
            "value": iccid
        }],
        "starterKitCode": "N",
        "imsi": "Y"
    };
    console.log("Request : ", Request)
    const  service =apiCall("ValidateICCID")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;


    // const APIURL = "http://devfin.ril.com:8080/MobilityPlan/ValidateICCID";
   //main const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/ValidateICCID";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default validateICCID;