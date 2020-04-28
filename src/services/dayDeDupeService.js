import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import CAFRequest from "../txnUploadData/cafRequest"
import GlobalPOIModel from '../Model/POIModel';
import GlobalPOAModel from '../Model/POAModel';
import { apiCall } from '../commom/commonApiCalling';

const dayDeDupeService = async (docImage, imageName) => {
    const Request = {
        "ORN": config.ORN,
        "storeid": config.storeID,
        "Guid": config.guid,
        "Agent_Circle": config.custCircleHeader,
        "identification": [
            {
                "id": "POI",
                "latlong": config.selectedPOIModel.custPOILat + config.selectedPOIModel.custPOILong,
                "issueingCountry": config.selectedDocObject.issuingauth,
                "DateOfIssue": GlobalPOIModel.dateOfIssue,
                "latlong_timestamp": config.selectedPOIModel.custPOITime,
                "number": GlobalPOIModel.docNumber,
                "PlaceOfIssue": GlobalPOIModel.placeOfIssue,
                "type": config.selectedDocObject.doctypecode
            },
            {
                "id": "POA",
                "latlong": config.selectedPOAModel.custPOALat + config.selectedPOAModel.custPOALong,
                "issueingCountry": config.selectedDocObject.issuingauth,
                "DateOfIssue": GlobalPOAModel.dateOfIssue,
                "latlong_timestamp": config.selectedPOAModel.custPOATime,
                "number": GlobalPOAModel.docNumber,
                "PlaceOfIssue": GlobalPOAModel.placeOfIssue,
                "type": config.selectedDocObject.doctypecode
            }
        ],
        "Deviceid": config.deviceId,
        "Agent_Id": config.custNumber
    };
    console.log("Request : ", Request)
    const  service =apiCall("DayDedupe")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;

    // const APIURL = "https://devfin.ril.com:8443/HealthService/getLiveNess";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default dayDeDupeService;