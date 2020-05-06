import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerCircle } from '../../action';
import { confirmAlert } from 'react-confirm-alert';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import checkDeDupeService from '../../services/checkDeDupeService';
import sendLROTPService from '../../services/sendLROTPService';
import { Scrollbars } from 'react-custom-scrollbars';
import CAFRequest from "../../txnUploadData/cafRequest";
import { storeCustomerLocal } from  '../../action';
import config from '../../config';
import {showErrorAlert} from '../../commom/commonMethod';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const LocalReference = () => {

    const history = useHistory()
    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincodeLocalRef, setPincodeLocalRef] = useState('')
    const [displayotp, setDisplayotp] = useState(false)
    const [lrOTP, setLROTP] = useState('')
    const [time, setTime] = useState({})
    let [timer, setTimer] = useState(0)
    let [seconds, setSeconds] = useState(30)
    const [doneC, setDoneC] = useState(false)
    const [skipOtp, setSkipOtp] = useState(false)
    const [skpVsble, setSkpVsble] = useState(true)

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [lrMobile, setLrMobile] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [landMark, setLandmark] = useState('')
    const [roadName, setRoadName] = useState('')
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [callingNo, setCallingPartyNumber] = useState('')

    const [triggerAction] = useLoader();
    const [cityLst, setCityLst] = useState([])
    const [districtLst, setDistrictLst] = useState([]);
    const [stateLst, setStateLst] = useState([])
    const [stateCode,setStateCode] = useState('')

    // const [{ app: { pincode, custLocalAdd, custNumber } }, dispatch] = useGlobalState();


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
            // resendCustOtp()
        }

    }



    const updatePincode = async (e) => {
        setPincodeLocalRef(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {

            if (config.pincode != e.currentTarget.value.substring(0, 6)) {
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Error</h3>,
                    message: "Customer Local Address Pincode and Local Reference Pincode should be same",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                                setPincodeLocalRef('')
                                return false;
                            }
                        }
                    ]
                });
            }
            else {
                setLoading(true)
                const getCustomerCircle = await triggerAction(() => getpincode(e.currentTarget.value.substring(0, 6)));
                setLoading(false)
                if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                    setStateCode(getCustomerCircle.pincodelist[0].statecode)
                    // dispatch(storeCustomerCircle(getCustomerCircle));
                    let vcityLst = [];
                    let vdistrictLst = [];
                    let vstateLst = []
                    for (let i = 0; i < getCustomerCircle.pincodelist.length; i++) {
                        const element = getCustomerCircle.pincodelist[i];
                        vcityLst.push(element.city);
                        vdistrictLst.push(element.district);
                        vstateLst.push(element.state);
                    }
                    setCityLst([...vcityLst]);
                    setDistrictLst([...vdistrictLst]);
                    setStateLst([...vstateLst])

                }
                else {
                    confirmAlert({
                        title: <h3 style={{ "color": "red" }}>Error</h3>,
                        message: getCustomerCircle.ErrorMsg,
                        buttons: [
                            {
                                label: 'OK',
                                onClick: () => { return false; }
                            }
                        ]
                    });
                }

            }
        }

    }

    const updateFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const updateMiddleName = (e) => {
        setMiddleName(e.target.value)
    }

    const updateLastName = (e) => {
        setLastName(e.target.value)
    }

    const updateLrMobile = async (e) => {

        setLrMobile(e.currentTarget.value.substring(0, 10))

        if (e.currentTarget.value.substring(0, 10).length === 10) {
            if (config.custNumber === e.currentTarget.value.substring(0, 10)) {
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Error</h3>,
                    message: "Customer Mobile number and Local Reference number cannot be same",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                                setLrMobile('');
                                return false;
                            }
                        }
                    ]
                });
            }
            else {
                let lrMob = e.currentTarget.value.substring(0, 10);
                const checkDeDupe = await triggerAction(() => checkDeDupeService(lrMob, true));

                if (checkDeDupe.ErrorCode === "00" || checkDeDupe.ErrorCode === "01") {
                    SendLROTPFunc(lrMob)
                }
                else if (checkDeDupe.ErrorCode === "3" || checkDeDupe.ErrorCode === "03") {
                    setLrMobile('')
                    confirmAlert({
                        message: checkDeDupe.ErrorMsg,
                        buttons: [
                            {
                                label: 'OK',
                                onClick: () => {
                                    history.push('/home')
                                    //logout(this, this.props, config); 
                                }
                            }
                        ]
                    });
                } else if (checkDeDupe.ErrorCode === "4" || checkDeDupe.ErrorCode === "04") {
                    setLrMobile('')
                    confirmAlert({
                        message: checkDeDupe.ErrorMsg,
                        buttons: [
                            {
                                label: 'OK',
                                onClick: () => {
                                    setLrMobile('')
                                    return false;
                                }
                            }
                        ]
                    });
                } else {
                    confirmAlert({
                        message: checkDeDupe.ErrorMsg,
                        buttons: [
                            {
                                label: 'OK',
                                onClick: () => {
                                    setLrMobile('')
                                    return false;
                                }
                            }
                        ]
                    });
                }
            }
        }
    }



    const SendLROTPFunc = async (lrMob) => {
        const SendLROTP = await triggerAction(() => sendLROTPService(lrMob, 'SEND_OTP', firstName + ' ' + middleName + ' ' + lastName, ''));
        if (SendLROTP.ErrorCode === "00" || SendLROTP.ErrorCode === "01") {
            let timeLeftVar = secondsToTime(seconds);
            setTime(timeLeftVar)
            setDisplayotp(true)
            document.getElementById("scust").click();

        }
        else if (SendLROTP.ErrorCode === "3" || SendLROTP.ErrorCode === "03") {
            setLrMobile('')
            confirmAlert({
                message: SendLROTP.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            history.push('/home')
                            //logout(this, this.props, config); 
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: SendLROTP.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            setLrMobile('')
                            return false;
                        }
                    }
                ]
            });
        }
    }


    const btnValidateOTP = async(e) => {
        if (lrOTP) {
            const ValLROTP = await triggerAction(() => sendLROTPService(lrMobile, 'VAL_OTP', firstName + ' ' + middleName + ' ' + lastName, lrOTP));

            if (ValLROTP.ErrorCode === "00" || ValLROTP.ErrorCode === "01") {
                setDisplayotp(false)
                clearInterval(timer);
                confirmAlert({
                    message: ValLROTP.ErrorMsg,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                                setDisplayotp(false)
                                // document.getElementById('CallingNo').disabled = true;
                                setLROTP('')  
                            }
                        }
                    ]
                });


            }
        }
            else {
                confirmAlert({
                    message: "Please enter received OTP",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {

                            }
                        }
                    ]
                });
            }
        }

    const btnSkip = (e) => {
        clearInterval(timer);
        resetLROTPDetails();
        setDisplayotp(false)
        setSkipOtp(true)
        // document.getElementById('CallingNo').disabled = false;
    } 
    
    const resetLROTPDetails = (e) => {
        //for later
        // mSelectedPOIModel.setOtpLR("");
        // mSelectedPOIModel.setOtpLRNumber("");
        // mSelectedPOIModel.setOtpLRValidatetime("");
        // mSelectedPOIModel.setOtpLRLat("");
        // mSelectedPOIModel.setOtpLRLong("");
        // mSelectedPOIModel.setOtpLRGenerateTime("");
    }

        const updateHouseNo = (e) => {
            setHouseNo(e.target.value)
        }

        const updateLandMark = (e) => {
            setLandmark(e.target.value)
        }

        const updateRoadName = (e) => {
            setRoadName(e.target.value)
        }

        const updateArea = (e) => {
            setArea(e.target.value)
        }

        const updateCity = (e) => {
            setCity(e.target.value)
        }

        const updateDistrict = (e) => {
            setDistrict(e.target.value)
        }

        const updateState = (e) => {
            setState(e.target.value)
        }

        const updateLROTP = (e) => {
            setLROTP(e.target.value)
        }

        const updateCallingPartyNumber = (e) => {
            setCallingPartyNumber(e.target.value)
        }

        const hideModal =(e)=>{
            setDisplayotp(false)
        }

        const validateReference = () => {
            
        }



        const  goToPlanSelection  = async (e) =>{
            console.log(`lrMobile`,lrMobile[0])
            if((houseNo + roadName + area).replace(" ", "").length < 14){
                showErrorAlert("Please enter complete address and the length should be minimum 14 characters")
            }
            else if(firstName && lrMobile && houseNo && roadName && area && pincodeLocalRef && city && district &&  state){ 

               if(lrMobile.length < 10  ||  lrMobile[0]=="0" ||  lrMobile[0]=="1" ||  lrMobile[0]=="2" ||  lrMobile[0]=="3" || 
                lrMobile[0]=="4" ||  lrMobile[0]=="5" )  {
                confirmAlert({
                    message: "Please enter valid mobile number.",
                    buttons: [
                        {
                            label: 'Ok',
                        },
                    ]
                })
               }
               else{
                let  localref ={
                "firstName":firstName,
                "middleName":middleName,
                "lastName":lastName,
                "lrMobile":lrMobile,  
                "houseNo":houseNo,
                "landMark":landMark,
                "roadName":roadName,  
                 "area":area,
                 "pincode":pincodeLocalRef,
                 "city":city,
                 "district":district,
                 "state":stateCode,
                "callingNo":callingNo
            
            }
            // CAFRequest.FirstName = firstName
            CAFRequest.Ref_fName = firstName
            CAFRequest.Ref_MName = middleName
            CAFRequest.Ref_LName = lastName
            CAFRequest.Ref_AddType = "Reference"
            CAFRequest.Ref_ContactNumber = lrMobile
            CAFRequest.Ref_buildingName = houseNo
            CAFRequest.Ref_locality = area
            CAFRequest.Ref_postcode = pincodeLocalRef
            CAFRequest.Ref_district= district
            CAFRequest.Ref_city = city
            CAFRequest.Ref_state = stateCode
            CAFRequest.Ref_country = "IN"

            console.log(`localref`,localref)
            // await dispatch(storeCustomerLocal(localref));
            config.custLocalRefAdd = localref;
            history.push('/Planselection')
        }

        }
        
        else{
            confirmAlert({
                message: "Please enter all the mandatory fields",
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            })
        }

        }
        return (
            <div class="my_app_container">
                <div class="rechargehome_wrapper">
                    <div>
                        <div class="container">

                            <div class="modal fade show oy" id="custDetModal" style={displayotp ? display : hide}>

                                <div class="modal-backdrop fade show"></div>
                                <div class="modal-dialog" style={{ zIndex: "inherit", "marginTop": "60px" }} >
                                    <div class="modal-content" style={{ height: "56vh" }}>

                                        <div class="text-center" style={{ "background": "#024C9D" }}>
                                            <h4 class="modal-title mt-10" style={{ color: "white" }}><b>Local Reference Validation</b></h4>
                                            <span class="remove-no" style={{marginLeft:"260px"}}> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" style={{"margin-top":"-50px",marginLeft:"90px"}} onClick={(e) => hideModal(e)} /></span>

                                        </div>
                                        <div class="input-style" style={{ "height": "40vh", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>
                                            <Scrollbars style={{ height: 500 }}>

                                                <div class="text-left display-linebreak">
                                                    <p style={{ color: "black" }}>

                                                        <br></br>
                                                        <br></br>
                                                        <label style={{ color: "black", "fontWeight": "bold", "marginTop": "2px", "fontSize": "15px", "fontFamily": "JioType !important" }}>Local Reference Number : {lrMobile}</label>
                                                        <br></br><br></br><br></br>

                                                        <div>OTP
                                                        <input type="text" style={{ width: "80%", height: "30px", "marginLeft": "10px" }} class="input-style mb10" placeholder="enter here"
                                                                value={lrOTP} onChange={(e) => updateLROTP(e)} autocomplete="off" /></div>

                                                        {time.s > 9 ?
                                                            <div id="cust_otp_counter" style={{ "float": "left", "fontSize": "11px" }}>
                                                                <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>
                                                                0{time.m}:{time.s}
                                                            </div>
                                                            :

                                                            <div id="cust_otp_counter" style={{ "float": "left", "fontSize": "11px" }}>
                                                                <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>
                                                                0{time.m}:0{time.s}
                                                            </div>
                                                        }

                                                        {doneC
                                                            ?
                                                            <a id="resend" style={{ "float": "right", "color": "#28a3ae", "fontSize": "11px", "cursor": "pointer" }}
                                                                onClick={(e) => ResendOTP(e)}
                                                            >Resend OTP </a>
                                                            :
                                                            <a id="resend" style={{ "float": "right", "color": "#BFBBBA", "fontSize": "11px" }}
                                                            >Resend OTP </a>
                                                        }

                                                        <br /><br />
                                                        <button type="submit" class="btn btn-primary btn-login"
                                                            style={{ width: "135px" }}
                                                            onClick={(e) => btnValidateOTP(e)}
                                                        >
                                                            VALIDATE OTP
                                                </button>
                                                        &nbsp;&nbsp;
    
                                                        {skpVsble ?
                                                            <button type="submit" class="btn btn-primary btn-login"
                                                                style={{ width: "135px" }}
                                                             onClick={(e) => btnSkip(e)}
                                                            >
                                                                SKIP
                                                </button>
                                                            : null}
                                                        <br></br>
                                                    </p>
                                                </div>

                                            </Scrollbars>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="">
                                <div class="row">
                                    <div class="col">
                                        {FixedHeader()}
                                        <section class="card-view-sm mt-3">
                                            <div class="md-font f-16 pl-3 pb-2">Local Reference Address</div>
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

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>First Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="firstName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            onChange={(e) => updateFirstName(e)} value={firstName}

                                                                        />

                                                                    </div>

                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Middle Name</label>
                                                                        <input id="middleName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            onChange={(e) => updateMiddleName(e)} value={middleName}

                                                                        />

                                                                    </div>




                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Last Name</label>
                                                                        <input id="lastName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            onChange={(e) => updateLastName(e)} value={lastName}

                                                                        />

                                                                    </div>




                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Mobile Number<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="localMobileNo" type="number" required="required" name="localMobileNo" autocomplete="off" placeholder=" " maxLength="10"
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            onChange={(e) => updateLrMobile(e)} value={lrMobile}

                                                                        />

                                                                    </div>

                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            value={houseNo} onChange={(e) => updateHouseNo(e)}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>




                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                        <input id="landMark" type="text" required="required" name="landMark" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            value={landMark} onChange={(e) => updateLandMark(e)}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">Landmark<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>


                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            value={roadName} onChange={(e) => updateRoadName(e)}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>


                                                                    <div class="form-group">
                                                                        {/* <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span> */}
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                        <input id="area" type="text" required="required" name="area" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            value={area} onChange={(e) => updateArea(e)}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>


                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="pincodeLocalRef" type="number" required="required" name="pincodeLocalRef" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updatePincode(e, "custOtp")}
                                                                            pattern="^[1-9]\d*$"
                                                                            value={pincodeLocalRef}
                                                                        />

                                                                    </div>


                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="village" type="number" required="required" name="village" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateCity(e)} value={city}
                                                                        >
                                                                            <option></option>
                                                                            {cityLst.map((element) =>
                                                                                (<option>{element}</option>))}



                                                                        </select>
                                                                    </div>

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="district" type="number" required="required" name="district" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateDistrict(e)} value={district}
                                                                        >
                                                                            <option></option>
                                                                            {districtLst.map((element) =>
                                                                                (<option>{element}</option>))}

                                                                        </select>
                                                                    </div>



                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="state" type="text" required="required" name="state" autocomplete="off"
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateState(e)} value={state}
                                                                        >
                                                                            <option></option>
                                                                            {stateLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>


                                                                    {/* <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Calling Party Number</label>

                                                                        <input id="CallingNo" type="text" required="required" name="CallingNo" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            value={callingNo} onChange={(e) => updateCallingPartyNumber(e)}
                                                                        />
                                                                    </div> */}


                                                                </div>
                                                            </form>

                                                            <div class="form-group text-center mt-5 mb-0">
                                                                <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }}
                                                             //   onClick={(e) => history.push('/Planselection')}
                                                             onClick={(e) => goToPlanSelection(e)}
                                >NEXT</button>
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


    export default LocalReference;