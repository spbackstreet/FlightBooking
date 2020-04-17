import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerNumber, storeORN , storeInitData, storeCustomerCircleHeader} from '../../action';
import checkMobile from '../../services/checkMobile';
import validateOTP from '../../services/validateOTP';
import ServiceableAreaService from '../../services/ServiceableAreaService';
import getpincode from '../../services/getpincode';
import useLoader from '../../hooks/useLoader';
import { confirmAlert } from 'react-confirm-alert';
import config from '../../config';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const Home = () => {

    // const [{ app: { ORN, guid}}, dispatch] = useGlobalState();
    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [displayOTP, setDisplayOTP] = useState(false)
    const [displayPIN, setDisplayPIN] = useState(false)
    const [time, setTime] = useState({})
    let [timer, setTimer] = useState(0)
    let [seconds, setSeconds] = useState(30)
    const [custOtp, setCustOtp] = useState('')
    const [pin, setPin] = useState('')
    const [doneC, setDoneC] = useState(false)
    const history = useHistory();
    const [triggerAction] = useLoader();
    const [error, setError] = useState(false)
    const [errorPin, setErrorPin] = useState(false)
    const [wrongOTP, setWrongOTP] = useState(false)

    const updateCustOtp = (e) => {
        setCustOtp(e.target.value)
    }

    const updatePIN = (e) => {
        setPin(e.target.value)
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


    const updateMsdn = (event) => {
        setMsdn(event.currentTarget.value.substring(0, 10))
    }


    const hideModal = (e) => {
        setDisplayOTP(false)
    }
    const startTimer = () => {
        if (timer == 0 && seconds > 0) {
            setTimer(setInterval(countDown, 1000))
            // timer = setInterval(countDown, 1000);
        }

        // let timeLeftVar = secondsToTime(seconds);
        // setTime(timeLeftVar)
        // document.getElementById("scust").click();
    }

    const countDown = () => {

        seconds = seconds - 1;
        if (seconds >= 0) {
            if (seconds.toString().length > 1) {
                setTime(secondsToTime(seconds))
                setSeconds(seconds)

            }
            else {
                seconds = 0 + seconds;
                setTime(secondsToTime('0' + seconds))
                setSeconds('0' + seconds)
            }
        }
        if (seconds == 0) {
            console.log("endedA")
            setDoneC(true)
            clearInterval(timer);

        }
    }

    const ResendOTP = (e) => {
        if (seconds === "00") {
            // setSeconds(30)
            // setTimer(0)
            seconds = 30;
            timer = 0;
            setDoneC(false)
            console.log("clicked cust")
            startTimer()
            resendCustOtp()
        }

    }

    const resendCustOtp = async () => {
        const callCheckMobile = await triggerAction(() => checkMobile(msdn));
    }

    const getServicableArea = async () => {
        setErrorPin(false)
        if (pin) {
            setLoading(true)
            const GetServiceableAreaBypincode = await triggerAction(() => ServiceableAreaService(pin));
            setLoading(false)
            if (GetServiceableAreaBypincode.Errocode == "00") {
                setLoading(true)
                const GetPincode = await triggerAction(() => getpincode(pin));
                setLoading(false)
                if(GetPincode.ErrorCode === "00" || GetPincode.ErrorCode === "0"){
                    // dispatch(storeCustomerNumber(msdn));
                    config.custNumber = msdn
                    // dispatch(storeCustomerCircleHeader(GetPincode.pincodelist[0].area))
                    config.custCircleHeader = GetPincode.pincodelist[0].area
                    config.CAF_NUMBER = GetPincode.cafNumber
                    
                    history.push('/DKYC')
                }    
            }
            else{
                setDisplayOTP(false)
                setDisplayPIN(false)
                setLoading(false)
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Sorry!!</h3>,
                    message: GetServiceableAreaBypincode.Erromessage,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return false; }
                        }
                    ]
                });
            }

        }
        else {
            setErrorPin(true)
        }
    }

    const validateCustOTP = async (e) => {
        setError(false)
        if (custOtp) {
            setLoading(true)
            const callValidateOTP = await triggerAction(() => validateOTP(msdn, custOtp, config.ORN));
            setLoading(false)

            // const callValidateOTP = await triggerAction(() => checkMobile(msdn, "VALID"))
            if (callValidateOTP.errorCode == '0' || callValidateOTP.errorCode == '00') {
                
                config.custNumber = msdn
                // dispatch(storeInitData(callValidateOTP));
                config.lstGrpMS = callValidateOTP.lstGrpMS
                // config.guid = callValidateOTP.guid //for later in new encryption
                config.lstAuth_Config = callValidateOTP.lstAuth_Config

                setDisplayPIN(true)
                // dispatch(storeCustomerNumber(msdn));
                // history.push('/DKYC')
            }
            else {
                setWrongOTP(true)
            }

        }
        else {
            setError(true)
        }

    }

    useEffect(() => {
        let timeLeftVar = secondsToTime(seconds);
        setTime(timeLeftVar);
    }, []);

    const SendOtp = async () => {
console.log(`sdjos`,msdn.length)
        if (msdn && msdn.length=='10' && (msdn[0]==6 || msdn[0]==7 || msdn[0]==8 || msdn[0]==9)) {
            setLoading(true)
            const callCheckMobile = await triggerAction(() => checkMobile(msdn, "AUTH"));
            setLoading(false)

            if (callCheckMobile.errorCode === "00" || callCheckMobile.errorCode === "0") {

                // dispatch(storeORN(callCheckMobile.ORN));
                config.ORN = callCheckMobile.ORN

                setDisplayOTP(true)
                let timeLeftVar = secondsToTime(seconds);
                setTime(timeLeftVar)
                document.getElementById("scust").click();
            }
            else {
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Error</h3>,
                    message: callCheckMobile.errorMsg,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return false; }
                        }
                    ]
                });
            }
        }
        else {
            confirmAlert({
                title: <h3 style={{ "color": "red" }}>Error</h3>,
                message: "Please enter Alternate mobile number",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false; }
                    }
                ]
            });
        }

    }




    return (
        <div class="my_app_container">
            <div class="rechargehome_wrapper">
                <div>
                    <div class="container">
                        {/* <OtpDialogue></OtpDialogue> */}

                        <div class="modal fade show oy" id="otpModal" style={displayOTP ? display : hide}
                        >
                            <div class="modal-backdrop fade show"></div>
                            <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                                <div class="modal-content" style={{ "position": "fixed", "top": "30%", "left": "35%", "marginTop": "-50px", "marginLeft": "-100px", "width": "80%" }}>
                                    <div class="text-center" style={{ "background": "#0D95A2" }}>

                                        <h6 class="modal-title mt-10"><b style={{ color: "white" }}>Customer OTP Validation</b></h6>
                                        <span class="remove-no" style={{ marginLeft: "260px" }}> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" style={{ "margin-top": "-40px" }} onClick={(e) => hideModal(e)} /></span>

                                    </div>

                                    <div class="input-style" style={{ "height": "auto", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>


                                        <div class="text-left display-linebreak">

                                            <p style={{ color: "black" }}>

                                                <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px" }}>Customer OTP</label>

                                                <br></br>

                                                <input class="input-style mb10" id="custOtp" name="custOtp" type="number"
                                                    onChange={(e) => updateCustOtp(e)}

                                                    pattern="^[1-9]\d*$"
                                                    value={custOtp}
                                                />

                                                <br></br>

                                                {time.s > 9 ?

                                                    <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>


                                                        <button onClick={(e) => startTimer()} id="scust" hidden>Start</button>

                                                        0{time.m}:{time.s}

                                                    </div>

                                                    :

                                                    <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>

                                                        <button onClick={(e) => startTimer()} id="scust" hidden>Start</button>

                                                        0{time.m}:0{time.s}
                                                    </div>

                                                }


                                                {doneC
                                                    ?
                                                    <a id="rCust" style={{ "float": "right", "color": "#28a3ae", "fontSize": "11px", "cursor": "pointer" }}
                                                        onClick={(e) => ResendOTP(e)}
                                                    >Resend OTP </a>
                                                    :
                                                    <a id="rCust" style={{ "float": "right", "color": "#BFBBBA", "fontSize": "11px" }}
                                                    >Resend OTP </a>
                                                }


                                                <br></br>

                                                {error ?
                                                    <>
                                                        <div class="form-group text-center mb-0" style={{ "marginTop": "10px" }}>
                                                            <h3 style={{ "color": "red" }}>Please Enter OTP</h3>
                                                        </div>
                                                        <br></br>
                                                    </>
                                                    : null
                                                }

                                                {wrongOTP ?
                                                    <>
                                                        <div class="form-group text-center mb-0" style={{ "marginTop": "10px" }}>
                                                            <h3 style={{ "color": "red" }}>Please Enter Correct OTP</h3>
                                                        </div>
                                                        <br></br>
                                                    </>
                                                    : null
                                                }

                                                {/* <button type="submit" class="btn btn-primary btn-login"
                                                    onClick={validateCustOTP}
                                                >Validate OTP</button> */}

                                                <div class="form-group text-center mb-0" style={{ "marginTop": "10px" }}>
                                                    <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }}
                                                        onClick={(e) => validateCustOTP()}
                                                    >Validate OTP</button>
                                                </div>

                                            </p>

                                        </div>


                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* servicabelarea */}

                        <div class="modal fade show oy" id="otpModal" style={displayPIN ? display : hide}
                        >
                            <div class="modal-backdrop fade show"></div>
                            <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                                <div class="modal-content" style={{ "position": "fixed", "top": "30%", "left": "35%", "marginTop": "-50px", "marginLeft": "-100px", "width": "80%" }}>
                                    <div class="text-center" style={{ "background": "#0D95A2" }}>

                                        <h6 class="modal-title mt-10"><b style={{ color: "white" }}>Servicable area Check</b></h6>
                                        <span class="remove-no" style={{ marginLeft: "260px" }}> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" style={{ "margin-top": "-40px" }} onClick={(e) => setDisplayPIN(false)} /></span>

                                    </div>

                                    <div class="input-style" style={{ "height": "auto", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>


                                        <div class="text-left display-linebreak">

                                            <p style={{ color: "black" }}>

                                                <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px" }}>Customer PINCODE</label>

                                                <br></br>

                                                <input class="input-style mb10" id="pin" name="pin" type="number"
                                                    onChange={(e) => updatePIN(e)}

                                                    pattern="^[1-9]\d*$"
                                                    value={pin}
                                                />

                                                <br></br>


                                                <br></br>

                                                {errorPin ?
                                                    <>
                                                        <div class="form-group text-center mb-0" style={{ "marginTop": "10px" }}>
                                                            <h3 style={{ "color": "red" }}>Please Enter PINCODE</h3>
                                                        </div>
                                                        <br></br>
                                                    </>
                                                    : null
                                                }
                                                
                                                <div class="form-group text-center mb-0" style={{ "marginTop": "10px" }}>
                                                    <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }}
                                                        onClick={(e) => getServicableArea(e)}
                                                    >CHECK</button>
                                                </div>

                                            </p>

                                        </div>


                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* end */}
                        <div class="">
                            <div class="row">
                                <div class="col">
                                    {FixedHeader()}
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer Details</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div className="spin">
                                                    <Spinner visible={loading}
                                                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">
                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={(e) => setMsdn('')} /></span>
                                                                    <input id="msdn" type="number" required="required" value={msdn} onChange={(e) => updateMsdn(e)} maxLength="10" autoComplete= "off"
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)}
                                                                    />
                                                                    <label for="msdn" class="control-label">Enter alternate Mobile No.</label>
                                                                </div>


                                                                {/* <div class="row no-gutters">
                                                                    <div class="col-12">
                                                                        <div class="form-group">
                                                                            <div class="radio-wrap">
                                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                                    <input type="radio" id="vanity" name="onboardtype" value="Paper CAF" class="custom-control-input"
                                                                                    //onSelect={(e) => this.setOptionData(e.target.value, false, false)}
                                                                                    />
                                                                                    <label class="custom-control-label" for="vanity">Paper CAF</label>
                                                                                </div>
                                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                                    <input type="radio" id="mnp" name="onboardtype" value="mnp" class="custom-control-input"
                                                                                    //onSelect={(e) => this.setOptionData(false, e.target.value, false)}
                                                                                    />
                                                                                    <label class="custom-control-label" for="mnp">Digital KYC</label>
                                                                                </div>
                                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                                    <input type="radio" id="cocp" name="onboardtype" value="cocp" class="custom-control-input"
                                                                                    // onSelect={
                                                                                    //     (e) => {
                                                                                    //         this.setOptionData(false, false, e.target.value);
                                                                                    //     }
                                                                                    // }
                                                                                    />
                                                                                    <label class="custom-control-label" for="cocp">eKYC</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}

                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }}
                                                                onClick={(e) => SendOtp()}
                                                            >Generate OTP</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Home;