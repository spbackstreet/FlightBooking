import React, { useState } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { confirmAlert } from 'react-confirm-alert';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const PermanentAddress = () => {

    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [triggerAction] = useLoader();
    const [{app : { pincodeRes, custLocalAdd }}, dispatch] = useGlobalState();

    debugger;

    console.log(custLocalAdd)

    const updatePincode = async (e) => {
        setPincode(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {
            setLoading(true)
            const getCustomerCircle = await triggerAction(() => getpincode(e.currentTarget.value.substring(0, 6)));
            setLoading(false)
            if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                debugger;
                // dispatch(storeCustomerCircle(getCustomerCircle));
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


                                                                <div class="form-group">

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    {/* <label for="customerName" class="control-label">House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                </div>




                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="landMark" type="text" required="required" name="landMark" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    {/* <label for="customerName" class="control-label">Landmark<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    {/* <label for="customerName" class="control-label">Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                </div>


                                                                <div class="form-group">
                                                                    {/* <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span> */}
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="area" type="text" required="required" name="area" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    {/* <label for="customerName" class="control-label">Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                </div>


                                                                <div class="form-group">

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="pinCode" type="number" required="required" name="pinCode" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updatePincode(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        value={pincode}
                                                                    />

                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="village" type="number" required="required" name="village" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    >
                                                                        <option></option>
                                                                        <option>Village 1</option>
                                                                        <option>Village 2</option>

                                                                    </select>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="district" type="number" required="required" name="district" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    >
                                                                        <option></option>
                                                                        <option>District 1</option>
                                                                    </select>
                                                                </div>



                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    {/* <label for="customerName" class="control-label">State<label style={{ color: "#FF0000" }}>*</label></label> */}
                                                                </div>


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" style={{ width: "50%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px", "background-color": "darkcyan", "color": "white" }}
                                                            //onClick={() => this.searchMobile}
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