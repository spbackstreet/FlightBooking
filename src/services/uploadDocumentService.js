import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const getPincode = async (doctype, image) => {

    const Request = {
        "guid": config.guid,
        "agentid": config.userID,
        "storeid": config.storeID,
        "orn": config.ORN,
        "doctype": doctype,
        "image": image
    }

    console.log("Request : ", Request)
    const  service =apiCall("UploadDocument")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;
    //const APIURL = "http://devfin.ril.com:8080/SelfDkycRDService/UploadDocument";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getPincode;