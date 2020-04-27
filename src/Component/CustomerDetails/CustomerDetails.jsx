import React, { useState, useEffect } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerCircle, storeCustomerDelivery, storeCustomeroutstation } from '../../action';
import { confirmAlert } from 'react-confirm-alert';
import config from '../../config';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import { useHistory } from 'react-router-dom';
import CAFRequest from "../../txnUploadData/cafRequest"



const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const CustomerDetails = () => {

    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [triggerAction] = useLoader();
    // const [, dispatch] = useGlobalState();
    const [cityLst, setCityLst] = useState([])
    const [districtLst, setDistrictLst] = useState([]);
    const [stateLst, setStateLst] = useState([])
    const [houseNo, setHouseNo] = useState('')
    const [custAadhaar, setCustAadhaar] = useState(CAFRequest.DocumentId)
    const [custName, setCustName] = useState('')
    const [landMark, setLandmark] = useState('')
    const [roadName, setRoadName] = useState('')
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [rel, setRelation] = useState(false)
    const [relationShipType, setRelationshipType] = useState(true);
    const [relName, setRelName] = useState("");
    const [altMobileNum, setAltMobileNum] = useState(config.custNumber)
    const [dob, setDOB] = useState('')
    const [{ app: { custLocalAdd, custNumber } },] = useGlobalState();

    const history = useHistory()

    // useEffect (() => {

    //     setAltMobileNum()
    // }, [])

    const updatePincode = async (e) => {
        setPincode(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {
            setLoading(true)
            let vpincode = e.currentTarget.value.substring(0, 6)
            const getCustomerCircle = await triggerAction(() => getpincode(vpincode));
            setLoading(false)
            if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                // dispatch(storeCustomerCircle(getCustomerCircle));
                // dispatch(storeCustomerCircle(vpincode));

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
                    title: "Error",
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
    const updateCustomerName = (e) => {
        setCustName(e.target.value)
    }

    const updateCustAadhaar = (e) => {
        setCustAadhaar(e.target.value)
    }

    const changeRelationType = (e) => {
        console.log(`relation`, e.target.value)
        if (e.target.value == "Self") {
            setRelationshipType(true)
            setAltMobileNum(config.custNumber)

        }
        else {
            setRelationshipType(false)
            setAltMobileNum('')
        }
    }
    const changeGenderName = (e) => {
        console.log(e.target.value)
        if (e.target.value == "F") {
            setRelation(true)
        }
        else {
            setRelation(false)
        }
    }

    const changeMobileNumber = (e) => {
        setAltMobileNum(e.target.value)
    }

    const changeRelativeName = (e) => {
        setRelName(e.target.value)
    }

    const updateHouseNo = (e) => {
        setHouseNo(e.target.value)
    }

    const updateDOB = (e) => {
        setDOB(e.target.value)
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

    const validateFields = async (e) => {

        console.log(`dob`, dob)
        console.log(`altMobileNum[0]`, altMobileNum[0])
        console.log(`altMobileNum`, altMobileNum.length)
        var birthday = new Date(dob);
        // var doiPoa =  new Date(config.POADate)


        // console.log(`POA Date`,config.POADate)

        // console.log(`comp 1`,doiPoa>=birthday)
        // console.log(`comp 2`,doiPoa<birthday)
        // console.log(`check1`, document.getElementById("mnp").checked )
        // console.log(`check2`, document.getElementById("cocp").checked )

        var totalYears = new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
        console.log(`abc`, totalYears)
        if (custName && altMobileNum && dob && relName && document.getElementById('email').value) {
            if (document.getElementById('alternate').value.startsWith('6') || document.getElementById('alternate').value.startsWith('7') || document.getElementById('alternate').value.startsWith('8')
                || document.getElementById('alternate').value.startsWith('9') || document.getElementById('alternate').value.length == "10") {
                if (totalYears >= 18 && totalYears <= 100) {
                    // if(doiPoa>=birthday) {
                    let delAddr = {
                        "custName": custName,
                        "dob": dob,
                        // "houseNo": houseNo,
                        // "landMark": landMark,
                        // "roadName": roadName,
                        // "area": area,
                        // "city": city,
                        // "district": district,
                        // "state": state,
                        // "pincode": pincode,
                        "altMoNo": altMobileNum,
                        "ALT_Contact_Type": "Mobile" //hardcoded
                    }



                    const dateInput = new Date(document.getElementById("dob").value)
                    const extractedDay = dateInput.getDate()
                    let extractedMonth = dateInput.getMonth() + 1
                    if (extractedMonth < 10) {
                        extractedMonth = `0${extractedMonth}`
                    }
                    const extractedYear = dateInput.getFullYear()

                    if (config.isAadharKYC) {
                        CAFRequest.Aadhar_Number = document.getElementById('custAadhaar').value;
                        CAFRequest.Aadharaddrsameinstalltion = 'Y';
                    }

                    CAFRequest.DocumentId = document.getElementById('custAadhaar').value
                    // CAFRequest.BldgName = document.getElementById('houseNo').value;
                    // CAFRequest.BuildingId = document.getElementById('houseNo').value;
                    // CAFRequest.City = document.getElementById('village').value;
                    CAFRequest.Country = document.getElementById('nationality').value.toUpperCase().substring(0, 2);
                    CAFRequest.DOB = extractedDay + "-" + extractedMonth + '-' + extractedYear;
                    // CAFRequest.District = document.getElementById('district').value;
                    CAFRequest.Email = document.getElementById('email').value;
                    CAFRequest.FirstName = document.getElementById('custName').value;
                    CAFRequest.Gender = document.getElementById('gender').value;
                    // CAFRequest.LandMark = document.getElementById('landMark').value;
                    // CAFRequest.LocalAdd_Street = document.getElementById('roadName').value;
                    // CAFRequest.StreetName = document.getElementById('roadName').value;
                    // CAFRequest.LocalAdd_buildingName = document.getElementById('houseNo').value;
                    // CAFRequest.LocalAdd_landmark = document.getElementById('landMark').value;
                    // CAFRequest.LocalAdd_locality = document.getElementById('area').value;
                    // //CAFRequest.LocalRef_callingpartyNo=document.getElementById('mobileNo').value;
                    // CAFRequest.Localadd_City = document.getElementById('village').value;
                    // CAFRequest.Localadd_postoffice = document.getElementById('village').value;
                    // CAFRequest.Localadd_district = document.getElementById('district').value;
                    // CAFRequest.Localadd_pincode = document.getElementById('pinCode').value;
                    // CAFRequest.Localadd_state = document.getElementById('state').value;
                    // CAFRequest.Localadd_subdistrict = document.getElementById('subDistrict').value;
                    // CAFRequest.Locality = document.getElementById('area').value;
                    // CAFRequest.PostCode = document.getElementById('pinCode').value;
                    // //CAFRequest.RMN = document.getElementById('altMobileNo').value;
                    CAFRequest.RMN = config.custNumber;
                    CAFRequest.RMN_relationship = relationShipType;
                    // CAFRequest.Locality = document.getElementById('area').value;
                    CAFRequest.Nationality = document.getElementById('nationality').value.toUpperCase().substring(0, 2);

                    CAFRequest.CareOf = "C/O Rajat"
                    CAFRequest.Localadd_careof = "C/O Rajat"
                    CAFRequest.FFN = document.getElementById('fname').value

                    // //const abc = await dispatch(storeCustomerDelivery(delAddr));
                    config.custDelAdd = delAddr
                    // //await dispatch(storeCustomeroutstation(true));
                    // //await dispatch(storeCustomeroutstation(false));
                    history.push('/permanentAddress')

                    //  } else{
                    //     confirmAlert({
                    //         title: "Error",
                    //         message: "POA date cannot be greater than DOB",
                    //         buttons: [
                    //             {
                    //                 label: 'OK',
                    //                 onClick: () => { return false; }
                    //             }
                    //         ]
                    //     });
                    // }

                }

                else {
                    confirmAlert({
                        title: "Error",
                        message: "Please enter correct date of birth",
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
                    title: "Error",
                    message: "Please enter valid Mobile No.",
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
                title: "Error",
                message: "Please enter all mandatory fields",
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

                        <div class="">
                            <div class="row">
                                <div class="col">
                                    {FixedHeader()}
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer Details</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div className="spin" style={{ top: "70%" }}>
                                                    <Spinner visible={loading}
                                                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">

                                                                {config.isAadharKYC ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Aadhaar Number<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="custAadhaar" type="text" required="required" name="custAadhaar" autocomplete="off" placeholder=" "
                                                                            value={custAadhaar}
                                                                            onChange={(e) => updateCustAadhaar(e)}
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                        />
                                                                    </div>

                                                                    :
                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Document No. POI<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="custAadhaar" type="text" required="required" name="custAadhaar" autocomplete="off" placeholder=" "
                                                                            value={custAadhaar}
                                                                            onChange={(e) => updateCustAadhaar(e)}
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                        />
                                                                    </div>
                                                                }


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Customer Name<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="custName" type="text" required="required" name="custName" autocomplete="off" placeholder=" "
                                                                        value={custName}
                                                                        onChange={(e) => updateCustomerName(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>

                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Date of Birth<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="dob" type="date" required="required" name="dob" autocomplete="off" placeholder=" "
                                                                        onChange={(e) => updateDOB(e)}
                                                                        style={{ width: "100%", padding: "4px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>



                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Gender<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="gender" type="text" required="required" name="gender" autocomplete="off" placeholder=" "
                                                                        onChange={(e) => changeGenderName(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    >
                                                                        <option>M</option>
                                                                        <option>F</option>
                                                                        <option>T</option>
                                                                    </select>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Nationality<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="nationality" type="text" required="required" name="nationality" autocomplete="off" placeholder=" " value={"Indian"}

                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>



                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="mnp" name="onboardtype" value="mnp" class="custom-control-input"

                                                                    />
                                                                    <label class="custom-control-label" for="mnp">Father Name</label>
                                                                </div>
                                                                {rel ?
                                                                    <div class="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="cocp" name="onboardtype" value="cocp" class="custom-control-input"

                                                                        />
                                                                        <label class="custom-control-label" for="cocp">Husband Name</label>
                                                                    </div> : null}

                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Name<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="fname" type="text" required="required" name="fname" autocomplete="off" placeholder=" " onChange={(e) => changeRelativeName(e)}

                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>

                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Mobile Number Used For Customer Signature<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="mCustNo" type="number" required="required" name="mCustNo" autocomplete="off" placeholder=" "
                                                                        value={config.custNumber}
                                                                        disabled
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>

                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Relationship  Type<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="type" type="text" required="required" name="type" autocomplete="off" placeholder=" " id="relationType"
                                                                        onChange={(e) => changeRelationType(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    >
                                                                        <option>Self</option>
                                                                        <option>Others</option>
                                                                    </select>
                                                                </div>
                                                                {/* {relationShipType ?
                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Alternate Mobile Number<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="alternate" type="number" required="required" name="alternate" autocomplete="off" placeholder=" " maxlength="10"
                                                                            value={config.custNumber} disabled
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                        />
                                                                    </div>

                                                                    : */}
                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Alternate Mobile Number<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="alternate" type="number" maxLength="10" required="required" name="alternate" autocomplete="off" placeholder=" "
                                                                        onChange={(e) => changeMobileNumber(e)} value={altMobileNum}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>
                                                                {/* } */}

                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Mobile Type<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="Mtype" type="text" required="required" name="Mtype" autocomplete="off" placeholder=" "

                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    >
                                                                        <option>Mobile</option>
                                                                        <option>Home</option>
                                                                        <option>Business</option>                                                                        </select>
                                                                </div>



                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Email Id<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="email" type="text" required="required" name="email" autocomplete="off" placeholder=" "

                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>


                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="houseNo" type="text" required="required" name="houseNo" autocomplete="off" placeholder=" "
                                                                        value={houseNo} onChange={(e) => updateHouseNo(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>




                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                    <input id="landMark" type="text" required="required" name="landMark" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={landMark} onChange={(e) => updateLandMark(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="roadName" type="text" required="required" name="roadName" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={roadName} onChange={(e) => updateRoadName(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="area" type="text" required="required" name="area" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={area} onChange={(e) => updateArea(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group" style={{ "display": "none" }}>

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="pinCode" type="number" required="required" name="pinCode" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updatePincode(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        value={pincode}
                                                                    />

                                                                </div>


                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="village" type="number" required="required" name="village" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updateCity(e)} value={city}
                                                                    >
                                                                        <option></option>
                                                                        {cityLst.map((element) =>
                                                                            (<option>{element}</option>))}


                                                                    </select>
                                                                </div>

                                                                <div class="form-group" style={{ "display": "none" }}>
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="district" type="text" required="required" name="district" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updateDistrict(e)} value={district}
                                                                    >
                                                                        <option></option>
                                                                        {districtLst.map((element) =>
                                                                            (<option>{element}</option>))}

                                                                    </select>
                                                                </div>

                                                                <div class="form-group" style={{ "display": "none" }}>

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Sub-District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="subDistrict" type="text" required="required" name="subDistrict" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    // onChange={(e) => updatePincode(e, "custOtp")}
                                                                    // pattern="^[1-9]\d*$"
                                                                    // value={pincode}
                                                                    />

                                                                </div>



                                                                {/* <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    value ={state} onChange={(e) => updateState(e)}
                                                                    />
                                                                </div> */}


                                                                <div class="form-group" style={{ "display": "none" }}>
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


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                                style={{ "background": "#0D95A2" }} onClick={(e) => validateFields(e)} disabled={loading}
                                                            >Submit</button>
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


export default CustomerDetails;