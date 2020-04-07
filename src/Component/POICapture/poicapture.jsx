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
import config from '../../config';
import { getValueFromAuthConfigList, logout, showErrorAlert } from '../../commom/commonMethod';
import useGlobalState from '../../hooks/useGlobalState';
import { storeSelectedDocObject, storeListPOA } from '../../action';
import { confirmAlert } from 'react-confirm-alert';



const poicapture =() =>{




const  fetchLocation =(lat, long, param, e) =>{
    e.preventDefault();
    console.log('param', param)
    that.props.state.reqCode = param;
    if (window.Mobile) {
        window.Mobile.getLocation()
    }
}




const  previewClicked = (str, e) => {
    e.preventDefault();
    if (str == "FRONT") {
        var base64Icon = 'data:image/png;base64,' + GlobalPOIModel.poiImage;
        document.getElementById("previewImage").src = base64Icon;
    } else {
        var base64Icon = 'data:image/png;base64,' + GlobalPOIModel.poaImage;
        document.getElementById("previewImage").src = base64Icon;
    }
    this.props.setState({ showDialog: true })

}



const  onValueSet=(test, param) => {
    //frm.preventDefault();

    if (param == "ERROR") {
        that.props.state.SDKError = document.getElementById(param).value

        console.log("NEELAMError", that.props.state.SDKError);
    } else if (param == "RESULT") {
        that.props.state.SDKResult = document.getElementById(param).value

        console.log("NEELAMRESULT", GSON.encode(that.props.state.SDKResult));

    } else if (param == "IMAGE") {
        that.props.state.SDKImage = document.getElementById(param).value

        console.log("NEELAMIMAGE", that.props.state.SDKImage);


    } else if (param == "HEADER") {
        that.props.state.SDKHeader = document.getElementById(param).value

        console.log("NEELAMHEADER", that.props.state.SDKHeader);


    } else if (param == "URI") {
        that.props.state.SDKURI = document.getElementById(param).value

        console.log("URI", that.props.state.SDKURI);

    }


}


const  onSubmit=(e, frm) =>{
    console.log("SUBMITCALLED", frm + " , " + e)

    // test,param,frm
    // e.preventDefault()
    console.log("SubmitValue", "document")
    console.log("SubmitValue", document.getElementById("SUBMIT").value)
 
    if (document.getElementById("SUBMIT").value == "DOC") {
        if (that.props.state.SDKError != null && that.props.state.SDKError != '') {
            var jsonError = JSON.parse(that.props.state.SDKError)
            console.log("JSON", jsonError)
            var errorCode = jsonError.errorCode;
            console.log("SubmitError", errorCode)
            var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);

            confirmAlert({

                message: errorMessage,

                buttons: [

                    {

                        label: 'Ok',

                    },

                ]

            })
        } else {
            console.log("Json", that.props.state.SDKResult)
            var jsonSucess = JSON.parse(that.props.state.SDKResult)
            console.log("jsonSucess", jsonSucess)



            var documentUri = jsonSucess.imageUri;

            console.log("documentUri", documentUri)

            if (that.props.state.reqCode == "Front Side") {

                //if in case sdk not able to gave proper uri
                if (documentUri == null || documentUri == '') {
                    console.log("onsubmit", "sunmiot");

                    showErrorAlert("Please capture photo again.");
                    return;
                } else {

                    if (that.props.state.SDKImage == null) {
                        console.log("onsubmit", "sunmiot1");

                        showErrorAlert("Please capture photo again.");

                        return;
                    }
                }

            } else if (that.props.state.reqCode == "Back Side") {

                //if in case sdk not able to gave proper uri
                if (documentUri == null || documentUri == '') {
                    console.log("onsubmit", "sunmiot2");
                    showErrorAlert("Please capture photo again.");
                    return;
                } else {
                    if (that.props.state.SDKImage == null) {
                        console.log("onsubmit", "submiot3");
                        showErrorAlert("Please capture photo again.");
                        return;
                    }
                }

            }
            console.log("image", that.props.state.SDKImage);

            that.props.setState({ loading: true })

            if (that.props.state.selectedDocJourney == "hyperverge") {
                console.log("startpoi", "startpoi")
                that.startPOIDispSet(that.props.state.reqCode, documentUri);
            } else {
                that.startPOIDispSetVishwam(that.props.state.reqCode, documentUri);

            }



        }
    } else if (document.getElementById("SUBMIT").value == "OCR") {
        that.props.setState({ loading: false })

        console.log("OCR RESULT", "Hanlded");
        console.log('that.props.state.SDKResult', GSON.parse(GSON.encode(that.props.state.SDKResult)))
        console.log('that.props.state.SDKError', that.props.state.SDKError)
        var jsonSuccess = "";
        if (that.props.state.SDKResult != null && that.props.state.SDKResult != '') {
            jsonSuccess = JSON.stringify(that.props.state.SDKResult)
            console.log('sameer11', jsonSuccess, jsonSuccess.statusCode)
        }
        var result = false;
        if (that.props.state.SDKError != null && that.props.state.SDKError != '') {
            //error msg
            console.log('sameer1')

            var jsonError = JSON.parse(JSON.stringify(that.props.state.SDKError))
            console.log("JSON", jsonError)
            var errorCode = jsonError.errorCode;
            console.log("SubmitError", errorCode)
            var errorMessage = ""
            if (that.props.state.selectedDocJourney == "hyperverge") {
                errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
            } else {
                errorMessage = jsonError.errorMsg;
            }

            confirmAlert({

                message: errorMessage,

                buttons: [

                    {

                        label: 'Ok',

                    },

                ]

            })

        } else if (jsonSuccess.statusCode == "200") {
            console.log('sameer2')

            var array_data = jsonSuccess.result;
            var headers = JSON.parse(that.props.state.SDKHeader)
            //
            for (let i = 0; i < array_data.length; i++) {
                var doc_types = [];
                if (that.props.state.reqCode == "Front Side") {
                    doc_types = that.getDocumentType(GlobalPOIModel.doctypecode, true).split(",");
                } else {
                    doc_types = that.getDocumentType(GlobalPOIModel.doctypecode, false).split(",");
                }
                console.log("DOCTYPES", doc_types.length);
                if (doc_types != "" && doc_types.length > 0) {

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


                            console.log("NEELAMobjdata", obj_data);
                            obj_data.requestId = requestID
                            obj_data.referenceId = referenceId
                            console.log("NEELAMobjdata", obj_data.requestId);

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
            if (that.props.state.reqCode == "Front Side") {
                console.log("NEELAMocrinside", result);
                if (result) {
                    //set photo capture timestamp
                    GlobalPOIModel.setCustPOITime(getCurrentDateTime());

                    GlobalPOIModel.setCustPOILat("test");
                    GlobalPOIModel.setmOrnNumber(config.ORN);
                    GlobalPOIModel.setCustPOILong("test");
                    //Added by neelam
                    GlobalPOIModel.setSdkUsed("hyperverge");
                    //end
                    GlobalPOIModel.setHyperverge_POI_1_Img_Path(that.props.state.SDKURI);
                    console.log("change", GlobalPOIModel.Hyperverge_POI_1_Img_Path);

                    //    imageFilePathPOI1 = setDisplayImage(btnImagePOI1);
                    //do image processing
                    var base64Icon = 'data:image/png;base64,' + that.props.state.SDKImage;
                    document.getElementById("FrontImage").src = base64Icon;
                    uploadDocuments.CUST_EKYC = base64Icon;
                    GlobalPOIModel.setpoiImage(that.props.state.SDKImage);
                    GlobalPOIModel.setPOI_Response(JSON.stringify(obj_data));
                } else {
                    console.log("NEELAMocrinside1", result);

                    //document not matched
                    confirmAlert({

                        message: "Capture document Front side photo.",

                        buttons: [

                            {

                                label: 'Ok',

                            },

                        ]

                    })
                    return;

                }
            } else if (that.props.state.reqCode == "Back Side") {
                console.log("NEELAMocrinsideback", result);

                if (result) {
                    //set photo capture timestamp
                    GlobalPOIModel.setCustPOATime(getCurrentDateTime());
                    GlobalPOIModel.setCustPOISecondLat("test");
                    GlobalPOIModel.setCustPOISecondLong("test");
                    //Added by neelam
                    GlobalPOIModel.setSdkUsed("hyperverge");
                    //end


                    GlobalPOIModel.setHyperverge_POI_2_Img_Path(that.props.state.SDKURI);
                    GlobalPOIModel.setPOA_Response(JSON.stringify(obj_data));


                    //imageFilePathPOI2 = setDisplayImage(btnImagePOI2);
                    //do image processing
                    var base64Icon = 'data:image/png;base64,' + that.props.state.SDKImage;
                    document.getElementById("BackImage").src = base64Icon;
                    uploadDocuments.CUST_EKYC_CONSENT = base64Icon;
                    GlobalPOIModel.setpoaImage(that.props.state.SDKImage);

                    // global.setPOIFilePath(imageFilePathPOI2);


                    //   mSelectedPOIModel.setPOA_Response(obj_data.toString());
                } else {
                    showErrorAlert("Capture document Back side photo.");




                }
            }


        } else {


            if (that.props.state.selectedDocJourney == "vishwam") {
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
        that.props.setState({ loading: false })
        console.log("ALIGN RESULT", "Hanlded");
        var jsonSuccess = "";
        if (that.props.state.SDKResult != null && that.props.state.SDKResult != '') {
            var jsonSuccess = JSON.parse(that.props.state.SDKResult)
        }
        var result = false;
        if (that.props.state.SDKError != null && that.props.state.SDKError != '') {
            //error msg


            var jsonError = JSON.parse(that.props.state.SDKError)
            console.log("JSON", jsonError)
            var errorCode = jsonError.errorCode;
            console.log("SubmitError", errorCode)
            var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);

            confirmAlert({

                message: errorMessage,

                buttons: [

                    {

                        label: 'Ok',

                    },

                ]

            })

        } else if (jsonSuccess.statusCode == "200") {

            //do image processing
            var base64Icon = 'data:image/png;base64,' + that.props.state.SDKImage;
            document.getElementById("FrontImage").src = base64Icon;
            uploadDocuments.CUST_EKYC = base64Icon;
            GlobalPOIModel.setpoiImage(that.props.state.SDKImage);
            GlobalPOIModel.setCustPOITime(getCurrentDateTime);
            GlobalPOIModel.setCustPOILat("");
            GlobalPOIModel.setCustPOILong("");
            GlobalPOIModel.setSdkUsed("hyperverge");
            GlobalPOIModel.setPOI_Response("");

            GlobalPOIModel.setHyperverge_POI_1_Img_Path(that.props.state.SDKURI);




        } else {
            confirmAlert({

                message: "Error",

                buttons: [

                    {

                        label: 'Ok',

                    },

                ]

            })
            return;
        }
    }
}

const  setGeoLocation=(e)=> {
    e.preventDefault()
    console.log(that.props.state.reqCode)
    console.log(document.getElementById('LAT').value)
    console.log(document.getElementById('LON').value)

    const currentDateTime = new Date()
    let currentMonth = ''
    if (currentDateTime.getMonth().length == 1) {
        currentMonth = '0' + currentDateTime.getMonth()
    }
    else {
        currentMonth = currentDateTime.getMonth()
    }
    if (that.props.state.reqCode == "Back Side") {
        let DG_POA = "POA;" + that.props.state.SelectedDocObject.doctypecode + ";" + GlobalPOIModel.docNumber + ";;;" +
            that.props.state.SelectedDocObject.issuingauth + ";" + document.getElementById('LAT').value + "," + document.getElementById('LON').value + ";" +
            currentDateTime.getFullYear() + "-" + currentMonth + "-" + currentDateTime.getDate() + "T" + currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds() + ";hyperverge;"
        console.log(DG_POA)
        CAFRequest.DG_POA = DG_POA
    }
    else if (that.props.state.reqCode == "Front Side") {
        let DG_POI = "POI;" + that.props.state.SelectedDocObject.doctypecode + ";" + GlobalPOIModel.docNumber + ";;;" +
            that.props.state.SelectedDocObject.issuingauth + ";" + document.getElementById('LAT').value + "," + document.getElementById('LON').value + ";" +
            currentDateTime.getFullYear() + "-" + currentMonth + "-" + currentDateTime.getDate() + "T" + currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds() + ";hyperverge;"
            console.log(DG_POI)

            CAFRequest.DG_POI = DG_POI

    }
    that.callRespectiveCameraClass();

}





return (
    <div class="back-color" style={{ height: "100vh" }}>
    <form id="SdkReponseForm">
        <div className="spin">
            <Spinner visible={this.state.loading}
                spinnerColor={"rgba(0, 0, 0, 0.3)"} />
        </div>
        <div>
            <div class="my_app_container">
                {FixedHeader()}
                <div style={{ textAlign: "center", overflowY: "scroll", height: "480px" }}>
                    <p style={{ color: "black", "fontWeight": "bolder" }}>Capture Front View</p>
                    <div id="FrontView" class="photoPreviewFrame">
                        <button style={{ "padding": "20px" }} onClick={(e)=>fetchLocation.bind(this, lat, lon, "Front Side")}>
                            <img id="FrontImage" height="100" width="100" src={require("../../img/poi.png")} alt="Capture Front View"></img>
                        </button>
                        <div class="col-6 col-sm-6">
                            <button type="submit" onClick={(e)=>previewClicked.bind(this, "FRONT")} class="btn-block jio-btn jio-btn-primary" >Preview</button>
                        </div>
                    </div>
                    <p class="mt-40" style={{
                        color: "black", "fontWeight": "bolder",
                        visibility: this.state.showPhotoView
                    }}>Capture Back View</p>
                    <div id="BackView"
                        class="photoPreviewFrame"
                        style={{ visibility: this.state.showPhotoView }}
                    >
                        <button style={{ "padding": "20px" }} onClick={(e)=>fetchLocation.bind(this, lat, lon, "Back Side")}>
                            <img id="BackImage" height="100" width="100" src={require("../../img/poi.png")} alt="Capture Back View"></img>
                        </button>
                        <div class="col-6 col-sm-6">
                            <button type="submit" class="btn-block jio-btn jio-btn-primary" onClick={(e)=>previewClicked.bind(this, "BACK")} >Preview</button>
                        </div>
                    </div>
                    <p class="mt-10" style={{ color: "red", "fontWeight": "bolder" }}>Ensure camera to complete auto focus for image capture</p>
                </div>
            </div>




            <div>
                <input class="mt-40" id="ERROR" type="text" style={{ "display": "none" }} onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm"),
                    "ERROR")} />

            </div>
            <div>
                <input class="mt-40" id="RESULT" type="text" style={{ "display": "none" }} onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm"),
                    "RESULT")} />

            </div>
            <div>
                <input class="mt-40" id="IMAGE" type="text" style={{ "display": "none" }} onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm")
                    ,
                    "IMAGE")} />

            </div>
            <div>
                <input class="mt-40" id="HEADER" type="text" style={{ "display": "none" }} onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm")
                    ,
                    "HEADER")} />

            </div>
            <div>
                <input class="mt-40" id="URI" type="text" style={{ "display": "none" }} onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm")

                    ,
                    "URI")} />

            </div>

            <div>
                <input class="mt-40" id="SUBMIT" type="text" style={{ "display": "none" }} onClick={(e)=>onSubmit.bind(this, document.getElementById("SdkReponseForm"))} />

            </div>
            <div>
                <input class="mt-40" id="LAT" type="text" style={{ "display": "none" }} />

            </div>
            <div>
                <input class="mt-40" id="LON" type="text" style={{ "display": "none" }} />

            </div>
            <div>
                <input class="mt-40" id="SUBMITLOC" onClick={(e)=>setGeoLocation.bind(this)} type="text" style={{ "display": "none" }} />

            </div>
        </div>

    </form>



</div>
)





}


export default  poicapture