import React, { useState } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import {storeCustomerCircle} from '../../action';
import { confirmAlert } from 'react-confirm-alert';

 
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
    const [, dispatch] = useGlobalState();


    const updatePincode = async (e) => {
        setPincode(e.currentTarget.value.substring(0, 6))

        if(e.currentTarget.value.substring(0, 6).length === 6){
        const getCustomerCircle = await triggerAction(() => getpincode(e.currentTarget.value.substring(0, 6)));
        dispatch(storeCustomerCircle(getCustomerCircle));
        if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
            
        }
        else {
            confirmAlert({
                title : "Error",
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
                                        <div class="md-font f-16 pl-3 pb-2">Customer Delivery Details</div>
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

                                                                    {/* <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span> */}
                                                                    <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" " class="jio-form-control"
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>




                                                                <div class="form-group">
                                                                    {/* <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span> */}
                                                                    <input id="landMark" type="text" required="required" name="landMark" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Landmark</label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <input id="area" type="text" required="required" name="area" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <input id="pinCode" type="number" required="required" name="pinCode" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                        onChange={(e) => updatePincode(e, "custOtp")}

                                                                        pattern="^[1-9]\d*$"
                                                                        value={pincode}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <select id="village" type="number" required="required" name="village" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    >
                                                                        <option></option>
                                                                        <option>Village 1</option>
                                                                        <option>Village 2</option>

                                                                    </select>
                                                                    <label for="customerName" class="control-label">Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>

                                                                <div class="form-group">
                                                                    <select id="district" type="number" required="required" name="district" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    >
                                                                        <option></option>
                                                                        <option>District 1</option>
                                                                    </select>
                                                                    <label for="customerName" class="control-label">District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>



                                                                <div class="form-group">
                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" class="jio-form-control" placeholder=" "
                                                                    //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">State<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                            //onClick={() => this.searchMobile}
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


export default DeliveryAddress;