import React, { useState } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const DeliveryAddress = () => {

    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)

    const updateMsdn = (event) => {
        setMsdn(event.currentTarget.value.substring(0, 10))
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
                                                             
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="customerName"  type="text" required="required"  name="customerName"     autocomplete="off" placeholder=" "  class="jio-form-control"
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                     <label for="customerName" class="control-label">House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>




                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="landMark"  type="text" required="required"  name="landMark"     autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Landmark<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="roadName"  type="text" required="required"  name="roadName"     autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="area"  type="text" required="required"  name="area"   autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="pinCode"  type="number" required="required"  name="pinCode"  autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <select id="village"  type="number" required="required"  name="village"  autocomplete="off" class="jio-form-control" placeholder=" "
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
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <select id="district"  type="number" required="required"  name="district"  autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    >
                                                                        <option></option>
                                                                        <option>District 1</option>
                                                                        </select>
                                                                    <label for="customerName" class="control-label">District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>



                                                                <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="state"  type="text" required="required"  name="state"  autocomplete="off" class="jio-form-control" placeholder=" "
                                                                  //  onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)} value={msdn}
                                                                    />
                                                                    <label for="customerName" class="control-label">State<label style={{ color: "#FF0000" }}>*</label></label>
                                                                </div>


{/* 
                                                                <div class="row no-gutters">
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