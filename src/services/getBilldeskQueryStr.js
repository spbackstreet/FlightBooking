import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { decryptData, Encrypt, encryptionDataWithRandomKey, encryptHeader } from '../commom/Encryption-Decryption';


const getBilldeskQueryStr = async () => {
    const Request = {
        "totalAmt" : config.amount, 
        "userId" : config.custNumber, 
        "orn": config.ORN
    };

    console.log("Request : ", Request)
   
    try {
        const encryptedReq = Encrypt(Request, true)
        return encryptedReq;

    } catch (error) {
        console.error(error);
    }

}

export default getBilldeskQueryStr;