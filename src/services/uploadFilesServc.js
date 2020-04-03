import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import { decryptData, Encrypt, encryptionDataWithRandomKey, encryptHeader } from '../commom/Encryption-Decryption';


const uploadFilesServc = async (commTypeId, uploadedFileNames) => {


    const Request = {
        "commTypeId": commTypeId,
        "files": uploadedFileNames

    };

    console.log("Request : ", Request)
    // const EncryptedRequest = Encrypt(Request);
    const APIURL = `${process.env.REACT_APP_API_URL}/OpenCommunicationAPI/uploadFiles`;
    try {
        const response = await postApiCall(Request, APIURL);
        if (response.status) {
        }
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

export default uploadFilesServc;