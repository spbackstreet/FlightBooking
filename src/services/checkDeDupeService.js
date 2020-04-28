import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { apiCall } from '../commom/commonApiCalling';
import CAFRequest from "../txnUploadData/cafRequest"


const checkDeDupeService = async (mobileNo, isLRDedup) => {
    const Request = {

        "AadharNo": "",
        "Guid": config.guid,
        "Circle_ID": config.userCircelId,
        "StoreNo": config.storeID,
        "UserId": config.userID,
        "NoofConnections": "",
        "RequestType": "",
        "LR_Contact_Number": mobileNo,

        // added for new Vid Request
        "uidai": "215542599440",
        "Pincode": config.pincode,
        "city": config.custLocalAdd.city,
        "customerName": CAFRequest.FirstName,
        "dob": CAFRequest.DOB
    };
    console.log("Request : ", Request)

    let APIURL = ""
    
    if (isLRDedup) {

        const  service =apiCall("DeDupe")
        const  name=service.MICROSERVICENAME
        const  url=service.ZONEURL
           APIURL = `${url}${name}`;



    //   APIURL = `https://devfin.ril.com:8443/SelfDkycTransactionManagement/DeDupe`;
        // APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_TransactionManagement/api/v1.0/DeDupe`;
    }
    else {
        const  service =apiCall("VID_DeDupe")
        const  name=service.MICROSERVICENAME
        const  url=service.ZONEURL
           APIURL = `${url}${name}`;


       // APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_TransactionManagement/api/v1.0//VID_DeDupe`;
    }


     
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default checkDeDupeService;