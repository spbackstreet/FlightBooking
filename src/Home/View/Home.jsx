import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Home extends Component {
    state = {
        msdn: '',
        userid: '',
        Headerdate: '',
        selOrdType: false,
        openSettings: false,
        loading: false,
        openSubChange: false

    }

    render = () => {
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
                                                    <div className="spin">
                                                        <Spinner visible={this.state.loading}
                                                            spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                    </div>
                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <form action="" class="">
                                                                <div class="login">
                                                                    <div class="form-group">
                                                                        <span class="remove-no"> <img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px" /></span>
                                                                        <input id="msdn" type="number" maxLength="10" required="required" value={this.state.msdn}
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
                                                                >Search</button>
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
}


export default Home;