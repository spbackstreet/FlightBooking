import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import { FixedHeader } from '../../commom/FixedHeader';
import config from '../../config';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import useLoader from '../../hooks/useLoader';
import * as constants from '../../commom/constants';
import { getCurrentDateForPOAPOI, getCurrentDateForTxn } from '../../commom/CommonMethods';

import checkMobile from '../../services/checkMobile';
import validateOTP from '../../services/validateOTP';
import CAFRequest from "../../txnUploadData/cafRequest";
import txnUploadData from '../../txnUploadData/txnUploadData';
import useGeolocation from 'react-hook-geolocation'
import GlobalORNModel from '../../Model/ORNModel';
import getORNViaTibcoService from '../../services/getORNViaTibcoService';
import getTransactionIdService from '../../services/getTransactionIdService';
import uploadDocumentService from '../../services/uploadDocumentService';

var GSON = require('gson');

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const CustOTP = () => {
    const [doneC, setdoneC] = useState(false)
    const [time, settime] = useState({})
    const [custOtp, setcustOtp] = useState('')
    let [seconds, setseconds] = useState(30)
    const [displayConsent, setdisplayConsent] = useState(false)
    const [displayOTPSuccess, setdisplayOTPSuccess] = useState(false)
    let [timer, settimer] = useState(0)
    const [{ app: { pincode, custNumber, ORN, poiImage } }, dispatch] = useGlobalState();
    const [triggerAction] = useLoader();
    const [loading, setloading] = useState(false)
    const [TxnID,setTxnID] = useState('')

    const history = useHistory();
    const geolocation = useGeolocation()

    useEffect(() => {
        let CountdownTimer = initializeTimer()
        console.log('CountdownTimer', CountdownTimer)
        settime(CountdownTimer)
        document.getElementById("scust").click();
    }, [])

    const initializeTimer = () => {
        let timeLeftVar = secondsToTime(seconds);
        return (timeLeftVar)
    }

    const secondsToTime = (secs) => {

        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    const ResendOTP = (e, param) => {

        if (seconds === "00" && param === "cust") {
            setseconds(30);
            setdoneC(false)
            startTimer()
            send_Cust_Agent("send_Customer");
        }

    }

    const startTimer = (e) => {
        if (timer == 0 && seconds > 0) {
            settimer(setInterval(countDown, 1000));
        }

    }

    const countDown = () => {
        seconds = seconds - 1;
        if (seconds >= 0) {
            if (seconds.toString().length > 1) {
                settime(secondsToTime(seconds))
                setseconds(seconds)

            }
            else {
                seconds = 0 + seconds;
                settime(secondsToTime('0' + seconds))
                setseconds('0' + seconds)
            }
        }
        if (seconds == 0) {
            console.log("endedA")
            setdoneC(true)
            clearInterval(timer);

        }
    }

    const setOtp = (evt, param) => {
        const value1 = (evt.target.validity.valid) ? evt.target.value : evt.target.value.substring(0, evt.target.value.length - 1);

        if (param === "custOtp") {
            setcustOtp(value1);
        }
    }

    const send_Cust_Agent = () => {
        sendDigitalKycOTP(config.orderType)
    }

    const sendDigitalKycOTP = async (orderType) => {
        // setLoading(true)
        const callValidateOTP = await triggerAction(() => validateOTP(custNumber, custOtp, ORN));
        // setLoading(false)

        if (callValidateOTP.errorCode === "00") {

            const currentDateTime = getCurrentDateForPOAPOI()

            CAFRequest.DG_OTP = "OTP;Z00092;423504;" + geolocation.latitude + "," + geolocation.longitude + ";" + currentDateTime + ";" + CAFRequest.RMN + ";" + config.OTPGenTime + ";"
            CAFRequest.DG_ATP = "ATP;Z00092;520048;" + geolocation.latitude + "," + geolocation.longitude + ";" + currentDateTime + ";" + config.agentMobile + ";" + config.OTPGenTime + ";"

            openOtpValidationSuccessDialog();

        }
        else if (callValidateOTP.errorCode === '03' || callValidateOTP.errorCode === '3') {
            confirmAlert({
                title: "Alert!",
                //Pending For confirmation of Error Msg
                message: "Session Expired",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            history.push('/home');
                            // logout(this, this.props, config); 
                        }
                    }
                ]
            });

        }
        else {
            confirmAlert({

                message: callValidateOTP.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        openOtpValidationSuccessDialog();
    }

    const openOtpValidationSuccessDialog = (e) => {
        setdisplayOTPSuccess(!displayOTPSuccess)
    }


    const validateDigitalKycOTP = async () => {
        if (custOtp && document.getElementById('chkC').checked === true) {
            send_Cust_Agent()
        }
        else {
            confirmAlert({
                message: 'Please Enter OTP and accept customer consent.',
                buttons: [
                    {
                        label: 'Ok',
                    },

                ]
            });
        }
        // const callValidateOTP = await triggerAction(() => validateOTP(custNumber, custOtp, ORN));
    }

    const cafValidation = async () => {

    }

    // const uploadDocuments = async() => {
    //     // var api = new APIRouter();
    //     for (let q = 0; q < Object.keys(uploadDocuments).length; q++) {
    //         let docUploadReq = {
    //             guid: config.objDeviceSave.Msg,
    //             agentid: config.userID,
    //             storeid: config.objSupervisorLogin.Circle_Response.org,
    //             orn: config.ORN,
    //             doctype: Object.keys(uploadDocuments)[q],
    //             image: uploadDocuments[Object.keys(uploadDocuments)[q]]
    //         }
    //         if (config.NewEncryption === true) {
    //             this.props.setState({ loading: true });
    //             var APIURL = config.lstGrpMS.filter(
    //                 (item) => item.MICROSERVICENAME == 'UploadDocument');
    //             var response = await api.postApiCalNewEncryption(docUploadReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
    //         }
    //         else {
    //             this.props.setState({ loading: true });
    //             var APIURL = config.lstGrpMS.filter(
    //                 (item) => item.MICROSERVICENAME == 'UploadDocument');
    //             var response = await api.postApiCalStoreID(docUploadReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
    //             if (numcheck(response)) {
    //                 this.props.setState({ loading: false });
    //                 confirmAlert({
    //                     message: getHttpStatus(response),
    //                     buttons: [
    //                         {
    //                             title: 'Alert!',
    //                             label: 'OK',

    //                             onClick: () => { return false }

    //                         }

    //                     ]

    //                 });
    //             }

    //             else

    //                 if (response.ErrorCode === '03' || response.ErrorCode === '3') {
    //                     confirmAlert({
    //                         title: "Alert!",
    //                         message: response.ErrorMsg,
    //                         buttons: [
    //                             {
    //                                 label: 'OK',
    //                                 onClick: () => { logout(this, this.props, config); }
    //                             }
    //                         ]
    //                     });
    //                     break;

    //                 }



    //         }

    //     }
    // }

    const getCAFNumber = async () => {

        // setloading(true)
        // GlobalORNModel.setGuid(config.objDeviceSave.Msg);
        // GlobalORNModel.setStoreid(config.objGetStore.StoreID);
        // GlobalORNModel.setTransName('CF');

        // const getORNViaTibco = await triggerAction(() => getORNViaTibcoService());

        // setloading(false);
        // if (getORNViaTibco.ErrorCode === "00") {
        //     CAFRequest.CAF_NUMBER = config.agentCircleId + getORNViaTibco.ORN
            callTransactionAPIs();
        // }
        // else {
        //     confirmAlert({
        //         message: getORNViaTibco.ErrorMsg,
        //         buttons: [
        //             {
        //                 label: 'OK',
        //             }
        //         ]
        //     });
        // }

    }

    const callTransactionAPIs = async () => {

        const getTransactionId = await triggerAction(() => getTransactionIdService());

        if (getTransactionId.ErrorCode === "00"
            //&& DecryptedResponse.availabilityStatus == "1"
        ) {

            setTxnID(getTransactionId.TxnID)
            config.TxnID = getTransactionId.TxnID
            config.TaxInvoice = getTransactionId.TaxInvoice;
            txnUploadData.TxnInfo.TxnHeader.TxnStartTime = getCurrentDateForTxn();
            txnUploadData.TxnInfo.TxnHeader.LogonTime = getCurrentDateForTxn();
            // callGetItemMrpDetailsRPOS(getTransactionId); /for test
            // uploadDocuments()
        }
        else {
            confirmAlert({

                message: getTransactionId.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }

    }

    const uploadDocuments = async() =>{

        const uploadPOIFront = await triggerAction(() => uploadDocumentService("CUST_EKYC",poiImage.frontImage));
        const uploadPOIBack = await triggerAction(() => uploadDocumentService("CUST_EKYC_CONSENT",poiImage.backImage));
        
       
    }



    return (
        <div>
            <div class="my_app_container">
                {FixedHeader()}
                <div class="rechargehome_wrapper">
                    <div class="container">
                        <div class="">
                            <div class="row">
                                <div class="col">
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer OTP validation</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">
                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"> <img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">10 digit mobile number</label>
                                            </div> */}

                                                                <div class="form-group mb-5">
                                                                    {doneC
                                                                        ?
                                                                        <a id="rCust" style={{ "float": "right", "color": "#28a3ae", "cursor": "pointer" }}
                                                                            onClick={(e) => ResendOTP(e, "cust")}
                                                                        >Resend OTP </a>
                                                                        :
                                                                        <a id="rCust" style={{ "float": "right", "color": "#BFBBBA" }}
                                                                        >Resend OTP </a>
                                                                    }
                                                                    <input id="custOtp" name="custOtp" type="text"
                                                                        required="required"
                                                                        onChange={(e) => setOtp(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        maxLength="6"
                                                                        value={custOtp} />
                                                                    {/* {this.validator.message('custOtp', this.state.custOtp, 'required')} */}

                                                                    {time.s > 9 ?
                                                                        <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>
                                                                            <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>0{time.m}:{time.s}
                                                                        </div>
                                                                        :
                                                                        <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>
                                                                            <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>0{time.m}:0{time.s}
                                                                        </div>
                                                                    }

                                                                    <label for="custOtp" class="control-label">Customer OTP</label>
                                                                </div>

                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"><img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">Re-enter 10 digit mobile number</label>
                                            </div> */}

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer Consent</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">
                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"> <img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">10 digit mobile number</label>
                                            </div> */}

                                                                <div>

                                                                    <input type="checkbox" id="chkC" style={{ "float": "left" }} onClick={(e) => {
                                                                        if (document.getElementById('chkC').checked === true)
                                                                            setdisplayConsent(true)
                                                                        else {
                                                                            setdisplayConsent(false)
                                                                        }
                                                                    }} />

                                                                    <label for="chkC"></label>

                                                                    <div style={{ "float": "left", "paddingLeft": "22px", "paddingTop": "1px" }}>I have read the customer consent</div>

                                                                </div>
                                                                <br />

                                                                {/* <div class="form-group">
                                                                            <input id="iccid" name="iccid" type="text"
                                                                                onChange={(e) => setOtp.bind(this, "iccid")}
                                                                                autocomplete="off"
                                                                                pattern="^[1-9]\d*$"
                                                                                maxLength="5"
                                                                                value={this.state.iccid} required="required" />
                                                                            {this.validator.message('iccid', this.state.iccid, 'required|integer')}

                                                                            <label for="iccid" class="control-label">Enter last 5 digits of ICCID.</label>
                                                                        </div> */}

                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"><img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">Re-enter 10 digit mobile number</label>
                                            </div> */}

                                                            </div>
                                                        </form>


                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </section>
                                    <div class="form-group text-center mt-5 mb-0">
                                        <button type="button" onClick={(e) => validateDigitalKycOTP(e, custOtp)}
                                            class="btn jio-btn jio-btn-primary w-100" >Validate OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                {/* <FixedFooter></FixedFooter> */}
            </div>
            <div class="modal fade show oy" id="myModal" style={displayConsent ? display : hide}>
                <div class="modal-backdrop fade show"></div>
                <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                    <div class="modal-content" style={{ height: "97vh" }}>
                        <div class="text-center">
                            <h6 class="modal-title mt-10"><b>Customer Constent</b></h6>
                        </div>
                        <div class="pt-0 mt-10" style={{ height: "750px", padding: "20px" }}>
                            <Scrollbars style={{ height: 500 }}>
                                <div class="text-left display-linebreak">
                                    <p style={{ color: "black" }}>{constants.customerContent}</p>
                                </div>
                            </Scrollbars>
                            <div class="cust-dtl" style={{ marginTop: "-40px" }}>

                                <div class="row mt-40">
                                    <div class="col-12 col-sm-12">
                                        <a class="jio-btn jio-btn-primary w-100" style={{ color: "white" }}
                                            onClick={(e) => { setdisplayConsent(false) }}>Ok</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal fade show oy" id="otpValSuccess" style={displayOTPSuccess ? display : hide}
            >
                <div class="modal-backdrop fade show"></div>
                <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                    <div class="modal-content">

                        <div class="row">
                            <div class="col">
                                <div class="card shadow-sm mt-3">

                                    <div class="card-body">
                                        <form>
                                            <div class="status-frame text-center d-flex align-items-center">
                                                <div class="text-center mx-auto">
                                                    <div class="icon-page-status"><img src="./img/pos/success-green.png" alt="success" /></div>
                                                    <h3 class="supporting-c2 f-18 mt-3 mb-3 pb-3">OTP Validated Successfully.</h3>

                                                    <br></br>
                                                    <br></br>
                                                    Press proceed to continue.
                                                    <div>
                                                        <div class="row m-0 mt-4">
                                                            <div class="col-12 p-2">
                                                                <button type="button"
                                                                    onClick={(e) => getCAFNumber(e)}
                                                                    class="btn-block jio-btn jio-btn-primary">PROCEED</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}

export default CustOTP