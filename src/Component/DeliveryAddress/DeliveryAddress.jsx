import React, { useState, useEffect } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerCircle, storeCustomerDelivery, storeCustomeroutstation } from '../../action';
import { confirmAlert } from 'react-confirm-alert';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import { useHistory } from 'react-router-dom';
import CAFRequest from "../../txnUploadData/cafRequest"
import config from '../../config';
import {showErrorAlert} from '../../commom/commonMethod';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const DeliveryAddress = () => {

    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [triggerAction] = useLoader();
    // const [, dispatch] = useGlobalState();
    const [cityLst, setCityLst] = useState([])
    const [districtLst, setDistrictLst] = useState([]);
    const [stateLst, setStateLst] = useState([])
    const [houseNo, setHouseNo] = useState('')
    const [landMark, setLandmark] = useState('')
    const [roadName, setRoadName] = useState('')
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');

    const history = useHistory()

    useEffect(() => {
        (async () => {
            setPincode(config.pincode);
            setLoading(true)

            const getCustomerCircle = await triggerAction(() => getpincode(config.pincode));
            setLoading(false)
            if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                // dispatch(storeCustomerCircle(vpincode));
                config.userCircelId = getCustomerCircle.pincodelist[0].statecode;

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
        })()
    }, [])

    const updatePincode = async (e) => {
        setPincode(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {
            setLoading(true)
            let vpincode = e.currentTarget.value.substring(0, 6)
            const getCustomerCircle = await triggerAction(() => getpincode(vpincode));
            setLoading(false)
            if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                // dispatch(storeCustomerCircle(vpincode));
                config.pincode = vpincode
                config.userCircelId = getCustomerCircle.pincodelist[0].statecode;

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

    const isValidateFileds = (e) => {
        if(!pincode) {
            showErrorAlert("Please enter valid Pincode")
            return false
        }
        else if(!houseNo) {
            showErrorAlert("Please enter House No/Flat No/Building/Apartment")
            return false
        }
        else if(!roadName) {
            showErrorAlert("Please enter Street Address/Road Name")
            return false
        }
        else if(!area) {
            showErrorAlert("Please enter Area/Sector/Locality")
            return false
        }
        else if(!district) {
            showErrorAlert("Please Select District")
            return false
        }
        else if(!state) {
            showErrorAlert("Please Select State")
            return false
        }
        else if(!city) {
            showErrorAlert("Please Select City")
            return false
        }
        else if((houseNo + roadName + area).replace(" ","").length<14){
            showErrorAlert("Please enter complete address and the length should be minimum 14 characters")
            return false
        }
        else{
            return true
        }

    }


    const validateFields = async (e) => {
        if(isValidateFileds){
            CAFRequest.LocalAdd_buildingName = houseNo
            CAFRequest.LocalAdd_locality = area
            CAFRequest.LocalAdd_landmark = landMark
            CAFRequest.LocalAdd_Street  = roadName
            CAFRequest.Localadd_subdistrict = district
            CAFRequest.Localadd_postoffice = roadName
            CAFRequest.Localadd_pincode = pincode
            CAFRequest.Localadd_City = city
            CAFRequest.Localadd_district = district
            CAFRequest.Localadd_state = state
console.log(`dndh`, CAFRequest.LocalAdd_buildingName)
console.log(`localoty`, CAFRequest.LocalAdd_locality)
console.log(`district`,CAFRequest.Localadd_subdistrict)
console.log(`pincode`,CAFRequest.Localadd_pincode)
console.log(`state`, CAFRequest.Localadd_state)



            history.push('/localreference')
        }

        // if (houseNo && roadName && area && city && district && state) {

        //     let delAddr = {
        //         "houseNo": houseNo,
        //         "landMark": landMark,
        //         "roadName": roadName,
        //         "area": area,
        //         "city": city,
        //         "district": district,
        //         "state": state,
        //         "pincode": pincode
        //     }

        //     // CAFRequest.FirstName=custName
        //     // CAFRequest.DOB =dob
        //     CAFRequest.District = district
        //     CAFRequest.LandMark = landMark
        //     CAFRequest.State = state
        //     CAFRequest.City = city
        //     CAFRequest.Localadd_pincode = pincode
        //     CAFRequest.LocalAdd_landmark = roadName



        //     confirmAlert({
        //         message: "Are you an outstation customer?",
        //         buttons: [
        //             {
        //                 label: 'Yes',
        //                 onClick: async () => {
        //                     // await dispatch(storeCustomerDelivery(delAddr));
        //                     config.custLocalAdd = delAddr;
        //                     // await dispatch(storeCustomeroutstation(true));
        //                     config.isOutstation = true
        //                     history.push('/permanentAddress')
        //                     CAFRequest.CUSTOMER_TYPE = '0005'
        //                 }
        //             },
        //             {
        //                 label: 'No',
        //                 onClick: async () => {
        //                     // await dispatch(storeCustomerDelivery(delAddr));
        //                     config.custLocalAdd = delAddr;
        //                     // await dispatch(storeCustomeroutstation(false));
        //                     config.isOutstation = false
        //                     CAFRequest.CUSTOMER_TYPE = '0001'
        //                     history.push('/permanentAddress')
        //                 }

        //             }
        //         ]
        //     });
        // }

        // else {
        //     confirmAlert({
        //         title: <h3 style={{ "color": "red" }}>Error</h3>,
        //         message: "Please enter all mandatory fields",
        //         buttons: [
        //             {
        //                 label: 'OK',
        //                 onClick: () => { return false; }
        //             }
        //         ]
        //     });
        // }
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
                                        <div class="md-font f-16 pl-3 pb-2">Customer Delivery Details</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div className="spin" style={{ top: "50%" }}>
                                                    <Spinner visible={loading}
                                                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="houseNo" type="text" required="required" name="houseNo" autocomplete="off" placeholder=" "
                                                                        value={houseNo} onChange={(e) => updateHouseNo(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>




                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                    <input id="landMark" type="text" required="required" name="landMark" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={landMark} onChange={(e) => updateLandMark(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="roadName" type="text" required="required" name="roadName" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={roadName} onChange={(e) => updateRoadName(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="area" type="text" required="required" name="area" autocomplete="off"
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value={area} onChange={(e) => updateArea(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="pinCode" type="number" required="required" name="pinCode" autoComplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updatePincode(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        value={pincode}
                                                                    />

                                                                </div>


                                                                <div class="form-group">
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

                                                                <div class="form-group">
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



                                                                {/* <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    value ={state} onChange={(e) => updateState(e)}
                                                                    />
                                                                </div> */}


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


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                            style={{ "background": "#0D95A2" }}  onClick={(e) => validateFields(e)}
                                                          disabled={loading}  >Submit</button>
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


export default DeliveryAddress;