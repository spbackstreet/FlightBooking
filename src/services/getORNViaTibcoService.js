import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getORNViaTibcoService = async () => {
    const Request = {
        "TransName" : "CF",
        "Guid" : config.guid,
        "Storeid": config.storeID
    };
    console.log("Request : ", Request)
    const APIURL = "https://rpos.dev.jiolabs.com/Micro_MobilityPlan/api/v1.0/GetORNViaTibco";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getORNViaTibcoService;