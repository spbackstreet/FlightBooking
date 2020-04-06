import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import getpoilist from '../../services/getpoilist';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
// import DKYCChild from './DKYCChild';

let child;


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const DKYC = () => {

    const [loading, setLoading] = useState(false)
    const [displayOTP, setDisplayOTP] = useState(false)
    const [time, setTime] = useState({})
    let [timer, setTimer] = useState(0)
    let [seconds, setSeconds] = useState(30)
    const [doneC, setDoneC] = useState(false)
    const history = useHistory();



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

   

  

  

    useEffect(() => {
        let timeLeftVar = secondsToTime(seconds);
        setTime(timeLeftVar);
    }, []);

    const SendOtp = () => {
        setDisplayOTP(true)
        let timeLeftVar = secondsToTime(seconds);
        setTime(timeLeftVar)
        document.getElementById("scust").click();
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
                                        <div class="md-font f-16 pl-3 pb-2">Mode of Activation</div>
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
                                                                {/* <div class="form-group">
                                                                    <span class="remove-no"> <img class="img-fluid" src="./img/pos/icon-remove.png" width="16px" height="16px" onClick={(e) => setMsdn('')} /></span>
                                                                    <input id="msdn" type="number" required="required" value={msdn} onChange={(e) => updateMsdn(e)}
                                                                    //onChange={(e) =>this.validateMobile(e.target.value)}
                                                                    />
                                                                    <label for="msdn" class="control-label">Enter alternate Mobile No.</label>
                                                                </div> */}


                                                                <div class="row no-gutters">
                                                                    <div class="col-12">
                                                                        <div class="form-group">
                                                                            <div class="radio-wrap">
                                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                                    <input type="radio" id="vanity" name="customRadio"  value="option1" class="custom-control-input"
                                                                                      checked={this.state.selectJourney === "option1"}
                                                                                      onChange={child.handleMyChange.bind(document.getElementById("dkycHomeForm"))}
                                                                                   
                                                                                    />
                                                                                    <label class="custom-control-label" for="vanity">Aadhar</label>
                                                                                </div>
                                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                                    <input type="radio" id="mnp" name="customRadio" value="mnp" class="custom-control-input"
                                                                                    checked={this.state.selectJourney === "option2"}
                                                                                    onChange={child.handleMyChange.bind(document.getElementById("dkycHomeForm"))}
                                                                                    />
                                                                                    <label class="custom-control-label" for="mnp">Non Aadhar</label>
                                                                                </div>
                                                                                <p style={{ color: "black", marginTop: "0px" }}>Select POI *</p>
                  <br />
                  <select class="customsel" 
                //   onChange={child.handleSpinnerChange.bind(document.getElementById("dkycHomeForm"))}
                  >
                    {/* {this.state.poiList.map((element) => (<option selected={this.state.selectedDocObject == element}>{element.DocName}</option>))} */}

                  </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }}
                                                                onClick={(e) => SendOtp()}
                                                            >Select</button>
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


export default DKYC;