import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { FixedHeader } from '../../commom/FixedHeader';
import { fips } from 'crypto';


const  CapCustPhoto =()=> {
    // constructor(props) {
    //     super(props);
    //     this.state = { userid: '' };
    //     this.charcheck = this.charcheck.bind(this);
    // }
    // state = {
    //     userid: '',
    //     APIKey: '',
    //     DeviceDate: '',
    // }
    // componentDidMount() {
    //     var date = new Date().getDate();
    //     var month = new Date().getMonth() + 1;
    //     var year = new Date().getFullYear();
    //     var hours = new Date().getHours(); //Current Hours
    //     var min = new Date().getMinutes(); //Current Minutes
    //     var sec = new Date().getSeconds(); //Current Seconds
    //     var Finaldate = (date + "-" + '0' + month + "-" + year + " " + hours + ":" + min + ":" + sec);

    //     this.setState({ DeviceDate: Finaldate })
    // }

    const charcheck=(e) => {

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ userid: e.target.value })
        }

    }


        return (
            <Router>
                <div class="back-color">
                    <div class="back-color">
                        <div class="top-fixed-header">

                            <div class="top-head top-back-col">
                                {/* <div class="nav-icon">
                                    <div id="nav-icon3">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div> */}
                                {/* <div class="navbar-brand">
                                    <img src={require("../../img/logo.png")} class="img-responsive" alt="logo" />
                                </div> */}
                                <div class="logo-title">POI</div>
                            </div>
                            {FixedHeader()}

                            <div style={{textAlign:"center"}}>

                                <label style={{ color: "black", "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "20px" }}>
                                    Capture Customer Photo</label>
                                <div style={{ textAlign: "center",marginTop:"150px" }}>
                                    <button>
                                    <img src={require("../../img/add_new.png")} style={{ width: "100px" }} alt="logo" />
                                    </button>
                                    <span>

                                        <button type="submit" style={{ "background": "#28a3ae", "color": "#fff", "width": "120px", "marginLeft": "20px", "padding": "10px" }}>preview</button>

                                    </span>
                                </div>
                                <div style={{ textAlign: "center", marginTop: "220px" }}>
                                    <button type="submit" class="btn btn-primary btn-login" onClick={(e)=>bindCapAgentPhoto()} >
                                        NEXT</button>
                                </div>
                            </div>

                        </div>
                        <div class="left-side-nav">

                            <ul class="list-unstyled nav-links">

                                <li><a ><img src={require("../../img/device_sell.png")} alt="" /> <span>Devices/Accessories Sale</span></a></li>



                            </ul>
                        </div>

                    </div>

                </div>

            </Router>

        );
    


const bindCapAgentPhoto=()=>{
    this.props.history.push({
        pathname: '/CapAgentPhoto',

      })
}

}


export default CapCustPhoto;