import React, { Component } from 'react';
import config from '../../config';
import { confirmAlert } from 'react-confirm-alert';

class Success extends Component {
   
    constructor(props) {
        super(props);
     

    }

    componentDidMount(){
        
        document.getElementById("buttonSuccess").click();
       
        if(config.applicationType === "APK"|| config.applicationType === "APKHome"){
            
            if(window.Android){

               
                window.Android.performClick(this.props.location.state.successMsg);
            }
        }
        
    }

    render = () => {
        return (
            <div>

                <div class="col-6 col-sm-6">
                    <textarea value={this.props.location.state.successMsg} id="success" hidden />
                </div>

                <div class="col-6 col-sm-6">
                    <button type="submit" id="buttonSuccess" hidden />
                </div>

            </div>


        )

    }

}
export default Success;

