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

class Signup extends Component {
    state = {
        msdn: '',
        userid: '',
        Headerdate: '',
        selOrdType: false,
        openSettings: false,
        loading: false,
        openSubChange: false,
        genderDropDown: ["Select Gender", "Male", "Female", "Transgender"],
        userInfo: {},
        gender: ""
    }
    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        this.setState({
            userInfo: userInfo,
            gender: userInfo.gender
        })

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
                                            <div class="md-font f-16 pl-3 pb-2">Edit Profile</div>
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
                                                                        <input id="cName" type="text" maxLength="30" required="required" defaultValue={this.state.userInfo.cName} />
                                                                        <label for="cName" class="control-label">Customer Name<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <input id="cEmail" type="email" maxLength="30" required="required" defaultValue={this.state.userInfo.cEmail} />
                                                                        <label for="cEmail" class="control-label">Email Id<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <input id="cPassword" type="password" maxLength="10" required="required" defaultValue={this.state.userInfo.cPassword} />
                                                                        <label for="cPassword" class="control-label">Password<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <input id="cRPassword" type="password" maxLength="10" required="required" defaultValue={this.state.userInfo.cPassword} />
                                                                        <label for="cRPassword" class="control-label">Retype Password<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>

                                                                    <div className="row col-12">
                                                                        <div className="col-6">
                                                                            <label for="gender" className="mb-0">Gender<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <label for="age" className="mb-0">Age<label style={{ color: "#FF0000" }}>*</label></label>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <select className="custom-select rounded-0 p-1" id="gender" value={this.state.gender}
                                                                                onChange={(e) => this.setState({gender:e.target.value})}>
                                                                            {this.state.genderDropDown.map((element) => (<option>{element}</option>))}
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <input type="text" id="age" defaultValue={this.state.userInfo.age}
                                                                                autoComplete="off" className="jio-form-control" placeholder=" " />

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                </div>
                                                            </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                                onClick={() => this.updateInfo()}
                                                            >Update Profile</button>
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
            </div >
        )
    }
    updateInfo = () => {
        confirmAlert({
            title: "Information",
            message: 'Are you sure you want to update.?',
            buttons: [
                {
                    label: 'No'
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.setItem("UserInfo", JSON.stringify({
                            cName: document.getElementById('cName').value,
                            cEmail: document.getElementById('cEmail').value,
                            cPassword: document.getElementById('cPassword').value,
                            gender: document.getElementById('gender').value,
                            age: document.getElementById('age').value
                        }));
                        this.props.history.push({ pathname: '/' })
                    }

                },

            ]

        });
    }
}


export default Signup;