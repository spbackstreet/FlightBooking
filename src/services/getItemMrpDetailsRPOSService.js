import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';

const getItemMrpDetailsRPOSService = async (ProductID) => {
    const Request = {
        "StoreID": config.storeID,
        "ProductID": ProductID,
        "guId": config.guid,
    };
    console.log("Request : ", Request)
    const  service =apiCall("GetItemMrpDetailsRPOS")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;
  
    //  const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/GetItemMrpDetailsRPOS";

   

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getItemMrpDetailsRPOSService;