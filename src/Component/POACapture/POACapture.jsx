import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import getpoilist from '../../services/getpoilist';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import useLoader from '../../hooks/useLoader';
import GlobalORNModel from '../../Model/ORNModel';
import GlobalPOIModel from '../../Model/POIModel';
import GlobalPOAModel from '../../Model/POAModel'
import config from '../../config';
import { getValueFromAuthConfigList, logout, showErrorAlert, getCurrentDateTime } from '../../commom/commonMethod';
import useGlobalState from '../../hooks/useGlobalState';
import { storeSelectedDocObject, storeListPOA } from '../../action';
import { confirmAlert } from 'react-confirm-alert';
import {getHypervergeErrorMessage} from '../../commom/commonMethod'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const POACapture = () => {

    const [loading, setLoading] = useState(false)
    const [APIKey, setAPIKey] = useState('')
    const [DeviceDate, setDeviceDate] = useState('')
    const [reqCode, setReqCode] = useState('')
    const [HyperVerge_Data, setHyperVerge_Data] = useState('')
    const [SDKError, setSDKError] = useState('')
    const [SDKResult, setSDKResult] = useState('')
    const [SDKImage, setSDKImage] = useState('')
    const [SDKHeader, setSDKHeader] = useState('')
    const [SDKURI, setSDKURI] = useState('')
    const [FaceMatchIdfySDKAllowFlag, setFaceMatchIdfySDKAllowFlag] = useState('')
    const [FaceMatch_SDK_NA, setFaceMatch_SDK_NA] = useState('')
    const [{ app: { pincode, custLocalAdd, isOutstation, selectedDocObject, SelectedDocPOAObject } }, dispatch] = useGlobalState();
    const [showDialog, setShowDialog] = useState(false)
    const [selectedDocJourney, setSelectedDocJourney] = useState('vishwam')

    const history = useHistory();

    const onValueSet = (test, param) => {


        if (param == "ERROR") {
            setSDKError(document.getElementById(param).value)
            console.log("Error", document.getElementById(param).value);
        }
        else if (param == "RESULT") {
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
            console.log("SDKResult", modifiedString)
        } else if (param == "IMAGE") {
            setSDKImage(document.getElementById(param).value)
            console.log("SDKImage", document.getElementById(param).value);


        } else if (param == "HEADER") {
            setSDKHeader(document.getElementById(param).value)
            console.log("HEADER", document.getElementById(param).value);


        } else if (param == "URI") {
            setSDKURI(document.getElementById(param).value)
            console.log("URI", document.getElementById(param).value);

        }
    }

    const previewClicked = (str, e) => {
        e.preventDefault();

        var base64Icon = 'data:image/jpg;base64,' + GlobalPOIModel.poaImage;
        document.getElementById("previewImage").src = base64Icon;

        setShowDialog(true);
    }

    const getDocumentType = (doc_type, front) => {

        if (doc_type == ("Z00005") && front) {
            return "aadhaar_front_bottom";
        } else if (doc_type == "Z00005" && !front) {
            return "aadhaar_back";
        } else if (doc_type == ("FS0002") && front) {
            return "passport_front";
        } else if (doc_type == ("FS0002") && !front) {
            return "passport_back";
        } else if (doc_type == ("Z00008") && front) {
            return "voterid_front,voterid_front_new";
        } else if (doc_type == ("Z00008") && !front) {
            return "voterid_back";
        } else if (doc_type == ("Z00001") && front) {
            return "pan,old_pan";
        }
        return "";
    }

    const onSubmit = (e, frm) => {
        //e.preventDefault()

        console.log("SubmitValue", "document")
        console.log("SubmitValue", document.getElementById("SUBMIT").value)
        console.log("ValueE", SDKError)
        console.log("ValueR", SDKResult)

        if (document.getElementById("SUBMIT").value == "DOC") {
            if (SDKError != null && SDKError != '') {
                var jsonError = JSON.parse(SDKError)
                console.log("JSON", jsonError)
                var errorCode = jsonError.errorCode;
                console.log("SubmitError", errorCode)
                var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
                showErrorAlert(errorMessage)

            } else {
                console.log("Json", SDKResult)
                var jsonSucess = JSON.parse(SDKResult)
                console.log("jsonSucess", jsonSucess)
                // var jsonSucess = {
                //     imageUri: "\/data\/user\/0\/com.ril.rpos_vishwam_hypervergeapk\/files\/hv\/1571221627240.jpg"
                //}
                var documentUri = jsonSucess.imageUri;

                console.log("documentUri", documentUri)


                //if in case sdk not able to gave proper uri
                if (documentUri == null || documentUri == '') {
                    console.log("onsubmit", "sunmiot");

                    showErrorAlert("Please capture photo again.");
                    return;
                } else {

                    if (SDKImage == null) {
                        console.log("onsubmit", "sunmiot1");

                        showErrorAlert("Please capture photo again.");

                        return;
                    }
                }
                console.log("image", SDKImage);
                setLoading(true)
                startPOADispSet(reqCode, documentUri);

            }
        } else if (document.getElementById("SUBMIT").value == "OCR") {
            setLoading(false)

            console.log("OCR RESULT", "Hanlded");
            var jsonSuccess = "";
            if (SDKResult != null && SDKResult != '') {
                var jsonSuccess = JSON.parse(SDKResult)
            }
            var result = false;
            if (SDKError != null && SDKError != '') {
                //error msg


                var jsonError = JSON.parse(SDKError)
                console.log("JSON", jsonError)
                var errorCode = jsonError.errorCode;
                console.log("SubmitError", errorCode)
                var errorMessage = ""
                if (selectedDocJourney == "hyperverge") {
                    errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
                } else {
                    errorMessage = jsonError.errorMsg;
                }
                showErrorAlert(errorMessage)


            } else if (jsonSuccess.statusCode == "200") {
                var array_data = jsonSuccess.result;
                var headers = JSON.parse(SDKHeader)
                //
                for (let i = 0; i < array_data.length; i++) {
                    var doc_types = [];


                    if (reqCode == "Front Side") {
                        if (GlobalPOAModel.doctypecode == ("Z00005")
                            || GlobalPOAModel.doctypecode == ("Z00008") ||
                            GlobalPOAModel.doctypecode == ("FS0002"))
                            doc_types = getDocumentType(GlobalPOAModel.doctypecode, false).split(",");
                        else
                            doc_types = getDocumentType(GlobalPOAModel.doctypecode, true).split(",");
                    } else {
                        doc_types = getDocumentType(GlobalPOAModel.doctypecode, false).split(",");
                    }

                    console.log("DOCTYPES", doc_types.length);
                    if (doc_types.length > 0) {

                        for (let j = 0; j < doc_types.length; j++) {
                            console.log("DOCTYPES", doc_types[j] + "," + array_data[i].type);

                            if (doc_types[j] == (array_data[i].type)) {
                                result = true;
                                var obj_data = array_data[i];
                                var requestID = "", referenceId = "";
                                if (JSON.stringify(headers).includes("X-HV-Request-Id")) {
                                    requestID = headers["X-HV-Request-Id"];

                                }
                                if (JSON.stringify(headers).includes("X-HV-Reference-Id")) {
                                    referenceId = headers["X-HV-Reference-Id"];
                                }
                                obj_data.requestId = requestID;
                                obj_data.referenceId = referenceId;
                                break;
                            }
                        }
                    } else {
                        result = true;
                        var obj_data = array_data[i];
                        var requestID = "", referenceId = "";
                        if (JSON.stringify(headers).includes("X-HV-Request-Id")) {
                            requestID = headers["X-HV-Request-Id"];

                        }
                        if (JSON.stringify(headers).includes("X-HV-Reference-Id")) {
                            referenceId = headers["X-HV-Reference-Id"];
                        }
                        obj_data.requestId = requestID;
                        obj_data.referenceId = referenceId;
                    }

                    console.log("loop", i);
                }
                if (reqCode == "Front Side") {
                    if (result) {
                        //set photo capture timestamp

                        GlobalPOIModel.setCustPOATime(getCurrentDateTime());
                        GlobalPOIModel.setCustPOALat("test");
                        GlobalPOIModel.setCustPOALong("test");


                        //Added by neelam
                        GlobalPOIModel.setSdkUsed("hyperverge");
                        //end

                        GlobalPOIModel.setHyperverge_POI_2_Img_Path(SDKURI);
                        console.log("change", GlobalPOIModel.getHyperverge_POI_2_Img_Path());

                        //    imageFilePathPOI1 = setDisplayImage(btnImagePOI1);
                        //do image processing
                        var base64Icon = 'data:image/jpg;base64,' + SDKImage;
                        document.getElementById("FrontImage").src = base64Icon;
                        GlobalPOIModel.setpoaImage(SDKImage);

                        GlobalPOIModel.setPOA_Response(JSON.stringify(obj_data));
                    } else {
                        //document not matched
                        showErrorAlert("Capture document Front side photo.")
                        return;

                    }
                }


            } else {

                if (selectedDocJourney == "vishwam") {
                    if (jsonSuccess != null && (JSON.stringify(jsonSuccess)).includes("error")) {
                        showErrorAlert(jsonSuccess.error);

                    } else {
                        showErrorAlert("Error in OCR Call");
                    }
                } else {
                    showErrorAlert("Error");
                }
            }
        } else if (document.getElementById("SUBMIT").value = "ALIGN") {
            setLoading(false)

            console.log("ALIGN RESULT", "Hanlded");
            var jsonSuccess = "";
            if (SDKResult != null && SDKResult != '') {
                var jsonSuccess = JSON.parse(SDKResult)
            }
            var result = false;
            if (SDKError != null && SDKError != '') {
                //error msg


                var jsonError = JSON.parse(SDKError)
                console.log("JSON", jsonError)
                var errorCode = jsonError.errorCode;
                console.log("SubmitError", errorCode)
                var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);

                showErrorAlert(errorMessage);


            } else if (jsonSuccess.statusCode == "200") {

                //do image processing
                var base64Icon = 'data:image/jpg;base64,' + SDKImage;
                document.getElementById("FrontImage").src = base64Icon;
                GlobalPOIModel.setpoaImage(SDKImage);
                GlobalPOIModel.setCustPOATime(getCurrentDateTime());
                GlobalPOIModel.setCustPOALat("");
                GlobalPOIModel.setCustPOALong("");
                GlobalPOIModel.setPOA_Response("");//save only ocr respose not alignment response
                GlobalPOIModel.setSdkUsed("hyperverge");
                GlobalPOIModel.setHyperverge_POI_2_Img_Path(SDKURI);

            } else {

                showErrorAlert("Error");

                return;
            }
        }
    }

    const verifyAlignment = (uri, param, number) => {
        console.log("1", uri);
        console.log("2", param);
        console.log("3", number);
        setLoading(true)

        var OCR_ENDPOINT = "";
        var jsonBody;
        if (config.isFTTX) {
            jsonBody = {
                "dataLogging": "yes",
                "signed": "yes"

            }
        } else {
            jsonBody = {
                "dataLogging": "yes",
                "signed": "yes",
                "allowOnlyHorizontal": "yes"

            }
        }

        var jsonHeader = {
            "referenceId": GlobalPOIModel.mOrnNumber

        }
        if (window.Mobile) {
            var appId = getValueFromAuthConfigList("HV_AppId")

            var appKey = getValueFromAuthConfigList("HV_AppKey")

            var appMixPanel = getValueFromAuthConfigList("HV_MIX_PANEL")

            var apptimeout = getValueFromAuthConfigList("HV_TIMEOUT")

            console.log("ProcessocrJSonbody", JSON.stringify(jsonBody));

            //cc
            window.Mobile.verifyAlignment("hyperverge", "verifyalignment", "https://jio-docs-staging.hyperverge.co/v2.0/verifyAlignment", uri, JSON.stringify(jsonBody), JSON.stringify(jsonHeader), appId, appKey, appMixPanel, apptimeout);
            //end


        }


    }

    const getOCRResult = (uri, param) => {
        //Making OCR call
        console.log("ocr", "called")
        var OCR_ENDPOINT = "";
        var jsonBody;
        console.log("isfftx", config.isFTTX)
        if (config.isFTTX) {
            jsonBody = {
                "dataLogging": "yes",
                "signed": "yes",

            }
        } else {
            jsonBody = {
                "dataLogging": "yes",
                "signed": "yes",
                "allowOnlyHorizontal": "yes"

            }
        }
        var jsonHeader
        if (config.isFTTX) {
            jsonHeader = {
                "referenceId": GlobalPOIModel.mOrnNumber,
                "journey": "na"
            }
        } else {
            jsonHeader = {
                "referenceId": GlobalPOIModel.mOrnNumber
            }
        }

        if (window.Mobile) {
            var appId = getValueFromAuthConfigList("HV_AppId")

            var appKey = getValueFromAuthConfigList("HV_AppKey")

            var appMixPanel = getValueFromAuthConfigList("HV_MIX_PANEL")

            var apptimeout = getValueFromAuthConfigList("HV_TIMEOUT")

            console.log("ProcessocrJSonbody", JSON.stringify(jsonBody));

            //cc
            window.Mobile.processOCR("hyperverge", "getocr", "https://jio-docs-staging.hyperverge.co/v2.0/readKYC", uri, JSON.stringify(jsonBody), JSON.stringify(jsonHeader), appId, appKey, appMixPanel, apptimeout);
            //end


        }

    }

    const startPOADispSet = (param, uri) => {
        GlobalPOIModel.setCustPOATime("");
        GlobalPOIModel.setCustPOALat("");
        GlobalPOIModel.setCustPOALong("");

        console.log("startPOADispSet", GlobalPOAModel.IS_OCR);


        if (GlobalPOIModel.isAadharKYC) {
            getOCRResult(uri, param);
            console.log("startPOADispSet", "1");
        }
        else {
            if (GlobalPOAModel.IS_OCR != null &&
                GlobalPOAModel.IS_OCR == ("Y")) {
                getOCRResult(uri, param);
            } else {
                verifyAlignment(uri, param, 1);
            }


        }
    }

    const requestPermissions = () => {

        function onResponse(response) {
            if (response) {
                console.log("Permission was granted");
            } else {
                console.log("Permission was refused");
            }
            return window.browser.permissions.getAll();
        }

        navigator.permissions.query({ name: 'geolocation' })
            .then(onResponse)
            .then((currentPermissions) => {
                console.log(`Current permissions:`, currentPermissions);
            });
    }

    const validateAndNext = (e) => {
        e.preventDefault()
        var GlobalPOAModel = require("../../Model/POAModel")
        var GlobalPOIModel = require("../../Model/POIModel")


        //for test
        // if ((GlobalPOIModel.default.Hyperverge_POI_2_Img_Path == null || GlobalPOIModel.default.Hyperverge_POI__Img_Path == '')) {
        //     showErrorAlert("Please Capture POA");
        // } else {

        //     callUserPhotoCaptureScreen();
        // }
        callUserPhotoCaptureScreen();

    }

    const callUserPhotoCaptureScreen = () => {
        // this.requestPermissions()

        //console.log("navigator.permissions.query({name:'geolocation'})   : ", navigator.permissions.query({ name: 'geolocation' }))

        // window.browser.permissions.remove(
        //     navigator.permissions.query({name:'geolocation'})
        //   )

        // console.log("navigator.permissions.query({name:'geolocation'})   : ", navigator.permissions.query({ name: 'geolocation' }).PromiseValue
        // )

        // navigator.permissions.query({ name: 'geolocation' })
        //     .then(function (permissionStatus) {
        //         console.log('geolocation permission state is ', permissionStatus.state);

        //         permissionStatus.onchange = function () {
        //             console.log('geolocation permission state has changed to ', that.props);
        //         };
        //     });

        history.push('/CapCustPhoto')
    }

    const fetchLocation = (e, param) => {
        e.preventDefault();
        var config = require('../../config')
        setReqCode(param);

        // if(!lat || !long){
        //showErrorAlert("Location not fetched");
        // }else{

        callRespectiveCameraClass();

        // }


        // callDigKYCPoaFragment();


    }

    const callRespectiveCameraClass = () => {
        if (GlobalPOIModel.isAadharKYC) {
            if (FaceMatchIdfySDKAllowFlag == ("2")) {
                startDocumentCaptureHyperVerge();
            } else {
                //normla camera
            }
        } else {
            //  if(!config.isFTTX){
            if (FaceMatch_SDK_NA == ("4")) {
                startDocumentCaptureHyperVerge();
            } else {
                //normal camersa
            }
            // }else{
            //     //nomrla camera
            // }


        }
    }

    const startDocumentCapture = () => {
        startDocumentCaptureHyperVerge();

    }

    const startDocumentCaptureHyperVerge = () => {

        var aspectRatio = ""//from backend

        var docConfig = {

            "shouldShowReviewScreen": true,

            "document": {

                "aspectRatio": ""

            },

            "docCaptureSubText": "",

            "shouldSetPadding": true,

            "padding": "",

            "document": "",
            "shouldAllowPhoneTilt": '',
            "allowedTiltRoll": '',
            "allowedTiltPitch": ''



        }

        if (SelectedDocPOAObject.doctypecode === "Z00005" || SelectedDocPOAObject.doctypecode === "Z00001") {
            HyperVerge_Data = "CARD";

        } else

            if (SelectedDocPOAObject.doctypecode === "FS0002") {
                HyperVerge_Data = "PASSPORT";


            } else

                if (SelectedDocPOAObject.doctypecode === "Z00008") {
                    HyperVerge_Data = "OTHER";


                } else {
                    HyperVerge_Data = "A4";
                }



        if (HyperVerge_Data === "CARD" || HyperVerge_Data === "PASSPORT" || HyperVerge_Data === "OTHER") {

            aspectRatio = SelectedDocPOAObject.Aspect_ratio

        }
        else {
            aspectRatio = "1.5"
        }




        docConfig.document = HyperVerge_Data;

        docConfig.padding = parseFloat(0.05);

        docConfig.docCaptureSubText = "Front/Back Side";
        //  docConfig.document.aspectRatio=aspectRatio;
        if (!config.isFTTX) {
            var angle = getValueFromAuthConfigList("HV_TILT_ANGLE");
            var tilt = getValueFromAuthConfigList("HV_TILT");
            if (tilt != '') {

                docConfig.shouldAllowPhoneTilt = (tilt);

            }
            if (angle != '') {
                var roll = angle.split(",")[0];
                var pitch = angle.split(",")[1];
                docConfig.allowedTiltRoll = (roll)
                docConfig.allowedTiltPitch = (pitch);
            }

        }



        console.log(JSON.stringify(docConfig))



        if (window.Mobile) {



            var appId = getValueFromAuthConfigList("HV_AppId")

            var appKey = getValueFromAuthConfigList("HV_AppKey")

            var appMixPanel = getValueFromAuthConfigList("HV_MIX_PANEL")

            var apptimeout = getValueFromAuthConfigList("HV_TIMEOUT")
            console.log("HV_AppId", appId)
            console.log("HV_AppKey", appKey)
            console.log("HV_MIX_PANEL", appMixPanel)
            console.log("HV_TIMEOUT", apptimeout)


            //cc
            window.Mobile.processDocCapture("hyperverge", "doccapture", JSON.stringify(docConfig), appId, appKey, appMixPanel, apptimeout);
            //end


        }

    }


    // const permissionsToRequest: {
    //     "permissions": ["geolocation"],
    //     "origins": ["https://developer.mozilla.org/"]
    // }

    //for test
    // setFaceMatchIdfySDKAllowFlag (getValueFromAuthConfigList('FaceMatch_SDK'));
    // setFaceMatch_SDK_NA (getValueFromAuthConfigList('FaceMatch_SDK_NA'));


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
                <form id="SdkReponseForm">

                    <div className="spin">
                        <Spinner visible={loading}
                            spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                    </div>
                    <div class="back-color">

                        <div class="top-fixed-header">
                            {FixedHeader()}
                            <div style={{ textAlign: "center" }}>
                                <p style={{ color: "black", "fontWeight": "bolder" }}>Capture Back View</p>
                                <div id="poaview" class="photoPreviewFrame">

                                    <button style={{ "padding": "20px" }} onClick={(e) => fetchLocation(e, "Front Side")}>
                                        <img id="FrontImage" height="100" width="100" src={require("../../img/poi.png")} alt="If POA is same as POI Click back side."></img>
                                    </button>
                                    <div class="col-6 col-sm-6">
                                        <button type="submit" class="btn-block jio-btn jio-btn-primary" onClick={(e) => previewClicked(e, "FRONT")} >Preview</button>
                                    </div>
                                </div>
                                <div class="bottom-fixed-btn">
                                    <p class="mt-10" style={{ color: "red", "fontWeight": "bolder" }}>Ensure camera to complete auto focus for image capture</p>
                                    <div class="row m-0 mt-4">
                                        <div class="col-12 p-2">
                                            <button type="button" onClick={(e) => validateAndNext(e)} class="btn-block jio-btn jio-btn-primary">NEXT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <input class="mt-40" id="ERROR" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("SdkReponseForm"),
                                "ERROR")} />

                        </div>
                        <div>
                            <input class="mt-40" id="RESULT" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("SdkReponseForm"),
                                "RESULT")} />

                        </div>
                        <div>
                            <input class="mt-40" id="IMAGE" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("SdkReponseForm")
                                ,
                                "IMAGE")} />

                        </div>
                        <div>
                            <input class="mt-40" id="HEADER" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("SdkReponseForm")
                                ,
                                "HEADER")} />

                        </div>
                        <div>
                            <input class="mt-40" id="URI" type="text" style={{ "display": "none" }} onClick={(e) => onValueSet(e, document.getElementById("SdkReponseForm")

                                ,
                                "URI")} />

                        </div>

                        <div>
                            <input class="mt-40" id="SUBMIT" type="text" style={{ "display": "none" }} onClick={(e) => onSubmit(e, document.getElementById("SdkReponseForm"))} />

                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default POACapture