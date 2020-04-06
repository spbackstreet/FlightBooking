import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import getpoilist from '../../services/getpoilist';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import useLoader from '../../hooks/useLoader';


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

    const [poiList, setPoiList] = useState([])
    const [showQrDiv, setShowQrDiv] = useState(true)
    const [AadhaarScan, setAadhaarScan] = useState(false)
    const [showDocView, setShowDocView] = useState(false)
    const [selectedDocObject, setSelectedDocObject] = useState('')

    const history = useHistory();
    const [triggerAction] = useLoader();

    const handlePOIChange = (e) => {
        setSelectJourney(e.target.value)
        setPoi(e.target.value);
        if (e.target.value === "") {
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
            debugger;
            if (fetchPoaPoiMaster.Error_Code === "00" || fetchPoaPoiMaster.Error_Code === "0") {
                debugger;
                setPoiList([...fetchPoaPoiMaster.lstPOI])  
            }
        })()


    }, []);



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
                                                        value="Non Aadhar"
                                                        checked={selectJourney === "Non Aadhar"}
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
                            //   onChange={child.handleSpinnerChange.bind(document.getElementById("dkycHomeForm"))}
                            >
                                {poiList.map((element) => (
                                    <option
                                    // selected={this.state.selectedDocObject == element}
                                    >{element.DocName}</option>))}

                            </select>

                            <div id="QrView" style={showQrDiv ? { marginBottom: '20vh' } : { display: 'none' }} >
                                <p class="fs-13 txt-col-1 mt-10">Scan QR Here</p>
                                <button class="scan-icon-70 mt-1"
                                // onClick={child.doScan.bind(this)}
                                ></button>
                                <br />

                                {AadhaarScan ?
                                    <p class="fs-13 txt-col-1">Aadhar QR code validated successfully. Click on next to proceed.</p>
                                    : null}
                            </div>

                            <div >


                                <div class="card shadow mt-2" style={showDocView ? {} : { display: 'none' }}>
                                    <div class="card-body">

                                        <div class="form-group">
                                            <input type="text" id="docNumber" autoComplete="off"
                                                class="jio-form-control" placeholder=" " />
                                            <label for="docNumber" class="control-label">Document Number <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input type="date" id="dateOfIssue" autocomplete="off" class="jio-form-control" placeholder=" " />
                                            <label for="dateOfIssue" class="control-label">Date of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" id="placeOfIssue" autoComplete="off"
                                                class="jio-form-control" placeholder=" " />
                                            <label for="placeOfIssue" class="control-label">Place of Issue <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" id="authority" autoComplete="off"
                                                class="jio-form-control" placeholder=" " value={selectedDocObject.issuingauth} />
                                            <label for="authority" class="control-label">Issuing Authority <label style={{ color: "#FF0000" }}>*</label></label>
                                        </div>
                                    </div>
                                </div>





                            </div>
                        </div>
                        {/* <div class="mt-3 mb-3"><a href="javascript:void(0);"><img class="img-fluid" src={require("../../img/pos/add-banner.jpg")} width="100%" height="auto" /></a></div> */}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>

                        <button type="submit"
                            // onClick={child.submit.bind(document.getElementById("dkycHomeForm"), this)}
                            class="btn btn-primary btn-login">NEXT</button>

                    </div>
                </div>
            </div>
        </div>
      
    )

}


export default DKYC;