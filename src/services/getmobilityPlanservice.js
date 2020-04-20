import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';

const getmobilityPlanservice = async (pType) => {

    const Request =
        {
            "AadhaarNumber": "P371777733",
            "AgentId": "10051311",
            "CustomerCircleCode": "MU",
            "DateOfBirth": "12-09-2001",
            "EmailAddress": "",
            "FirstName": "Nisha M",
            "Gender": "F",
            "MenuType": "onboarding",
            "MiddleName": "Sham M",
            "MobileNumber": "9683838388",
            "ORN": "NO00000B7A2I",
            "POA": [
                {
                    "Number": "P371777733",
                    "Type": "Z00021"
                }
            ],
            "POI": [
                {
                    "Number": "P371777733",
                    "Type": "Z00021"
                }
            ],
            "billingDetails": {
                "address": {
                    "buildingName": "plot no 36",
                    "careOf": "",
                    "city": "Mumbai,",
                    "country": "IN",
                    "district": "Suburban Mumbai",
                    "landmark": "Near national Park",
                    "locality": "Abhinav Nagar",
                    "pincode": "400066",
                    "state": "MAHARASHTRA",
                    "streetName": "Road number 4"
                }
            },
            "caf_category": "EKYC",
            "caf_type": pType,
            "circleId": "MU",
            "guid": config.guid,
            "serviceType": "MOBILITY",
            "storeid": "INT9"
        }
    console.log("Request : ", Request)
    



    const  service =apiCall("GetmobilityPlan")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;
   // const APIURL = "https://devfin.ril.com:8443/SelfDkycMobilityPlan/GetmobilityPlan";
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default getmobilityPlanservice;