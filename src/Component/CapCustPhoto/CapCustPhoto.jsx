import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { FixedHeader } from '../../commom/FixedHeader';
import { fips } from 'crypto';
import config from '../../config';
import GlobalPOIModel from '../../Model/POIModel';
import GlobalPOAModel from '../../Model/POAModel';
import { showErrorAlert } from '../../commom/commonMethod';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const CapCustPhoto = () => {


    const [FM_NONAADHAAR_CHECK, setFM_NONAADHAAR_CHECK] = useState('');
    const [FaceMatchIdfySDKAllowFlag, setFaceMatchIdfySDKAllowFlag] = useState('');
    const [FaceMatch_SDK_NA, setFaceMatch_SDK_NA] = useState('')
    const [HV_WHITE, setHV_WHITE] = useState('')
    const [appId, setAppId] = useState('')
    const [appKey, setAppKey] = useState('')
    const [appMixPanel, setAppMixPanel] = useState('')
    const [apptimeout, setapptimeout] = useState('')
    const [ORC_STRING, setORC_STRING] = useState('')
    const [SDKError, setSDKError] = useState('')
    const [SDKResult, setSDKResult] = useState('')
    const [SDKImage, setSDKImage] = useState('')
    const [SDKHeader, setSDKHeader] = useState('')
    const [SDKURI, setSDKURI] = useState('')
    const [SDKJourney, setSDKJourney] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [isFrontCam, setIsFrontCam] = useState(false)

    const history = useHistory();

    useEffect(() => {
        // var date = new Date().getDate();
        // var month = new Date().getMonth() + 1;
        // var year = new Date().getFullYear();
        // var hours = new Date().getHours(); //Current Hours
        // var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds
        // var Finaldate = (date + "-" + '0' + month + "-" + year + " " + hours + ":" + min + ":" + sec);
        // setDeviceDate(Finaldate)

        setFM_NONAADHAAR_CHECK(getValueFromAuthConfigList("FM_NONAADHAAR_CHECK"));
        setFaceMatchIdfySDKAllowFlag(getValueFromAuthConfigList('FaceMatch_SDK'));
        setFaceMatch_SDK_NA(getValueFromAuthConfigList('FaceMatch_SDK_NA'));
        setHV_WHITE(getValueFromAuthConfigList("HV_WHITE"));
        setappId(getValueFromAuthConfigList("HV_AppId"));
        setappKey(getValueFromAuthConfigList("HV_AppKey"));
        setappMixPanel(getValueFromAuthConfigList("HV_MIX_PANEL"));
        setapptimeout(getValueFromAuthConfigList("HV_TIMEOUT"));
        setORC_STRING(getValueFromAuthConfigList("OCR_ALLOWED"));
        setFM_NONAADHAAR_CHECK(getValueFromAuthConfigList("FM_NONAADHAAR_CHECK"));

    }, [])


    const onImageCaptureClicked = () => {
        //POI Clicks

        if (GlobalPOIModel.isAadharKYC) {
            if (FaceMatchIdfySDKAllowFlag == ("2")) {
                startFaceCaptureActivity();
            }
            else if (FaceMatchIdfySDKAllowFlag == ("6")) {
                startFaceCaptureActivityVishwam();
            }
        }
        else {
            if (FaceMatch_SDK_NA == ("4")) {
                startFaceCaptureActivity();
            }
            else if (FaceMatch_SDK_NA == ("8")) {
                startFaceCaptureActivityVishwam();
            }
        }
    }

    const onPhotoClick = (lat, long, e) => {
        e.preventDefault();
        onImageCaptureClicked(lat, long);
    }


    const callNextScreen = () => {

        // that.props.props.history.push({
        //     pathname: '/CapAgentPhoto',

        // })
    }


    const onValueSet = (frm, param) => {


        if (param == "ERROR") {
            SDKError = document.getElementById(param).value

            console.log("Error", SDKError);
        } else if (param == "RESULT") {
            let modifiedString = document.getElementById(param).value
                .replace(/version="/, "version=\\\"")
                .replace(/" encoding="/, "\\\" encoding=\\\"")
                .replace(/" encoding = "/, "\\\" encoding=\\\"")
                .replace(/uid="/, "\\\" uid=\\\"")
                .replace(/" name="/, "\\\" name=\\\"")
                .replace(/" gender="/, "\\\" gender=\\\"")
                .replace(/" yob="/, "\\\" yob=\\\"")
                .replace(/" co="/, "\\\" co=\\\"")
                .replace(/" house="/, "\\\" house=\\\"")
                .replace(/" street="/, "\\\" street=\\\"")
                .replace(/" Street="/, "\\\" street=\\\"")
                .replace(/" lm="/, "\\\" lm=\\\"")
                .replace(/" loc="/, "\\\" loc=\\\"")
                .replace(/" vtc="/, "\\\" vtc=\\\"")
                .replace(/" po="/, "\\\" po=\\\"")
                .replace(/" dist="/, "\\\" dist=\\\"")
                .replace(/" subdist="/, "\\\" subdist=\\\"")
                .replace(/" state="/, "\\\" state=\\\"")
                .replace(/" pc="/, "\\\" pc=\\\"")
                .replace(/" dob="/g, "\\\" dob=\\\"")
                .replace(/"="/g, "\\\"=\\\"")
                .replace(/\"\?>/, "\\\"?>")
                .replace(/\"\/>/, "\\\"/>")
                .replace(/\"\>/, "\\\">")

            setSDKResult(modifiedString)
            console.log("NEELAMRESULT", modifiedString)
        } 
        else if (param == "IMAGE") {
            setSDKImage(document.getElementById(param).value)
            console.log("IMAGE", document.getElementById(param).value);
        } 
        else if (param == "HEADER") {
            setSDKHeader(document.getElementById(param).value)
            console.log("HEADER", document.getElementById(param).value);
        } 
        else if (param == "URI") {
            setSDKURI(document.getElementById(param).value)
            console.log("URI", document.getElementById(param).value);
        }
    }

    const previewClicked = (str, e) => {
        e.preventDefault();

        var base64Icon = 'data:image/jpg;base64,' + GlobalPOIModel.custImage;
        document.getElementById("previewImage").src = base64Icon;

        setShowDialog(true)

    }

    const onSubmit = (frm, e) => {
        e.preventDefault();
        console.log("SubmitValue", "document")
        console.log("SubmitValue", document.getElementById("SUBMIT").value)
        console.log("ValueE", SDKError)
        console.log("ValueR", SDKResult)
        if (document.getElementById("SUBMIT").value == "FACE") {
            if (SDKError != null && SDKError != '') {
                var jsonError = JSON.parse(SDKError)
                console.log("JSON", jsonError)
                var errorCode = jsonError.errorCode;
                console.log("SubmitError", errorCode)
                var errorMessage = ""
                if (SDKJourney == "hyperverge") {
                    var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
                } else {
                    errorMessage = jsonError.errorMsg;
                }
                showErrorAlert(errorMessage)

            } else {
                var isLiveCheckEnable = "1";
                var isLiveCheckEnable = getValueFromAuthConfigList("HV_LIVE");
                var GlobalPOIModel = require('../Model/POIModel')

                if (isLiveCheckEnable == '' || config.Environment == "RR" || config.Environment == ("PRODUCTION")) {
                    isLiveCheckEnable = "1";// always checks liveness
                }
                if (config.isFTTX) {
                    isLiveCheckEnable = "1";// always checks liveness
                }
                var userCapturePhotoURI = '';
                console.log("Json", SDKResult)
                var jsonSucess = JSON.parse(SDKResult)
                console.log("jsonSucess1", jsonSucess)
                if (isLiveCheckEnable == ("0") || jsonSucess.result.live == ("yes")) {
                    userCapturePhotoURI = jsonSucess.imageUri;

                    if (userCapturePhotoURI == null || userCapturePhotoURI == '') {

                        showErrorAlert("Please capture photo again.")

                        return;
                    } else {
                        GlobalPOIModel.default.setHyperverge_Cust_IMg_Path(userCapturePhotoURI);
                    }
                    console.log("jsonSucess2", jsonSucess)

                    var base64Icon = 'data:image/jpg;base64,' + SDKImage;
                    document.getElementById("custphoto").src = base64Icon;
                    uploadDocuments.CUST_IMG = base64Icon;
                    //setDisplayImageHyperverge(ivPreview);
                    GlobalPOIModel.default.setcustImage(SDKImage);
                    GlobalPOIModel.default.setCustPhotoCaptureTime(getCurrentDateTime());
                    GlobalPOIModel.default.setCustLat("");
                    GlobalPOIModel.default.setCustLong("");
                    var requestID = "", referenceId = "";
                    var headers = SDKHeader;

                    if (headers.includes("X-HV-Request-Id")) {
                        requestID = JSON.parse(headers)["X-HV-Request-Id"];

                    }
                    if (headers.includes("X-HV-Reference-Id")) {
                        referenceId = JSON.parse(headers)["X-HV-Reference-Id"];
                    }

                    jsonSucess.requestId = requestID;
                    jsonSucess.referenceId = referenceId;

                    GlobalPOIModel.default.setFace_liveliness(JSON.stringify(jsonSucess));
                    GlobalPOIModel.default.setFace_live(jsonSucess.result.live);

                } else {
                    console.log("jsonSucess3", jsonSucess)

                    showErrorAlert("Live image not detected.")


                }
            }
        } else if (document.getElementById("SUBMIT").value == 'VERIFYFM') {
            if (SDKError != null && SDKError != '') {
                var jsonError = JSON.parse(SDKError)
                console.log("JSON", jsonError)
                var errorCode = jsonError.errorCode;
                console.log("SubmitError", errorCode)
                if (SDKJourney == "hyperverge") {
                    var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
                } else {
                    errorMessage = jsonError.errorMsg;
                }
                showErrorAlert(errorMessage)

            } else {
                console.log("Json", SDKResult)
                var jsonSucess = JSON.parse(SDKResult)
                console.log("jsonSucess", jsonSucess)
                var headers = SDKHeader;
                try {
                    if (jsonSucess.statusCode == ("200")) {
                        var qrData = "";
                        var requestID = "", referenceId = "";
                        if (headers.includes("X-HV-Request-Id")) {
                            requestID = JSON.parse(headers)["X-HV-Request-Id"];

                        }
                        if (headers.includes("X-HV-Reference-Id")) {
                            referenceId = JSON.parse(headers)["X-HV-Reference-Id"];
                        }

                        jsonSucess.requestId = requestID;
                        jsonSucess.referenceId = referenceId;

                        var obj_data = jsonSucess.result;
                        var GlobalPOIModel = require('../Model/POIModel')
                        try {
                            var jsonObject2 = JSON.parse(GlobalPOIModel.default.POI_Response);
                            if (jsonObject2 != null && (JSON.stringify(jsonObject2)).includes("details")) {
                                jsonObject2 = jsonObject2.details;
                                if (jsonObject2 != null && (JSON.stringify(jsonObject2)).inlcudes("qr"))
                                    jsonObject2 = jsonObject2.qr;
                                if (jsonObject2 != null && (JSON.stringify(jsonObject2)).includes("value"))
                                    qrData = jsonObject2.value;
                            }
                        } catch (e) {
                        }


                        var matchScore = obj_data["match-score"];
                        if ((JSON.stringify(obj_data)).includes("match"))
                            GlobalPOIModel.default.setFace_match(obj_data.match);

                        GlobalPOIModel.default.setFace_match_Response(JSON.stringify(jsonSucess));

                        if (SDKJourney == 'vishwam') {
                            GlobalPOIModel.default.setFM_VM_LOWERSCORE(getValueFromAuthConfigList("FM_VM_LOWERSCORE"));
                            GlobalPOIModel.default.setFM_VM_UPPERSCORE(getValueFromAuthConfigList("FM_VM_UPPERSCORE"));
                            GlobalPOIModel.default.setFM_LOWERSCORE_AR(getValueFromAuthConfigList("FM_LOWERSCORE_AR"));
                            //for non aadhaar journey
                            GlobalPOIModel.default.setFM_VM_LOWERSCORE_NA(getValueFromAuthConfigList("FM_VM_LOWERSCORE_NA"));
                            GlobalPOIModel.default.setFM_VM_UPPERSCORE_NA(getValueFromAuthConfigList("FM_VM_UPPERSCORE_NA"));

                            if (GlobalPOIModel.default.isAadharKYC) {
                                if (GlobalPOIModel.default.FM_VM_LOWERSCORE != null && GlobalPOIModel.default.FM_VM_LOWERSCORE != ''
                                    && GlobalPOIModel.default.FM_VM_UPPERSCORE != null
                                    && GlobalPOIModel.default.FM_VM_UPPERSCORE != '') {
                                    if (matchScore < parseFloat(GlobalPOIModel.default.FM_VM_LOWERSCORE)) {
                                        if (GlobalPOIModel.default.FM_LOWERSCORE_AR == ("A")) {
                                            GlobalPOIModel.default.isRed = (true);
                                            if (qrData != '') {
                                                GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                                callNextScreen();
                                            }// ocr api call to get address field aket api
                                            else {
                                                callNextScreen();
                                            }

                                        } else {
                                            //Rejected
                                            showErrorAlert("POI Photo and Clicked Photo Does Not Match.");
                                        }
                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_VM_LOWERSCORE)
                                        && matchScore < parseFloat(GlobalPOIModel.default.FM_VM_UPPERSCORE)) {
                                        GlobalPOIModel.default.isRed = (true);
                                        if (qrData != '') {
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();
                                        }// ocr api call to get address field aket api
                                        else {
                                            callNextScreen();
                                        }

                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_VM_UPPERSCORE)) {
                                        GlobalPOIModel.default.isRed = (false);
                                        if (qrData != '') {
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();
                                        }// ocr api call to get address field aket api
                                        else {
                                            callNextScreen();
                                        }

                                    } else {
                                        showErrorAlert("Confidence/Score value not matched")
                                    }

                                } else {
                                    showErrorAlert("Lowerscore/Upperscore is empty")
                                }
                            } else {
                                if (GlobalPOIModel.default.FM_VM_LOWERSCORE_NA != null && GlobalPOIModel.default.FM_VM_LOWERSCORE_NA != ''
                                    && GlobalPOIModel.default.FM_VM_UPPERSCORE_NA != null && GlobalPOIModel.default.FM_VM_UPPERSCORE_NA != '') {
                                    if (matchScore < parseFloat(GlobalPOIModel.default.FM_VM_LOWERSCORE_NA)) {
                                        if (GlobalPOIModel.default.FM_LOWERSCORE_AR == ("A")) {
                                            GlobalPOIModel.default.isRed = (true);

                                            // non aadhar journey
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();

                                        } else {
                                            //Rejected
                                            showErrorAlert("POI Photo and Clicked Photo Does Not Match.");
                                        }
                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_VM_LOWERSCORE_NA)
                                        && matchScore < parseFloat(GlobalPOIModel.default.FM_VM_UPPERSCORE_NA)) {
                                        GlobalPOIModel.default.isRed = (true);

                                        // non aadhar journey
                                        //  validateHyperVergeResponseTask();
                                        GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                        callNextScreen();

                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_VM_UPPERSCORE_NA)) {
                                        GlobalPOIModel.default.isRed = (true);//as discussed with nisha maam always on red bucket for on journey

                                        // non aadhar journey
                                        //  validateHyperVergeResponseTask();//Call shifted to Agent screen
                                        GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                        callNextScreen();


                                    } else {
                                        showErrorAlert("Confidence/Score value not matched");

                                    }

                                } else {
                                    showErrorAlert("Lowerscore/Upperscore is empty");

                                }
                            }
                        } else {


                            GlobalPOIModel.default.setFM_LOWERSCORE(getValueFromAuthConfigList("FM_HV_LOWERSCORE"));
                            GlobalPOIModel.default.setFM_UPPERSCORE(getValueFromAuthConfigList("FM_HV_UPPERSCORE"));
                            GlobalPOIModel.default.setFM_LOWERSCORE_AR(getValueFromAuthConfigList("FM_LOWERSCORE_AR"));
                            //for non aadhaar journey
                            GlobalPOIModel.default.setFM_HV_LOWERSCORE_NA(getValueFromAuthConfigList("FM_HV_LOWERSCORE_NA"));
                            GlobalPOIModel.default.setFM_HV_UPPERSCORE_NA(getValueFromAuthConfigList("FM_HV_UPPERSCORE_NA"));


                            if (GlobalPOIModel.default.isAadharKYC) {
                                if (GlobalPOIModel.default.FM_LOWERSCORE != null && GlobalPOIModel.default.FM_LOWERSCORE != ''
                                    && GlobalPOIModel.default.FM_UPPERSCORE != null
                                    && GlobalPOIModel.default.FM_UPPERSCORE != '') {
                                    if (matchScore < parseFloat(GlobalPOIModel.default.FM_LOWERSCORE)) {
                                        if (GlobalPOIModel.default.FM_LOWERSCORE_AR == ("A")) {
                                            GlobalPOIModel.default.isRed = (true);
                                            if (qrData != '') {
                                                GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                                callNextScreen();
                                            }// ocr api call to get address field aket api
                                            else {
                                                callNextScreen();
                                            }

                                        } else {
                                            //Rejected
                                            showErrorAlert("POI Photo and Clicked Photo Does Not Match.");
                                        }
                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_LOWERSCORE)
                                        && matchScore < parseFloat(GlobalPOIModel.default.FM_UPPERSCORE)) {
                                        GlobalPOIModel.default.isRed = (true);
                                        if (qrData != '') {
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();
                                        }// ocr api call to get address field aket api
                                        else {
                                            callNextScreen();
                                        }

                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.getFM_UPPERSCORE)) {
                                        GlobalPOIModel.default.isRed = (false);
                                        if (qrData != '') {
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();
                                        }// ocr api call to get address field aket api
                                        else {
                                            callNextScreen();
                                        }

                                    } else {
                                        showErrorAlert("Confidence/Score value not matched")
                                    }

                                } else {
                                    showErrorAlert("Lowerscore/Upperscore is empty")
                                }
                            } else {
                                if (GlobalPOIModel.default.FM_HV_LOWERSCORE_NA != null && GlobalPOIModel.default.FM_HV_LOWERSCORE_NA != ''
                                    && GlobalPOIModel.default.FM_HV_UPPERSCORE_NA != null && GlobalPOIModel.default.FM_HV_UPPERSCORE_NA != '') {
                                    if (matchScore < parseFloat(GlobalPOIModel.default.FM_HV_LOWERSCORE_NA)) {
                                        if (GlobalPOIModel.default.FM_LOWERSCORE_AR == ("A")) {
                                            GlobalPOIModel.default.isRed = (true);

                                            // non aadhar journey
                                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                            callNextScreen();

                                        } else {
                                            //Rejected
                                            showErrorAlert("POI Photo and Clicked Photo Does Not Match.");
                                        }
                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_HV_LOWERSCORE_NA)
                                        && matchScore < parseFloat(GlobalPOIModel.default.FM_HV_UPPERSCORE_NA)) {
                                        GlobalPOIModel.default.isRed = (true);

                                        // non aadhar journey
                                        //  validateHyperVergeResponseTask();
                                        GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                        callNextScreen();

                                    } else if (matchScore >= parseFloat(GlobalPOIModel.default.FM_HV_UPPERSCORE_NA)) {
                                        GlobalPOIModel.default.isRed = (true);//as discussed with nisha maam always on red bucket for on journey

                                        // non aadhar journey
                                        //  validateHyperVergeResponseTask();//Call shifted to Agent screen
                                        GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                                        callNextScreen();
                                    } else {
                                        showErrorAlert("Confidence/Score value not matched");
                                    }

                                } else {
                                    showErrorAlert("Lowerscore/Upperscore is empty");
                                }
                            }
                        }
                    }
                } catch (e) {

                }
            }

        }
    }


    const proceed = (e) => {
        e.preventDefault();

        var GlobalPOIModel = require('../Model/POIModel')
        if (GlobalPOIModel.default.custPhotoCaptureTime != null
            && GlobalPOIModel.default.custPOATime != null &&
            GlobalPOIModel.default.custPhotoCaptureTime != ''
            && GlobalPOIModel.default.custPOATime != ''
            && compareTwoDateTime(GlobalPOIModel.default.custPhotoCaptureTime,
                GlobalPOIModel.default.custPOATime)) { //check poi timestamp similar or greater or not
            showErrorAlert("User photo capture time should be greater than POA submission time.");

        } else {

            if (GlobalPOIModel.default.custImage == null || GlobalPOIModel.default.custImage == '') {
                showErrorAlert("Please capture user photo")
            } else

                if ((FaceMatchIdfySDKAllowFlag == ("2") || FaceMatch_SDK_NA == ("4") ||
                    FaceMatchIdfySDKAllowFlag == ("6") || FaceMatch_SDK_NA.equa == ("8"))) {
                    if (GlobalPOIModel.default.isAadharKYC) {
                        if (FaceMatchIdfySDKAllowFlag == ("6")) {//6- for vishwam in aadhar
                            verifyFaceMatchVishwam();
                        } else {
                            verifyFaceMatchHyperVerge();
                        }
                    } else if (FM_NONAADHAAR_CHECK == ("2")) {
                        if (FaceMatch_SDK_NA == ("8")) {//8 for vishwam in non aadhar
                            verifyFaceMatchVishwam();
                        } else {
                            verifyFaceMatchHyperVerge();
                        }
                    } else if (FM_NONAADHAAR_CHECK == ("0")) {
                        if (!config.isFTTX && FaceMatch_SDK_NA == ("4") &&
                            (GlobalPOIModel.default.doctypecode == ("Z00005") || GlobalPOIModel.default.doctypecode == ("Z00001")
                                || GlobalPOIModel.default.doctypecode == ("FS0002") || GlobalPOIModel.default.doctypecode == ("Z00008"))) {
                            //invoke api
                            verifyFaceMatchHyperVerge();
                        } else if (!config.isFTTX && FaceMatch_SDK_NA == ("8") && (GlobalPOAModel.doctypecode == ("Z00005")
                            || GlobalPOAModel.doctypecode == ("Z00001")
                            || GlobalPOIModel.default.doctypecode == ("FS0002") || GlobalPOIModel.default.doctypecode == ("Z00008"))) {
                            //invoke api
                            verifyFaceMatchVishwam();
                        } else if (!config.isFTTX && FaceMatch_SDK_NA == ("4") && (GlobalPOAModel.doctypecode == ("Z00005") ||
                            GlobalPOAModel.doctypecode == ("Z00001")
                            || GlobalPOAModel.doctypecode == ("FS0002") || GlobalPOAModel.doctypecode == ("Z00008"))) {
                            GlobalPOIModel.default.shouldCallValidateHyperVerge = (true);
                            callNextScreen();
                        } else {
                            callNextScreen();
                        }
                    } else {
                        callNextScreen();
                    }

                    //////
                } else {
                    callNextScreen();
                }
        }
    }

    const verifyFaceMatchVishwam = () => {
        SDKJourney = 'vishwam';


        var jsonBody = {
            "dataLogging": "yes",
            "type": "id",
            "signed": "yes",
            "allowMultipleFaces": "no",
            "match_type": 0,
            "app_id": "dkyc",
            "allowDataLogging": true,
            "store_id": config.objGetStore.StoreID

        }

        var jsonHeader = {
            "referenceId": GlobalPOIModel.mOrnNumber
        }

        if (window.Mobile) {


            var appId = "dkyc"

            var appKey = "oljsGtPZWqQEjPcVKOrDBqNLLulfPDrhlvRHoNVRHkqkpjFPZWAOxlFugtYAAopO"

            var appMixPanel = "0"

            var apptimeout = ""
            console.log("VISHWAM_AppId", appId)
            console.log("VISHWAM_AppKey", appKey)
            console.log("VISHWAM_MIX_PANEL", appMixPanel)
            console.log("VISHWAM_TIMEOUT", apptimeout)


            //cc
            window.Mobile.verifyFaceMatch("vishwam", "verifyfacematch", '', GlobalPOIModel.Hyperverge_Cust_IMg_Path, GlobalPOIModel.Hyperverge_POI_1_Img_Path,

                JSON.stringify(jsonBody), JSON.stringify(jsonHeader), appId,
                appKey, appMixPanel, apptimeout);
            //end


        }
    }
    const verifyFaceMatchHyperVerge = () => {
        SDKJourney = 'hyperverge';

        var jsonBody = {
            "dataLogging": "yes",
            "type": "id",
            "signed": "yes",
            "allowMultipleFaces": "no"

        }

        var jsonHeader = {
            "referenceId": GlobalPOIModel.mOrnNumber
        }

        if (window.Mobile) {
            //cc
            window.Mobile.verifyFaceMatch("hyperverge", "verifyfacematch", 'https://jio-faceid-staging.hyperverge.co/v1/photo/verifyPair', GlobalPOIModel.Hyperverge_Cust_IMg_Path, GlobalPOIModel.Hyperverge_POI_1_Img_Path,

                JSON.stringify(jsonBody), JSON.stringify(jsonHeader), appId,
                appKey, appMixPanel, apptimeout);
            //end


        }


    }


    const startFaceCaptureActivityVishwam = () => {

        SDKJourney = 'vishwam';
        var faceConfig;
        console.log("isfftx", config.isFTTX)
        var isFrontview = false;
        if (reqCode == "Front Side") {
            isFrontview = true;
        }

        var whiteCheck = 'no'

        if (HV_WHITE != undefined && HV_WHITE != '' && HV_WHITE.includes("C")) {
            whiteCheck = "yes";  // "yes" for enabling, "no" for disabling
        }

        var jsonHeader = {
            "referenceId": GlobalPOIModel.mOrnNumber

        }
        faceConfig = {
            "shouldUseBackCamera": !(isFrontCam),
            "headers": jsonHeader,
            "faceCaptureTitle": "Face Capture",
            "signed": "yes",
            "shouldShowReviewScreen": true,
            "env": 0,
            "capture_type": 0,
            "app_id": "dkyc",
            "allowDataLogging": true,
            "store_id": config.objGetStore.StoreID,
            "allowEyesClosed": "no",
            "allowOnlyWhiteBackground": whiteCheck,
        }

        if (window.Mobile) {
            var appId = "dkyc"

            var appKey = "oljsGtPZWqQEjPcVKOrDBqNLLulfPDrhlvRHoNVRHkqkpjFPZWAOxlFugtYAAopO"

            var appMixPanel = "0"

            var apptimeout = ""
            console.log("VISHWAM_AppId", appId)
            console.log("VISHWAM_AppKey", appKey)
            console.log("VISHWAM_MIX_PANEL", appMixPanel)
            console.log("VISHWAM_TIMEOUT", apptimeout)

            //cc
            window.Mobile.processCustPhoto("vishwam", "facecapture", JSON.stringify(faceConfig), appId, appKey, appMixPanel, apptimeout);
            //end


        }

    }

    const startFaceCaptureActivity = () => {
        SDKJourney = 'hyperverge';

        GlobalPOIModel.setFace_liveliness("");
        GlobalPOIModel.setFace_live("");
        var jsonBody;

        var whiteCheck = 'no'

        if (HV_WHITE != undefined && HV_WHITE != '' && HV_WHITE.includes("C")) {
            whiteCheck = "yes";  // "yes" for enabling, "no" for disabling
        }
        if (config.isFTTX) {
            jsonBody = {
                "signed": "yes",

            }
        } else {
            jsonBody = {
                "allowEyesClosed": "no",
                "signed": "yes",
                "allowOnlyWhiteBackground": whiteCheck

            }
        }

        var jsonHeader = {
            "referenceId": GlobalPOIModel.mOrnNumber

        }

        var faceConfig = {

            "faceCaptureTitle": true,

            "document": {

                "aspectRatio": ""

            },
            "shouldUseBackCamera": !(isFrontCam),


            "dataLogging": true,

            "shouldSetPadding": true,

            "headers": JSON.stringify(jsonHeader),
            "params": JSON.stringify(jsonBody),
            "livenessEndpoint": "https://ind.faceid.hyperverge.co/v1/photo/liveness"

        }
        if (window.Mobile) {

            //cc
            window.Mobile.processCustPhoto("hyperverge", "facecapture", JSON.stringify(faceConfig), appId,
                appKey, appMixPanel, apptimeout);
            //end

        }

    }

    return (

        <div>
            <div className="modal" role="dialog" style={showDialog ? display : hide}>
                <div className="modal-dialog" style={{ marginTop: "100px", padding: "21px" }}>
                    <div className="modal-content" style={{ "height": "350px" }} justifyContent='center' >
                        <div className="modal-header1">
                            <h5 className="modal-title" style={{ 'font-weight': 'bold', color: "#ffffff" }}>Preview</h5>

                            <a className="close" style={{ color: "#ffffff" }} onClick={() => setShowDialog(false)}>X</a>

                        </div>
                        <img id="previewImage" style={{ "height": "330px" }} justifyContent='center' ></img>


                    </div>
                </div>

            </div>
            <div class="back-color">
                <form id="custphotoform" style={{ height: "100vh" }}>
                    <div class="my_app_container">
                        {FixedHeader()}

                        <div style={{ textAlign: "center" }}>

                            <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "20px" }}>
                                Capture Customer Photo</label>
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <div>
                                    <input type="radio" onClick={() => setIsFrontCam(true)} name="cameraSel" /> <label style={{ color: "black", marginRight: "40px" }}>Front Camera</label>
                                    <input type="radio" onClick={() => setIsFrontCam(false)} name="cameraSel" /> <label style={{ color: "black" }}>Back Camera</label><br />
                                </div>
                                <div class="photoPreviewFrame">
                                    <button style={{ marginTop: "50px" }} id="custPhotoButton" onClick={(e) => onPhotoClick(e, "lat", "long")}>
                                        <img id="custphoto" src={require("../../img/add_new.png")} style={{ width: "110px", height: "110" }} alt="logo" />
                                    </button>
                                    <div class="col-6 col-sm-6" style={{ marginTop: "40px" }}>
                                        <button type="button" class="btn-block jio-btn jio-btn-primary" onClick={(e) => previewClicked(e, "FRONT")}>Preview</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div>
                            <input class="mt-40" id="ERROR" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("custphotoform"),
                                "ERROR")} />

                        </div>
                        <div>
                            <input class="mt-40" id="RESULT" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("custphotoform"),
                                "RESULT")} />

                        </div>
                        <div>
                            <input class="mt-40" id="IMAGE" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("custphotoform")
                                ,
                                "IMAGE")} />

                        </div>
                        <div>
                            <input class="mt-40" id="HEADER" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("custphotoform")
                                ,
                                "HEADER")} />

                        </div>
                        <div>
                            <input class="mt-40" id="URI" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("custphotoform")

                                ,
                                "URI")} />

                        </div>

                        <div>
                            <input class="mt-40" id="SUBMIT" type="text" style={{ "display": "none" }} onClick={(e) => onSubmit(e, document.getElementById("custphotoform"))} />

                        </div>
                    </div>
                </form>
            </div>
            <div class="bottom-fixed-btn">
                <div class="row m-0 mt-4">
                    <div class="col-12 p-2">
                        <button type="button" onClick={(e) => proceed(e)} class="btn-block jio-btn jio-btn-primary">NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );


}


export default CapCustPhoto;