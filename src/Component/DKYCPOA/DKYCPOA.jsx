import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from 'react-bootstrap/Button';
import { FixedHeader } from '../../commom/FixedHeader';
import { fips } from 'crypto';
import GlobalPOAModel from '../../Model/POAModel';
import config from '../../config';
import { showErrorAlert } from '../../commom/commonMethod';
import { storeSelectedDocPOAObject } from '../../action';

import '../../css/style.css';
import useLoader from '../../hooks/useLoader';
import useGlobalState from '../../hooks/useGlobalState';
import GlobalPOIModel from '../../Model/POIModel';
// import CAFRequest from "../../txnUploadData/cafRequest"
import { getCurrentDateForPOAPOI, getCurrentDateForTxn, docDateofIssue } from '../../commom/CommonMethods';


const DKYCPOA = () => {

    const [DeviceDate, setDeviceDate] = useState('');
    debugger;
    // const [{ app: { selectedDocObject, poaList } }, dispatch] = useGlobalState();
    const [sameAsPOI, setSameAsPOI] = useState(false);
    let [SelectedDocPOAObject, setSelectedDocPOAObject] = useState({});
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [visibleCB, setVisibleCB] = useState('visible');
    const [disabled, setDisabled] = useState(false);
    const history = useHistory()

    debugger;


    useEffect(() => {

        if (config.isAadharKYC) {
            setVisibleCB('visible');
            setSameAsPOI(true)
        }
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var Finaldate = (date + "-" + '0' + month + "-" + year + " " + hours + ":" + min + ":" + sec);

        setDeviceDate(Finaldate)

    }, []);

    useEffect(() => {

        if (sameAsPOI) {
            try {
                document.getElementById("docNumber").value = GlobalPOIModel.docNumber
                document.getElementById("placeOfIssue").value = GlobalPOIModel.placeOfIssue
                document.getElementById("dateOfIssue").value = GlobalPOIModel.dateOfIssue
                document.getElementById("authority").value = GlobalPOIModel.issuingauth
            } catch (e) {
                console.log("exception", e)
            }
        }

    }, [sameAsPOI]);

    const getSpinnerSelectedValue = () => {
        var isFound = false;
        if (sameAsPOI) {
            for (let index = 0; index < config.poaList.length; index++) {
                const element = config.poaList[index];
                if (config.selectedDocObject.doctypecode === element.doctypecode) {
                    isFound = true;
                    console.log("POADOC1", SelectedDocPOAObject.DocName);
                    setSelectedDocPOAObject(element)
                    setDisabled(true)
                    console.log("POADOC2", element.DocName);
                    console.log("disabled", true)
                    break
                }
            }
        }
        if (!isFound) {
            setVisibleCB('hidden');
            setDisabled(false);
            setSameAsPOI(false)
        }
        if (config.selectedDocObject.doctypecode == "Z00005") {
            setVisibleCB('hidden')
        }
    }

    const handleSpinnerChange = (event) => {
        console.log("Event", event.target.value)
        for (let index = 0; index < config.poaList.length; index++) {
            let element = config.poaList[index];
            if (event.target.value === element.DocName) {
                SelectedDocPOAObject = element;
                if (config.selectedDocObject.doctypecode == element.doctypecode) {
                    setSameAsPOI(true);
                    setDisabled(true);
                    setVisibleCB(true)

                    document.getElementById("docNumber").value = GlobalPOIModel.docNumber
                    document.getElementById("placeOfIssue").value = GlobalPOIModel.placeOfIssue
                    document.getElementById("dateOfIssue").value = GlobalPOIModel.dateOfIssue
                    document.getElementById("authority").value = GlobalPOIModel.issuingauth

                } else {
                    setDisabled(false);
                    setSameAsPOI(false);
                    setSelectedDocPOAObject(element)
                }
                break
            }
        }
    }

    const handleCheckboxChange = (event) => {
        var vsameAsPOI = sameAsPOI;
        setSameAsPOI(!sameAsPOI);
        vsameAsPOI = !vsameAsPOI;

        if (vsameAsPOI) {
            getSpinnerSelectedValue(event);
            document.getElementById("docNumber").value = GlobalPOIModel.docNumber
            document.getElementById("placeOfIssue").value = GlobalPOIModel.placeOfIssue
            document.getElementById("dateOfIssue").value = GlobalPOIModel.dateOfIssue
            document.getElementById("authority").value = GlobalPOIModel.issuingauth
        } else {
            setDisabled(false);
            setSelectedDocPOAObject(config.poaList[0])
            try {
                document.getElementById("docNumber").value = ""
                document.getElementById("placeOfIssue").value = ""
                document.getElementById("dateOfIssue").value = ""
                document.getElementById("authority").value = ""
            } catch (e) {
                console.log("exception", e)
            }
        }

    }

    const fillData = () => {
        const dateInput = docDateofIssue(document.getElementById("dateOfIssue").value)

        GlobalPOAModel.setDocName(SelectedDocPOAObject.DocName);
        GlobalPOAModel.setPhotoCount(SelectedDocPOAObject.PhotoCount);
        GlobalPOAModel.setViewToCapture(SelectedDocPOAObject.ViewToCapture);
        GlobalPOAModel.setDocdesc(SelectedDocPOAObject.docdesc);
        GlobalPOAModel.setDoctypecode(SelectedDocPOAObject.doctypecode);
        GlobalPOAModel.setIssuingauth(SelectedDocPOAObject.issuingauth);
        GlobalPOAModel.setIsDateOfIssue(SelectedDocPOAObject.IsDateOfIssue);
        GlobalPOAModel.setIsPlaceOfIssue(GlobalPOIModel.IsPlaceOfIssue);
        GlobalPOAModel.setIsSameAsPOI(GlobalPOIModel.IsSameAsPOI);
        GlobalPOAModel.setDocNumber(document.getElementById("docNumber").value);
        GlobalPOAModel.setDateOfIssue(dateInput);
        GlobalPOAModel.setPlaceOfIssue(document.getElementById("placeOfIssue").value);
        GlobalPOAModel.setIssuingAuthority(SelectedDocPOAObject.issuingAuthority);
        GlobalPOAModel.setIS_OCR(SelectedDocPOAObject.IS_OCR);
        GlobalPOAModel.setAspect_ratio(SelectedDocPOAObject.Aspect_ratio);
        GlobalPOAModel.setSdkUsed(GlobalPOIModel.sdkUsed);

        // CAFRequest.Aadhar_Number(document.getElementById("docNumber").value)

        config.Aadhar_Number = document.getElementById("docNumber").value

        transferToNextFragment();
    }

    const submit = (e) => {
        e.preventDefault()
        if (sameAsPOI) {
            GlobalPOAModel.setDocName(GlobalPOIModel.DocName);
            GlobalPOAModel.setPhotoCount(GlobalPOIModel.PhotoCount);
            GlobalPOAModel.setViewToCapture(GlobalPOIModel.ViewToCapture);
            GlobalPOAModel.setDocdesc(GlobalPOIModel.docdesc);
            GlobalPOAModel.setDoctypecode(GlobalPOIModel.doctypecode);
            GlobalPOAModel.setIssuingauth(GlobalPOIModel.issuingauth);
            GlobalPOAModel.setIsDateOfIssue(GlobalPOIModel.IsDateOfIssue);
            GlobalPOAModel.setIsPlaceOfIssue(GlobalPOIModel.IsPlaceOfIssue);
            GlobalPOAModel.setIsSameAsPOI(GlobalPOIModel.IsSameAsPOI);
            GlobalPOAModel.setDocNumber(GlobalPOIModel.docNumber);
            GlobalPOAModel.setDateOfIssue(GlobalPOIModel.dateOfIssue);
            GlobalPOAModel.setPlaceOfIssue(GlobalPOIModel.placeOfIssue);
            GlobalPOAModel.setIssuingAuthority(GlobalPOIModel.issuingAuthority);
            GlobalPOAModel.setIS_OCR(GlobalPOIModel.IS_OCR);
            GlobalPOAModel.setAspect_ratio(GlobalPOIModel.Aspect_ratio);
            GlobalPOAModel.setSdkUsed(GlobalPOIModel.sdkUsed);

            transferToNextFragment();
        } else {

            var dateRegex = /[a-zA-Z]/;
            var regPassport = /([a-zA-Z]){1}([0-9]){7}?$/;
            var regexAadhar = /^\d{12}$/;

            if (SelectedDocPOAObject == null) {
                showErrorAlert("Please select POA")
            } else if ((SelectedDocPOAObject.DocName).toUpperCase() == 'SELECT') {
                showErrorAlert('Please select POA')
            } else if (SelectedDocPOAObject.IsDateOfIssue != null &&
                SelectedDocPOAObject.IsDateOfIssue != '' &&
                SelectedDocPOAObject.IsDateOfIssue == ("YES") &&
                document.getElementById("dateOfIssue").value == '') {
                showErrorAlert("Please enter date of issue");

            } else if (document.getElementById("dateOfIssue").value != '' && dateRegex.test(document.getElementById("dateOfIssue").value)) {
                showErrorAlert("Invalid date of issue");

            } else if (SelectedDocPOAObject.PhotoCount == null || SelectedDocPOAObject.PhotoCount == '' ||
                SelectedDocPOAObject.PhotoCount == '0') {
                showErrorAlert("Photo count not maintained for this POA")
            } else if (document.getElementById("docNumber").value == '') {
                showErrorAlert("Please enter Document number")

            } else if (SelectedDocPOAObject.doctypecode != null && SelectedDocPOAObject.doctypecode == ("Z00005")
                && document.getElementById("docNumber").value.length != 12) {
                showErrorAlert("Please enter valid Aadhaar number")

            } else if (SelectedDocPOAObject.doctypecode == ("Z00005") &&
                regexAadhar.test(document.getElementById("docNumber").value) && document.getElementById("docNumber").value.length != 12) {
                showErrorAlert("Please enter valid Aadhaar number")
            } else if (SelectedDocPOAObject.doctypecode != null && SelectedDocPOAObject.doctypecode
                == ("FS0002") && document.getElementById("docNumber").value.length != 8) {
                showErrorAlert("Please enter valid Passport number")
            } else if (SelectedDocPOAObject.doctypecode != ("Z00005") && document.getElementById("placeOfIssue").value == '') {
                showErrorAlert("Please enter place of issue")
            } else if (SelectedDocPOAObject.doctypecode != null && SelectedDocPOAObject.doctypecode
                == ("Z00013") && document.getElementById("docNumber").value.length != 16) {
                showErrorAlert("Please enter valid Credit card number")

            } else {
                if (SelectedDocPOAObject.doctypecode != null
                    && SelectedDocPOAObject.doctypecode == ("FS0002")) {  // PASSPORT
                    if (regPassport.test(document.getElementById("docNumber").value)) {
                        fillData();

                    } else {
                        showErrorAlert("Please enter valid Passport number")
                    }
                } else {
                    fillData();
                }
            }
        }
    }

    const transferToNextFragment = async () => {
        if (GlobalPOIModel.isAadharKYC) {
            history.push('/CapCustPhoto')
        }
        else {
            // await dispatch(storeSelectedDocPOAObject(SelectedDocPOAObject));
            config.SelectedDocPOAObject = SelectedDocPOAObject
            history.push('/POACapture');
        }
    }



    //constructor
    if (isFirstTime) {
        getSpinnerSelectedValue();
        console.log("v", SelectedDocPOAObject.DocName);
        setIsFirstTime(false);
    }
    //end

    return (
        <div class="back-color">
            <div class="back-color">
                <div class="top-fixed-header">
                    {FixedHeader()}
                    <div>
                    
                        <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "20px" }}>Select POA</label>
                        <label style={{ color: "#FF0000" }}>*</label>
                        <form id="DkycPOAForm">
                            <div class="form-group col-12">

                                <select class="custom-select rounded-0 p-1" disabled={disabled ? "disabled" : ""} id="spinnerPOA" onChange={(e) => handleSpinnerChange(e)} >
                                    {config.poaList.map((element) => (<option selected={SelectedDocPOAObject == element}>{element.DocName}</option>))}

                                </select>
                            </div>
                            <div class="form-group col-12">
                                <select class="custom-select rounded-0 p-1" style={{ height: "38px" }}>
                                    <option>{SelectedDocPOAObject.DocName}</option>
                                </select>
                            </div>


                            <div class="training-mode" style={{ textAlign: "left", marginLeft: "20px" }}>
                                <label class="log-cont" style={{ visibility: visibleCB, color: "black" }}>Same as POI
    <input type="checkbox" id="cbSameAsPOI" name="trainigmode" class="log-checkbox" checked={sameAsPOI}
                                        onChange={(e) => handleCheckboxChange(e)} />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                            </div>

                            <div id="DocView" className="DocView" style={{ visibility: (sameAsPOI) ? "hidden" : "visible" }}>
                                <div class="card shadow mt-2" style={{"marginLeft" : "20px", "marginRight" : "20px"}}>
                                    <div class="card-body">

                                        <div class="form-group">
                                            <input disabled={(disabled) ? "disabled" : ""}
                                                id="docNumber"
                                                type="text" maxLength="20" placeholder=" "
                                                autocomplete="off"
                                                class="jio-form-control" />
                                            <label for="docNumber" class="control-label">Document Number <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input disabled={(disabled) ? "disabled" : ""}

                                                type="date" id="dateOfIssue" name="trip-start"
                                                class="jio-form-control" />
                                            <label for="dateOfIssue" class="control-label">Date of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input disabled={(disabled) ? "disabled" : ""}
                                                id="placeOfIssue"
                                                autocomplete="off"
                                                type="text" maxLength="20" placeholder=" "
                                                class="jio-form-control" />
                                            <label for="placeOfIssue" class="control-label">Place of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input disabled={"disabled"}
                                                value={SelectedDocPOAObject.issuingauth}
                                                id="authority"
                                                type="text"
                                                autocomplete="off"
                                                class="jio-form-control"
                                                placeholder=" " />
                                            <label for="authority" class="control-label">Issuing Authority <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>

                                <button type="submit" style={{ width: "90%" }} onClick={(e) => submit(e)} class="btn jio-btn jio-btn-primary w-75 plan-btn" style={{ "background": "#0D95A2" }}>NEXT</button>

                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DKYCPOA