import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { confirmAlert } from 'react-confirm-alert';
import '../../css/style.css';
import { storeCustomerPermanent, storeCustomeroutstation } from '../../action';
import CAFRequest from "../../txnUploadData/cafRequest"


const PermanentAddress = () => {
    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincodePerm, setPincodePerm] = useState('')
    const [triggerAction] = useLoader();
    const [{ app: { pincode, custLocalAdd, isOutstation } }, dispatch] = useGlobalState();
    const [houseNo, setHouseNo] = useState('')
    const [landMark, setLandmark] = useState('')
    const [roadName, setRoadName] = useState('')
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [cityLst, setCityLst] = useState([])
    const [districtLst, setDistrictLst] = useState([]);
    const [stateLst, setStateLst] = useState([])


    const history = useHistory()

    console.log(pincode)

    console.log(custLocalAdd)

    console.log(isOutstation)

    useEffect(() => {
        if (!isOutstation) {
            (async () => {
                const getCustomerCircle = await triggerAction(() => getpincode(custLocalAdd.pincode));
                setLoading(false)
                if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {

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
            })()
        }

    }, []);

    const updatePincodePerm = async (e) => {
        setPincodePerm(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {
            setLoading(true);
            if (e.currentTarget.value != pincode) {

                const getCustomerCircle = await triggerAction(() => getpincode(e.currentTarget.value.substring(0, 6)));
                setLoading(false)
                if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
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
            else {
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Error</h3>,
                    message: "Make your Local Address captured earlier as Permanent Address? ",
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async() => { 
                                await dispatch(storeCustomeroutstation(false));
                                history.push('/localreference') 
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => { 
                                setLoading(false)
                                setPincodePerm('')
                                return false; 
                            }
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

    const validateFields = async (e) => {
        if (isOutstation) {
            if (houseNo && roadName && area && city && district && state) { 

                let permAddr = {
                    "houseNo": houseNo,
                    "landMark": landMark,
                    "roadName": roadName,
                    "area": area,
                    "city": city,
                    "district": district,
                    "state": state,
                    "pincode": pincode
                }

// CAFRequest.FirstName=custName
            // CAFRequest.DOB =dob
            CAFRequest.District=district
            CAFRequest.LandMark=landMark
            CAFRequest.State=state
            CAFRequest.City= city
            CAFRequest.Localadd_pincode=pincode
            CAFRequest.LocalAdd_landmark=roadName

                await dispatch(storeCustomerPermanent(permAddr));
                history.push('/localreference')
            }

            else {
                confirmAlert({
                    title: <h3 style={{ "color": "red" }}>Error</h3>,
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
        else{
            history.push('/planselection')
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
                                        <div class="md-font f-16 pl-3 pb-2">Customer Permanent Details</div>
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


                                                                {isOutstation ?
                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            value={houseNo} onChange={(e) => updateHouseNo(e)}



                                                                        />
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                            value={custLocalAdd.houseNo} readOnly
                                                                        />
                                                                    </div>

                                                                }



                                                                {isOutstation ?
                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                        <input id="landMark" type="text" required="required" name="landMark" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "

                                                                            value={landMark} onChange={(e) => updateLandMark(e)}


                                                                        //  onChange = { (e) => updateMsdn(e)}
                                                                        //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">Landmark<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                        <input id="landMark" type="text" required="required" name="landMark" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "


                                                                            value={custLocalAdd.landMark} disabled

                                                                        //  onChange = { (e) => updateMsdn(e)}
                                                                        //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                        />
                                                                        {/* <label for="customerName" class="control-label">Landmark<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                    </div>

                                                                }

                                                                {isOutstation ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "

                                                                            value={roadName} onChange={(e) => updateRoadName(e)}
                                                                        />
                                                                    </div>

                                                                    :
                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "


                                                                            value={custLocalAdd.roadName} disabled
                                                                        />
                                                                    </div>
                                                                }


                                                                {isOutstation ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                        <input id="area" type="text" required="required" name="area" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "

                                                                            value={area} onChange={(e) => updateArea(e)}
                                                                        />
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        {/* <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span> */}
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                        <input id="area" type="text" required="required" name="area" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "


                                                                            value={custLocalAdd.area} disabled

                                                                        //  onChange = { (e) => updateMsdn(e)}
                                                                        //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                        />
                                                                    </div>

                                                                }

                                                                {isOutstation ?

                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="pinCodePerm" type="number" required="required" name="pinCodePerm" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updatePincodePerm(e)}
                                                                            pattern="^[1-9]\d*$"

                                                                            value={pincodePerm}

                                                                        />

                                                                    </div>

                                                                    :

                                                                    <div class="form-group">

                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <input id="pinCodePerm" type="number" required="required" name="pinCodePerm" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updatePincodePerm(e)}
                                                                            pattern="^[1-9]\d*$"


                                                                            value={custLocalAdd.pincode} disabled
                                                                        />

                                                                    </div>
                                                                }


                                                                {isOutstation ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="village" type="number" required="required" name="village" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateCity(e)}
                                                                            value={city}
                                                                        >
                                                                            <option></option>
                                                                            {cityLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="village" type="number" required="required" name="village" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateCity(e)}
                                                                            value={custLocalAdd.city} disabled
                                                                            selected={custLocalAdd.city} disabled
                                                                        >
                                                                            <option></option>
                                                                            {cityLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>

                                                                }


                                                                {isOutstation ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="district" type="number" required="required" name="district" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateDistrict(e)}
                                                                            value={district}

                                                                        >
                                                                            <option></option>
                                                                            {districtLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="district" type="number" required="required" name="district" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateDistrict(e)}

                                                                            value={custLocalAdd.district} disabled
                                                                        >
                                                                            <option></option>
                                                                            {districtLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>
                                                                }



                                                                {/* <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                     onChange={(e) => updateState(e)} value={state}
                                                                    />
                                                                </div> */}

                                                                {isOutstation ?

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="state" type="text" required="required" name="state" autocomplete="off"
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateState(e)}

                                                                            value={state}

                                                                        >
                                                                            <option></option>
                                                                            {stateLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>

                                                                    :

                                                                    <div class="form-group">
                                                                        <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        <select id="state" type="text" required="required" name="state" autocomplete="off"
                                                                            style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                            onChange={(e) => updateState(e)}


                                                                            value={custLocalAdd.state} disabled
                                                                        >
                                                                            <option></option>
                                                                            {stateLst.map((element) =>
                                                                                (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>
                                                                }


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button class="btn jio-btn jio-btn-primary w-100 plan-btn "type="button" style={{ "background": "#0D95A2" }}
                                                                onClick={(e) => validateFields(e)}
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


export default PermanentAddress;