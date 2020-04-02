import React, { Component } from 'react';
import config from '../../config';

class ErrorPage extends Component {
   
    constructor(props) {
        super(props);
     

    }

    componentDidMount(){
        document.getElementById("buttonError").click();

        if(config.applicationType === "APK"){
            if(window.Android){
                window.Android.performLogout();
            }
        }
        
    }

    render = () => {
        return (
            <div>

                <div class="col-6 col-sm-6">
                    <textarea value={this.props.location.state.errorMsg} id="error" hidden />
                </div>

                <div class="col-6 col-sm-6">
                    <button type="submit" id="buttonError" hidden />
                </div>

            </div>


        )

    }

}
export default ErrorPage;

