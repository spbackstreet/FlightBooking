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


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const DKYC = () => {

    const [loading, setLoading] = useState(false)
    const [selectJourney, setSelectJourney] = useState("Aadhar")
    const [poi, setPoi] = useState('Aadhar')
    const [isAadhaar, setIsAadhar] = useState(true)
    const [{ app: { pincode, custLocalAdd, isOutstation } }, dispatch] = useGlobalState();


    const [poiList, setPoiList] = useState([])
    const [poaList, setPoaList] = useState([])

    const [showQrDiv, setShowQrDiv] = useState(true)
    const [AadhaarScan, setAadhaarScan] = useState(false)
    const [showDocView, setShowDocView] = useState(false)
    const [selectedDocObject, setSelectedDocObject] = useState('')
    const [dateOfIssue, setDateOfIssue] = useState('')
    const [placeOfIssue, setPlaceOfIssue] = useState('')
    const [docNumber, setDocNumber] = useState('')
    const history = useHistory();
    const [triggerAction] = useLoader();

    const updateDateOfIssue = (e) => {
        setDateOfIssue(e.target.value)
    }

    const updatePlaceOfIssue = (e) => {
        setPlaceOfIssue(e.target.value)
    }

    const updateDocNumber = (e) => {
        setDocNumber(e.target.value)
    }

    const handlePOIChange = (e) => {
        setSelectJourney(e.target.value)
        setPoi(e.target.value);
        if (e.target.value === "NonAadhar") {
            setIsAadhar(false)
        }
        else {
            setIsAadhar(true)
        }
    }

    useEffect(() => {

        (async () => {
            setLoading(true)
            const fetchPoaPoiMaster = await triggerAction(() => getpoilist(isAadhaar));
            setLoading(false)

            if (fetchPoaPoiMaster.Error_Code === "00" || fetchPoaPoiMaster.Error_Code === "0") {
                setPoiList([...fetchPoaPoiMaster.lstPOI])
                setPoaList([...fetchPoaPoiMaster.lstPOA])
                //set up spinner
                var showDiv = false;
                var showDoc = true;
                if (isAadhaar) {
                    showDiv = true;
                    showDoc = false
                }

                setSelectedDocObject((fetchPoaPoiMaster.lstPOI)[1])
                setShowQrDiv(showDiv)
                setShowDocView(showDoc)

            }
        })()


    }, [isAadhaar]);

    const handleSpinnerChange = (e) => {

        for (let index = 0; index < poiList.length; index++) {
            const element = poiList[index];
            if (e.target.value === element.DocName) {
                setSelectedDocObject(element)
              break
            }
      
          }
        
    }

    const doScan = (e) => {
        e.preventDefault();
        GlobalPOIModel.qrScannedData = "";
        if (window.Mobile) {
            console.log("config.userID " + config.userID)

            window.Mobile.handleScanQR();
        }

    }

    const submit = (e) => {
        e.preventDefault()
        var regPanCard = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        var regPassport = /([a-zA-Z]){1}([0-9]){7}?$/;
        var regexAadhar = /^\d{12}$/;
        if (GlobalPOIModel.isAadharKYC) {
            if (AadhaarScan == true) {
                config.isAadharKYC = true
                transferToNext()
            }
            else {
                showErrorAlert("Please scan Aadhaar QR code")
            }
        } else if (selectedDocObject == '') {
            showErrorAlert('Please select POI')

        } else if ((selectedDocObject.DocName).toUpperCase() == 'SELECT') {
            showErrorAlert('Please select POI')
        }

        else if (docNumber.value == '') {
            showErrorAlert('Please enter Doc Number')
        } else if (selectedDocObject.IsDateOfIssue != '' && selectedDocObject.IsDateOfIssue == 'YES' && document.getElementById('dateOfIssue').value  == '') {
            showErrorAlert('Please enter Date Of Issue')
        } else if (placeOfIssue == '') {
            showErrorAlert('Please enter Place Of Issue')
        } else if (selectedDocObject.doctypecode == 'Z00005' && (docNumber.length != 12)) {
            showErrorAlert('Please enter valid Aadhaar number')
        } else if (selectedDocObject.doctypecode == 'Z00005' && !regexAadhar.test(docNumber)) {
            showErrorAlert('Please enter valid Aadhaar number')
        } else if (selectedDocObject.doctypecode == "FS0002" && docNumber.length != 8) {
            showErrorAlert('Please enter valid Passport number')

        } else {

            if (selectedDocObject.doctypecode == "Z00001") {
                if (regPanCard.test(docNumber)) {
                    transferToNext()
                } else {
                    showErrorAlert('Please enter valid PAN Card number')
                }
            } else if (selectedDocObject.doctypecode == "FS0002") {
                if (regPassport.test(docNumber)) {
                    transferToNext()
                } else {

                    showErrorAlert('Please enter valid Passport number')
                }

            } else if (selectedDocObject.doctypecode == "Z00013" && docNumber.length != 16) {
                showErrorAlert('Please enter valid Credit card number')

            } else {
                transferToNext()
            }
        }
    }

    const transferToNext = async (e) => {
        console.log("Success", "Next Screem")

        GlobalPOIModel.setDocName = selectedDocObject.DocName
        GlobalPOIModel.PhotoCount = selectedDocObject.PhotoCount;
        GlobalPOIModel.ViewToCapture = selectedDocObject.ViewToCapture;
        GlobalPOIModel.docdesc = selectedDocObject.docdesc;
        GlobalPOIModel.doctypecode = selectedDocObject.doctypecode;
        GlobalPOIModel.issuingAuthority = selectedDocObject.issuingauth;
        GlobalPOIModel.IsSameAsPOI = selectedDocObject.IsSameAsPOI;
        GlobalPOIModel.IS_OCR = selectedDocObject.IS_OCR;
        GlobalPOIModel.Aspect_ratio = selectedDocObject.Aspect_ratio;
        GlobalPOIModel.issuingauth = selectedDocObject.issuingauth;
        if (selectedDocObject.doctypecode == "Z00005") {
            GlobalPOIModel.setAadharKYC(true);

        } else {
            GlobalPOIModel.setAadharKYC(false);
            GlobalPOIModel.docNumber = (docNumber);
            GlobalPOIModel.dateOfIssue = (document.getElementById('dateOfIssue').value);
            GlobalPOIModel.placeOfIssue = (placeOfIssue);
        }


        if (!config.isFTTX && GlobalPOIModel.isAadharKYC) {
            //GlobalPOIModel.qrScannedData=(scannedData);
        }
        if (GlobalPOIModel.isAadharKYC) {
            GlobalPOIModel.setRed = (false);
        } else {
            GlobalPOIModel.setRed = (true);
        }

        await dispatch(storeSelectedDocObject(selectedDocObject));
        await dispatch(storeListPOA(poaList));

        history.push('/POICapture')

    }


    return (


        <div class="my_app_container">
            {FixedHeader()}
            <div class="rechargehome_wrapper">
                <div>

                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="date-title bold-font mt-3  mb-2 ml-3 mr-3 f-16">Mode of Activation</div>
                                <div class="card shadow-sm payment-mode">
                                    <div class="card-body p-0">
                                        <div class="form-group pb-0 mb-0">
                                            <div class="radio-wrap">
                                                <div class="custom-control custom-radio custom-control-inline d-flex">
                                                    <input type="radio"
                                                        value="Aadhar"
                                                        checked={selectJourney === "Aadhar"}
                                                        onChange={(e) => handlePOIChange(e)}
                                                        id="customRadio3" name="customRadio" class="custom-control-input" />
                                                    <label class="custom-control-label" for="customRadio3">Aadhar</label>
                                                </div>

                                                <div class="custom-control custom-radio custom-control-inline d-flex">
                                                    <input type="radio"
                                                        value="NonAadhar"
                                                        checked={selectJourney === "NonAadhar"}
                                                        onChange={(e) => handlePOIChange(e)}
                                                        id="customRadio4" name="customRadio" class="custom-control-input" />
                                                    <label class="custom-control-label" for="customRadio4">Non Aadhar</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pt-95 text-center mt-2">
                            <p style={{ color: "black", marginTop: "0px" }}>Select POI *</p>
                            <br />
                            <select class="customsel"
                                onChange={(e) => handleSpinnerChange(e)} value={selectedDocObject}
                            >

                                {poiList.map((element) => (
                                    <option
                                        selected={selectedDocObject == element}
                                       
                                    >{element.DocName}</option>))}

                            </select>

                            <div id="QrView" style={showQrDiv ? { marginBottom: '20vh' } : { display: 'none' }} >
                                <p class="fs-13 txt-col-1 mt-10">Scan QR Here</p>
                                <button class="scan-icon-70 mt-1"
                                    onClick={(e) => doScan(e)}
                                ></button>
                                <br />

                                {AadhaarScan ?
                                    <p class="fs-13 txt-col-1">Aadhar QR code validated successfully. Click on next to proceed.</p>
                                    : null}
                            </div>

                            <div >


                                {showDocView ?
                                    <div class="card shadow" style={{ "marginTop": "20px" }} >
                                        <div class="card-body">

                                            <div class="form-group">
                                                <input type="text" id="docNumber" autoComplete="off"
                                                    class="jio-form-control" placeholder=" " value={docNumber} onChange={(e) => updateDocNumber(e)} />
                                                <label for="docNumber" class="control-label">Document Number <label style={{ color: "#FF0000" }}>*</label></label>
                                            </div>
                                            <div class="form-group">
                                                <input type="date" id="dateOfIssue" autocomplete="off" class="jio-form-control" placeholder=" " 
                                                // value={dateOfIssue} 
                                                // onchange={(e) => updateDateOfIssue(e)} 
                                                />
                                                <label for="dateOfIssue" class="control-label">Date of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id="placeOfIssue" autoComplete="off"
                                                    class="jio-form-control" placeholder=" " value={placeOfIssue} onChange={(e) => updatePlaceOfIssue(e)} />
                                                <label for="placeOfIssue" class="control-label">Place of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id="authority" autoComplete="off"
                                                    class="jio-form-control" placeholder=" " value={selectedDocObject.issuingauth} />
                                                <label for="authority" class="control-label">Issuing Authority <label style={{ color: "#FF0000" }}>*</label></label>
                                            </div>
                                        </div>
                                    </div>


                                    : ''}


                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>

                        <button type="submit"
                            onClick={(e) => submit(e)}
                            class="btn btn-primary btn-login">NEXT</button>

                    </div>
                </div>
            </div>
            <div>
                <input class="mt-40" id="QRDATA" type="text" style={{ "display": "none" }}
                // onClick={(e) => handleScan(e)} 
                />

            </div>
        </div>

    )

}


export default DKYC;