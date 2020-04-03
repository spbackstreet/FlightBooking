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

const Home = () => {

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
                    {/* <OtpDialogue></OtpDialogue> */}

                    {/* <div class="modal fade show oy" id="otpModal" style={this.state.displayOTP ? display : hide}
                    >
                        <div class="modal-backdrop fade show"></div>
                        <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                            <div class="modal-content">
                                <div class="text-center" style={{ "background": "#03007f" }}>
                                    <h6 class="modal-title mt-10"><b style={{ color: "white" }}>Customer & Agent<br></br>OTP Validation</b></h6>

                                </div>

                                <div class="input-style" style={{ "height": "500px", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>

                                    <Scrollbars style={{ height: 500 }}>

                                        <div class="text-left display-linebreak">

                                            <p style={{ color: "black" }}>

                                                <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px" }}>Customer OTP</label>

                                                <br></br>

                                                <input class="input-style mb10" id="custOtp" name="custOtp" type="number"
                                                    onChange={child.setOtp.bind(this, "custOtp")}

                                                    pattern="^[1-9]\d*$"
                                                    value={this.state.custOtp}
                                                />

                                                {this.validator.message('custOtp', this.state.custOtp, 'required')}

                                                <br></br>

                                                {this.state.time.s > 9 ?

                                                    <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>


                                                        <button onClick={child.startTimer.bind(this)} id="scust" hidden>Start</button>

                                                        0{this.state.time.m}:{this.state.time.s}

                                                    </div>

                                                    :

                                                    <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>

                                                        <button onClick={child.startTimer.bind(this)} id="scust" hidden>Start</button>

                                                        0{this.state.time.m}:0{this.state.time.s}
                                                    </div>

                                                }

                                                
                                                {this.state.doneC
                                                    ?
                                                    <a id="rCust" style={{ "float": "right", "color": "#28a3ae", "fontSize": "11px", "cursor": "pointer" }}
                                                        onClick={child.ResendOTP.bind(this, "cust")}
                                                    >Resend OTP </a>
                                                    :
                                                    <a id="rCust" style={{ "float": "right", "color": "#BFBBBA", "fontSize": "11px" }}
                                                    >Resend OTP </a>
                                                }


                                                <br></br>

                                                <div class="round" >

                                                    <input type="checkbox" id="chkC" style={{ "float": "left" }} onClick={() => {
                                                        if (document.getElementById('chkC').checked === true)
                                                            this.setState({ displayConsent: true })
                                                        else {
                                                            this.setState({ displayConsent: false })
                                                        }
                                                    }} />

                                                    <label for="chkC"></label>

                                                    <div style={{ "float": "left", "paddingLeft": "22px", "paddingTop": "1px" }}>I have read the customer consent</div>

                                                </div>

                                                <br></br>

                                                <hr style={{ "borderColor": "#BFBBBA" }}></hr>

                                                <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px" }}>Agent OTP</label>

                                                <br></br>

                                                <input class="input-style mb10" id="agOtp" name="agOtp" type="number"
                                                    onChange={child.setOtp.bind(this, "agOtp")}
                                                    autocomplete="off"
                                                    pattern="^[1-9]\d*$"
                                                    value={this.state.agOtp}
                                                />

                                                {this.validator.message('agOtp', this.state.agOtp, 'required')}

                                                <br></br>

                                                {this.state.timeA.s > 9 ?

                                                    <div id="agTime" style={{ "float": "left", "fontSize": "11px" }}>

                                                        <button onClick={child.startTimerA} id="acust" hidden>Start</button>

                                                        0{this.state.timeA.m}:{this.state.timeA.s}

                                                    </div>

                                                    :

                                                    <div id="agTime" style={{ "float": "left", "fontSize": "11px" }}>

                                                        <button onClick={child.startTimerA} id="acust" hidden>Start</button>

                                                        0{this.state.timeA.m}:0{this.state.timeA.s}

                                                    </div>

                                                }

                                               

                                                {this.state.doneA ?
                                                    <a id="rAgnt" style={{ "float": "right", "color": "#28a3ae", "fontSize": "11px", "cursor": "pointer" }}
                                                        onClick={child.ResendOTP.bind(this, "agent")}
                                                    >Resend OTP </a>
                                                    :
                                                    <a id="rAgnt" style={{ "float": "right", "color": "#BFBBBA", "fontSize": "11px" }}
                                                    >Resend OTP </a>
                                                }




                                                <br></br>



                                                <div class="round" >

                                                    <input type="checkbox" id="chkA" style={{ "float": "left" }} onClick={() => {
                                                        if (document.getElementById("chkA").checked === true)
                                                            this.setState({ displayConsentDealer: true })
                                                        else {
                                                            this.setState({ displayConsentDealer: false })
                                                        }
                                                    }} />

                                                    <label for="chkA"></label>

                                                    <div style={{ "float": "left", "paddingLeft": "22px", "paddingTop": "1px" }} >I have read the agent consent</div>

                                                </div>

                                                <br></br>

                                                <hr style={{ "borderColor": "#BFBBBA" }}></hr>

                                                <div class="input-style" style={{ "height": "100px", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>

                                                    <p style={{ color: "black" }}>

                                                        <label style={{ color: "black", "fontSize": "12px" }}>Please enter last 5 digits of ICCID of SIM given to Customer</label>

                                                        <br></br>

                                                        <input class="input-style mb10" id="iccid" name="iccid" type="number"
                                                            onChange={child.setOtp.bind(this, "iccid")}
                                                            autocomplete="off"
                                                            pattern="^[1-9]\d*$"
                                                            value={this.state.iccid} />

                                                        {this.validator.message('iccid', this.state.iccid, 'required|integer')}

                                                        <br></br>

                                                    </p>

                                                </div>

                                                <button type="submit" class="btn btn-primary btn-login"
                                                    onClick={child.validateDigitalKycOTP.bind((this, this.state.custOtp, this.state.agOtp, this.state.iccid))}
                                                >Validate OTP</button>

                                            </p>

                                        </div>

                                    </Scrollbars>

                                </div>

                            </div>

                        </div>

                    </div>
                     */}
                    
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
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={ (e) => setMsdn('')} /></span>
                                                                    <input id="msdn" type="number" required="required" value={msdn} onChange = { (e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)}
                                                                    />
                                                                    <label for="msdn" class="control-label">Enter Customer Mobile No.</label>
                                                                </div>


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
                                                                </div>

                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                            //onClick={() => this.searchMobile}
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