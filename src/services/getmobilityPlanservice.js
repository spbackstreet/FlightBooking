import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';
import CAFRequest from "../txnUploadData/cafRequest"
import GlobalPOAModel from '../Model/POAModel';
import GlobalPOIModel from '../Model/POIModel';


const getmobilityPlanservice = async (pType) => {

    const Request =
        {
            "AadhaarNumber": GlobalPOAModel.docNumber,
            "AgentId": config.userID,
            "CustomerCircleCode": config.userCircelId,
            "DateOfBirth":  CAFRequest.DOB,
            "EmailAddress": CAFRequest.Email,
            "FirstName": CAFRequest.FirstName,
            "Gender": CAFRequest.Gender,
            "MenuType": "onboarding",
            "MiddleName": "",
            "MobileNumber": config.custNumber,
            "ORN": config.ORN,
            "POA": [
                {
                    "Number": GlobalPOAModel.docNumber,
                    "Type":  GlobalPOAModel.doctypecode
                }
            ],
            "POI": [
                {
                    "Number": GlobalPOIModel.docNumber,
                    "Type": GlobalPOIModel.doctypecode
                }
            ],
            "billingDetails": {
                "address": {
                    "buildingName": config.custLocalAdd.houseNo,
                    "careOf": "",
                    "city": config.custLocalAdd.city,
                    "country": "IN",
                    "district":config.custLocalAdd.district,
                    "landmark": config.custLocalAdd.landMark,
                    "locality": config.custLocalAdd.area,
                    "pincode": config.custLocalAdd.pincode,
                    "state": config.custLocalAdd.state,
                    "streetName": config.custLocalAdd.roadName
                }
            },
            "caf_category": "EKYC",
            "caf_type": pType,
            "circleId": config.userCircelId,
            "guid": config.guid,
            "serviceType": "MOBILITY",
            "storeid": config.storeID
        }
    console.log("Request GetmobilityPlan : ", Request)
    



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