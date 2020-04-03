import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import { decryptData, Encrypt, encryptionDataWithRandomKey, encryptHeader } from '../commom/Encryption-Decryption';


const savePostServc = async (post) => {

    const Request = {
        "from": post.from,
        "to": post.to,
        "subject": post.subject,
        "type": post.type,
        "instruction": post.instruction,
        "purposeComm": post.purposeComm,
        "userId": "1100052",
        "priority": post.priority,
        "activityPerform": post.activityPerform,
        "activityPerformBy": post.activityPerformBy

    };

    console.log("Request : ", Request)
    // const EncryptedRequest = Encrypt(Request);
    const APIURL = `${process.env.REACT_APP_API_URL}/OpenCommunicationAPI/createPost`;
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

export default savePostServc;