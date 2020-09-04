import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import { confirmAlert } from 'react-confirm-alert';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Login extends Component {
    state = {
        msdn: '',
        userid: '',
        Headerdate: '',
        selOrdType: false,
        openSettings: false,
        loading: false,
        openSubChange: false,
        userInfo:{}

    }
    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        this.setState({ userInfo: userInfo })

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
                                            <div class="md-font f-16 pl-3 pb-2">Sign In / Sign Up</div>
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
                                                                        <input id="eId" type="text" maxLength="30" required="required"/>
                                                                        <label for="eId" class="control-label">Enter Email Id<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <input id="cPass" type="password" maxLength="10" required="required" />
                                                                        <label for="cPass" class="control-label">Password<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <div className="cust-dtl mt-0">

                                                                <div className="row" style={{ marginTop: "25px" }}>
                                                                    <div className="col-6 col-sm-6">
                                                                        <button type="button" className="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-2 mr-1"
                                                                            onClick={() => this.props.history.push({ pathname: '/Signup' })}
                                                                        >Sign Up</button>
                                                                    </div>
                                                                    <div className="col-6 col-sm-6">
                                                                        <button type="button" className="jio-btn jio-btn jio-btn-primary w-100 mb-2 ml-1"
                                                                        onClick={() =>this.Login()}
                                                                        >Login</button>
                                                                    </div>
                                                                </div>
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

    Login=()=>{
        if(!document.getElementById("eId").value || !document.getElementById("cPass").value){
            confirmAlert({
                title: "Information",
                message: 'Please enter required fields.',
                buttons: [
                    {
                        label: 'Ok'
                    },

                ]

            });
        }
        else if(document.getElementById("eId").value !== this.state.userInfo.cEmail){
            confirmAlert({
                title: "Information",
                message: 'User does not exist.',
                buttons: [
                    {
                        label: 'Ok'
                    },

                ]

            });
        }
        else if(document.getElementById("cPass").value !== this.state.userInfo.cPassword){
            confirmAlert({
                title: "Information",
                message: 'Please enter correct password.',
                buttons: [
                    {
                        label: 'Ok'
                    },

                ]

            });
        }
        else{
            this.props.history.push({ pathname: '/Home' })
        }
    }
}


export default Login;