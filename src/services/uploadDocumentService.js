import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getPincode = async (doctype, image) => {

    const Request = {
        "guid": config.guid,
        "agentid": config.userID,
        "storeid": config.storeID,
        "orn": "NO00000123",
        "doctype": doctype,
        "image": image
    }

    console.log("Request : ", Request)

    const APIURL = "http://devfin.ril.com:8080/SelfDkycRDService/UploadDocument";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getPincode;