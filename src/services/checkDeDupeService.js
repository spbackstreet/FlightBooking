import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';

const checkDeDupeService = async (mobileNo, isLRDedup) => {
    const Request = {

        "AadharNo": "",
        "Guid": config.guid,
        "Circle_ID": "MU",
        "StoreNo": "INT9",
        "UserId": "10051311",
        "NoofConnections": "",
        "RequestType": "",
        "LR_Contact_Number": mobileNo,

        // added for new Vid Request
        "uidai": "215542599440",
        "Pincode": "400701",
        "city": "Mumbai",
        "customerName": "Chandrani",
        "dob": "16/05/1993"
    };
    console.log("Request : ", Request)

    let APIURL = ""
    
    if (isLRDedup) {

        APIURL = `${process.env.REACT_APP_API_URL}/TransactionManagement/DeDupe`;
        // APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_TransactionManagement/api/v1.0/DeDupe`;
    }
    else {
        APIURL = `${process.env.REACT_APP_APT_URL_DOTNET}/Micro_TransactionManagement/api/v1.0//VID_DeDupe`;
    }


     
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default checkDeDupeService;