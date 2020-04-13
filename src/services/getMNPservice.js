import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const getMNPservice = async () => {
    const Request = 
        {
            "circlecode": "MU",
            "guId": config.guid,
            "upccode": "AM555755",
            "storeid": "INT9"
        }

    
    console.log("Request : ", Request)
    // const APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_CouponManagement/api/v1.0/GetPOAPOIMaster`;
    // const APIURL = "http://devfin.ril.com:8080/SelfDkycMobilityPlan/MNP";


    const APIURL = "http://devfin.ril.com:8080/MobilityPlan/MNP"
    // const APIURL = "https://rpos.dev.jiolabs.com/Micro_MobilityPlan/api/v1.0/MNP"
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default getMNPservice;