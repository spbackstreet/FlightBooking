
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getTaxSummaryGSTService = async (lstProduct) => {
    const Request = {

        "StoreId": config.storeID,
        "Guid": config.guid,
        "isZCSS": false,
        "lstProduct": lstProduct
    };
    console.log("Request : ", Request)
    const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/GetTaxSummaryGST";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getTaxSummaryGSTService;