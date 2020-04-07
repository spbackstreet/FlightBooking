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

const  poacapture = () =>{
const    fetchLocation = (lat, long, param, e) => {
    e.preventDefault();
    console.log('param', param)
    that.props.state.reqCode = param;
    if (window.Mobile) {
        window.Mobile.getLocation()
    }
}

const  validateAndNext = (e) => {
    e.preventDefault()
    var GlobalPOAModel=require("../Model/POAModel")
    var GlobalPOIModel=require("../Model/POIModel")

  
        if ((GlobalPOIModel.default.Hyperverge_POI_2_Img_Path == null || GlobalPOIModel.default.Hyperverge_POI__Img_Path == '')) {
            showErrorAlert("Please Capture POA");
        } else {

            that.callUserPhotoCaptureScreen();



        }
    

}
const   onValueSet=(test, param) =>{

       
    if (param == "ERROR") {
        that.props.state.SDKError=document.getElementById(param).value

        console.log("Error", that.props.state.SDKError);
    } else if (param == "RESULT") {
        that.props.state.SDKResult=document.getElementById(param).value

        console.log("RESULT", that.props.state.SDKResult);

    } else if (param == "IMAGE") {
        that.props.state.SDKImage=document.getElementById(param).value

        console.log("IMAGE", that.props.state.SDKImage);


    } else if (param == "HEADER") {
        that.props.state.SDKHeader=document.getElementById(param).value

        console.log("HEADER", that.props.state.SDKHeader);


    } else if (param == "URI") {
        that.props.state.SDKURI=document.getElementById(param).value

        console.log("URI", that.props.state.SDKURI);

    }


}
const   previewClicked = (str,e) => {
    e.preventDefault();
      
            var base64Icon = 'data:image/png;base64,' + GlobalPOIModel.poaImage;
            document.getElementById("previewImage").src = base64Icon;
       
    this.props.setState({showDialog :true})
    
}

const   onSubmit=(e, frm)=> {
    //e.preventDefault()

    console.log("SubmitValue", "document")

    console.log("SubmitValue", document.getElementById("SUBMIT").value)
    console.log("ValueE", that.props.state.SDKError)
    console.log("ValueR", that.props.state.SDKResult)

    if (document.getElementById("SUBMIT").value == "DOC") {
        if (that.props.state.SDKError != null && that.props.state.SDKError != '') {
            var jsonError = JSON.parse(that.props.state.SDKError)
            console.log("JSON", jsonError)
            var errorCode = jsonError.errorCode;
            console.log("SubmitError", errorCode)
            var errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
showErrorAlert(errorMessage)
           
        } else {
            console.log("Json", that.props.state.SDKResult)
            var jsonSucess = JSON.parse(that.props.state.SDKResult)
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

                    if (that.props.state.SDKImage == null) {
                        console.log("onsubmit", "sunmiot1");

                        showErrorAlert("Please capture photo again.");

                        return;
                    }
                }

          
            console.log("image", that.props.state.SDKImage);

            that.props.setState({ loading: true })

            that.startPOADispSet(that.props.state.reqCode, documentUri);



        }
    } else if (document.getElementById("SUBMIT").value == "OCR") {
        that.props.setState({ loading: false })

        console.log("OCR RESULT", "Hanlded");
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
            var errorMessage =""
            if(that.props.state.selectedDocJourney=="hyperverge"){
             errorMessage = getHypervergeErrorMessage(errorCode, jsonError.errMsg);
            }else{
                 errorMessage = jsonError.errorMsg;
            }

            
            showErrorAlert(errorMessage)


        } else if (jsonSuccess.statusCode == "200") {
            var array_data = jsonSuccess.result;
            var headers = JSON.parse(that.props.state.SDKHeader)
            //
            for (let i = 0; i < array_data.length; i++) {
                var doc_types = [];
                

                if (that.props.state.reqCode == "Front Side") {
                    if (GlobalPOAModel.doctypecode==("Z00005")
                            || GlobalPOAModel.doctypecode==("Z00008") ||
                            GlobalPOAModel.doctypecode==("FS0002"))
                        doc_types = that.getDocumentType(GlobalPOAModel.doctypecode, false).split(",");
                    else
                        doc_types = that.getDocumentType(GlobalPOAModel.doctypecode, true).split(",");
                } else {
                    doc_types = that.getDocumentType(GlobalPOAModel.doctypecode, false).split(",");
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
    
                          
                            obj_data.requestId=requestID;
                            obj_data.referenceId= referenceId;

                            break;
                        }
                    }
                }else {
                    result = true;
                    var obj_data = array_data[i];
                    var requestID = "", referenceId = "";
                    if (JSON.stringify(headers).includes("X-HV-Request-Id")) {
                        requestID = headers["X-HV-Request-Id"];

                    }
                    if (JSON.stringify(headers).includes("X-HV-Reference-Id")) {
                        referenceId = headers["X-HV-Reference-Id"];
                    }


                            obj_data.requestId=requestID;
                            obj_data.referenceId= referenceId;
                }

                console.log("loop", i);
            }
            if (that.props.state.reqCode == "Front Side") {
                if (result) {
                    //set photo capture timestamp

                    GlobalPOIModel.setCustPOATime(getCurrentDateTime());
                    GlobalPOIModel.setCustPOALat("test");
                    GlobalPOIModel.setCustPOALong("test");
                    GlobalPOIModel.setSdkUsed("hyperverge");

                    GlobalPOIModel.setHyperverge_POI_2_Img_Path(that.props.state.SDKURI);
                    console.log("change", GlobalPOIModel.getHyperverge_POI_2_Img_Path());

                    //    imageFilePathPOI1 = setDisplayImage(btnImagePOI1);
                    //do image processing
                    var base64Icon = 'data:image/png;base64,' + that.props.state.SDKImage;
                    document.getElementById("FrontImage").src = base64Icon;
                    GlobalPOIModel.setpoaImage(that.props.state.SDKImage);

                    GlobalPOIModel.setPOA_Response(JSON.stringify(obj_data));
                } else {
                    //document not matched
                    showErrorAlert("Capture document Front side photo.")

                 
                    return;

                }
            } 


        } else {
           
            if(that.props.state.selectedDocJourney=="vishwam"){
                if (jsonSuccess != null && (JSON.stringify(jsonSuccess)).includes("error")) {
                    showErrorAlert(jsonSuccess.error);

                } else {
                    showErrorAlert("Error in OCR Call");
                }


            }else{
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

            showErrorAlert(errorMessage);
          

        } else if (jsonSuccess.statusCode == "200") {

        //do image processing
        var base64Icon = 'data:image/png;base64,' + that.props.state.SDKImage;
        document.getElementById("FrontImage").src = base64Icon;
            GlobalPOIModel.setpoaImage(that.props.state.SDKImage);
            GlobalPOIModel.setCustPOATime(getCurrentDateTime());
            GlobalPOIModel.setCustPOALat("");
            GlobalPOIModel.setCustPOALong("");
            GlobalPOIModel.setPOA_Response("");//save only ocr respose not alignment response

            GlobalPOIModel.setSdkUsed("hyperverge");
            GlobalPOIModel.setHyperverge_POI_2_Img_Path(that.props.state.SDKURI);
        


    } else {
       
        showErrorAlert("Error");

        return;
    }
}
}


return (
    <div class="back-color">
                    <form id="SdkReponseForm">

                        <div className="spin">
                            <Spinner visible={this.state.loading}
                                spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                        </div>
                        <div class="back-color">

                            <div class="top-fixed-header">




                                {FixedHeader()}




                                <div style={{ textAlign: "center" }}>



                                    <p style={{ color: "black", "fontWeight": "bolder" }}>Capture Back View</p>


                                    <div id="poaview" class="photoPreviewFrame">

                                        <button style={{ "padding": "20px" }}
                                          onClick={(e)=>fetchLocation.bind(this, lat, lon, "Front Side")}
                                         >
                                            <img id="FrontImage" height="100" width="100" src={require("../../img/poi.png")} alt="If POA is same as POI Click back side."></img>
                                        </button>





                                        <div class="col-6 col-sm-6">
                                            <button type="submit" class="btn-block jio-btn jio-btn-primary" 
                                            onClick={(e)=>previewClicked.bind(this, "FRONT")} 
                                            >Preview</button>

                                        </div>

                                    </div>

                                    <p class="mt-10" style={{ color: "red", "fontWeight": "bolder" }}>Ensure camera to complete auto focus for image capture</p>



                                    <button type="submit" class="btn btn-primary btn-login" 
                                    onClick={(e)=>validateAndNext.bind(this)}
                                    >NEXT</button>




                                </div>



                            </div>

                            <div class="left-side-nav">



                                <ul class="list-unstyled nav-links">



                                    <li><a ><img src={require("../../img/device_sell.png")} alt="" /> <span>Devices/Accessories Sale</span></a></li>




                                </ul>

                            </div>
                            <div>
                                <input class="mt-40" id="ERROR" type="text" style={{ "display": "none" }} 
                                onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm"), "ERROR")}
                                     />

                            </div>
                            <div>
                                <input class="mt-40" id="RESULT" type="text" style={{ "display": "none" }} 
                                onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm"),"RESULT")}
                                     />

                            </div>
                            <div>
                                <input class="mt-40" id="IMAGE" type="text" style={{ "display": "none" }}
                                 onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm") ,"IMAGE")}
          />

                            </div>
                            <div>
                                <input class="mt-40" id="HEADER" type="text" style={{ "display": "none" }} 
                               onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm") ,   "HEADER")}
                                 />

                            </div>
                            <div>
                                <input class="mt-40" id="URI" type="text" style={{ "display": "none" }}
                                onClick={(e)=>onValueSet.bind(this, document.getElementById("SdkReponseForm")  ,  "URI")} 
                                 />

                            </div>

                            <div>
                                <input class="mt-40" id="SUBMIT" type="text" style={{ "display": "none" }}
                                 onClick={(e)=>onSubmit.bind(this, document.getElementById("SdkReponseForm"))}
                                  />

                            </div>
                        </div>

                    </form>

                </div>
)
}

export default poacapture