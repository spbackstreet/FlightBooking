import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const getMNPservice = async () => {
    const Request = 
        {
            "circlecode": "MU",
            "guId": config.guid,
            "upccode": "AM555755",
            "storeid": "INT9"
        }

    
    console.log("Request : ", Request)
    const  service =apiCall("MNP")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;


  //  const APIURL = "http://devfin.ril.com:8080/MobilityPlan/MNP"
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getMNPservice;