import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall, createHeaderForNewEncryption, createHeaderStoreID, } from '../commom/ApiRouter';
import { decryptData, Encrypt, encryptionDataWithRandomKey, encryptHeader } from '../commom/Encryption-Decryption';
import config from '../config';
import axios from 'axios';

const getCommData = async () => {

    const Request = {
        "userId":"1100052"
        };

    console.log("Request : ", Request)
    // const EncryptedRequest = Encrypt(Request);
    const APIURL = `${process.env.REACT_APP_API_URL}/OpenCommunicationAPI/GetAllPostData`;
    try {
        const response = await postApiCall(Request, APIURL);
        
        return response;
        // const DecryptedResponse = decryptData(response.replace(/"/g, ""));
        // if (numcheck(DecryptedResponse)) {
        //     confirmAlert({
        //         title: "Alert!",
        //         message: getHttpStatus(DecryptedResponse),
        //         buttons: [
        //             {
        //                 label: 'OK',
        //                 onClick: () => { return false }
        //             }
        //         ]
        //     });
        // }
        // else {
        //     return DecryptedResponse;
        // }

    } catch (error) {
        console.error(error);
    }

}

export default getCommData;