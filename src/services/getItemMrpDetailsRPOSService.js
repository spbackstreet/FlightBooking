import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getItemMrpDetailsRPOSService = async (ProductID) => {
    const Request = {
        "StoreID": config.storeID,
        "ProductID": ProductID,
        "guId": config.guid,
    };
    console.log("Request : ", Request)
    const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/GetItemMrpDetailsRPOS";

    // const APIURL = "https://rpos.dev.jiolabs.com/micro_PIM/api/v1.0/GetItemMrpDetailsRPOS_Rest";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getItemMrpDetailsRPOSService;