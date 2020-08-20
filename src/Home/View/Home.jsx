import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import { ReactMic } from 'react-mic';
import FormDataService from "./FormDataService";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            loading: false,
            resultSet: []
        }
    }



    startRecording = () => {
        this.setState({ record: true });
    }



    stopRecording = () => {
        this.setState({ record: false });
    }



    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }


    async onStop(recordedBlob) {
        this.setState({ loading: true })
        const response = await FormDataService.uploadFormData(recordedBlob.blob)
        //console.log(response.data)
        this.setState({
            resultSet: response.data,
            loading: false
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
                                            <div class="md-font f-16 pl-3 pb-2">Voice Assistance</div>
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
                                                                        <label class="control-label">Click Start to Record Voice.</label>
                                                                    </div>


                                                                    <div class="row no-gutters" style={{ marginTop: "50px" }}>
                                                                        <div class="col-12">
                                                                            <div class="form-group">
                                                                                <div class="radio-wrap">
                                                                                    <ReactMic
                                                                                        record={this.state.record}
                                                                                        className="sound-wave"
                                                                                        width="310"
                                                                                        onStop={this.onStop.bind(this)}
                                                                                        onData={this.onData}
                                                                                        strokeColor="#000000"
                                                                                        mimeType="audio/x-wav"
                                                                                        channelCount={1}
                                                                                        bitRate={16000}
                                                                                        sampleRate={16000}
                                                                                        backgroundColor="#E4E9F0" />

                                                                                    <div className="cust-dtl mt-0">

                                                                                        <div className="row" style={{ marginTop: "25px" }}>
                                                                                            <div className="col-6 col-sm-6">
                                                                                                <button type="button" className="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-2 mr-1" onClick={this.startRecording}>Start</button>
                                                                                            </div>
                                                                                            <div className="col-6 col-sm-6">
                                                                                                <button type="button" className="jio-btn jio-btn jio-btn-primary w-100 mb-2 ml-1" onClick={this.stopRecording}>Stop</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {this.state.resultSet.map(item => {
                      return (
                                                                                    <div className="row plan_details">

                                                                                    <div className="col col-6 plan_detail_list">
                                                                                        <div className="plan-amt">
                                                                                            <span className="rupee md-font text-plan-amount">`</span><span className="big_tt md-font text-plan-amount">{item.pos_desc}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col col-6 plan_detail_list">
                                                                                        <div className="plan-amt">
                                                                                            <span className="rupee md-font text-plan-amount">`</span><span className="big_tt md-font text-plan-amount">{item.product_id}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    </div>
                      )
                                                                                    })}

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </form>
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
}


export default Home;