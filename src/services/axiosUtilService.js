import axios from 'axios';
import { decryptData, Encrypt, encryptionDataWithRandomKey, encryptHeader } from '../commom/Encryption-Decryption';
import { confirmAlert } from 'react-confirm-alert';
import { numcheck, getHttpStatus } from '../commom/commonMethod';
import { createHeaderStoreID, createHeaderForNewEncryption } from '../commom/ApiRouter'
import config from '../config';
import { basicAuth } from '../commom/basicAuth';


axios.interceptors.request.use(request => {
    try {
        const requestParams = JSON.parse(JSON.stringify(request.data));
        if (requestParams.stopIntercept) {
            return request;
        }
        if (process.env.REACT_APP_NEW_ENCRYPTION === "true") {
            let basicAuthVal = '';
            if (config.applicationType === 'React') {
                // basicAuthVal = basicAuth(config.userID);
                basicAuthVal = basicAuth(config.custNumber);
                basicAuthVal = 'Basic ' + basicAuthVal
            }
            else {
                basicAuthVal = config.basicAuth
            }
            const encryptedData = encryptionDataWithRandomKey(request.data);
            request.data = encodeURIComponent(encryptedData.toString())
            const keyHeader = encryptHeader(encryptedData);
            request.headers = createHeaderForNewEncryption(keyHeader, basicAuthVal)
            return request;
        }
        request.data = Encrypt(request.data, true);
        request.headers = createHeaderStoreID();
        return request;

    } catch (err) {
        console.error("Problem in parsing request data", err);
        return request;
    }
});


axios.interceptors.response.use(response => {
    try {
        let config =""
        if(response.config.data.includes("stopIntercept")){
            config = JSON.parse(response.config.data)
        }
        else{
            config = JSON.parse(JSON.stringify(response.config.data));
        }
        
        if (config.stopIntercept) {
            return response.data;
        } else {
            const decryptedResponse = decryptData(response.data.replace(/"/g, ""));
            if (numcheck(decryptedResponse)) {
                confirmAlert({
                    title: "Alert!",
                    message: getHttpStatus(decryptedResponse),
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return false }
                        }
                    ]
                });
            }
            return decryptedResponse;
        }
    } catch (error) {
        confirmAlert({
            title: "Alert!",
            message: getHttpStatus(response),
            buttons: [
                {
                    label: 'OK',
                    onClick: () => { return false }
                }
            ]
        });
        return Promise.reject(error);
    }
}, error => {
    confirmAlert({
        title: "Alert!",
        message: "Something went wrong", // TODO: Replace with constant message, verify functionlity with BA Team and update the message
        buttons: [
            {
                label: 'OK',
                onClick: () => { return false }
            }
        ]
    });
    return Promise.reject(error);
});