import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiSeriesAreaChart extends Component {
    state = {
        loading: false,
        options: {
            animationEnabled: true,
            title: {
                text: this.props.location.state.strItemName
            },
            axisY: {
                title: "% Returns"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "2019",
                showInLegend: true,
                dataPoints: [
                    { y: 55, label: "Jan" },
                    { y: 50, label: "Feb" },
                    { y: 52, label: "Mar" },
                    { y: 48, label: "Apr" },
                    { y: 42, label: "May" },
                    { y: 50, label: "Jun" },
                    { y: 46, label: "Jul" },
                    { y: 49, label: "Aug" },
                    { y: 53, label: "Sept" },
                    { y: 58, label: "Oct" },
                    { y: 54, label: "Nov" },
                    { y: 50, label: "Dec" }
                ]
            },
            {
                type: "spline",
                name: "2020",
                showInLegend: true,
                dataPoints: [
                    { y: 72, label: "Jan" },
                    { y: 73, label: "Feb" },
                    { y: 75, label: "Mar" },
                    { y: 72, label: "Apr" },
                    { y: 62, label: "May" },
                    { y: 65, label: "Jun" },
                    { y: 72, label: "Jul" },
                    { y: 68, label: "Aug" },
                    { y: 75, label: "Sept" },
                    { y: 70, label: "Oct" },
                    { y: 65, label: "Nov" },
                    { y: 69, label: "Dec" }
                ]
            }]
        }
    }
    render() {
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
                                                                        <b>Large Cap Fund : </b>
                                                                        Fund has 94.88% investment in indian stocks of which 75.84% is in large cap stocks, 10.3% is in mid cap stocks.
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <b>Suitable For :</b>
                                                                        Investors who are looking to invest money for at least 3-4 years and looking for high returns. At the same time, these investors should also be ready for possibility of moderate losses in their investments.
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <CanvasJSChart options={this.state.options} />
<br/>
                                                            Equity Holding : <b>94.88%</b><br/>

                                                            F&O Holdings : <b>0.00%</b><br/>

                                                            Foreign Equity Holdings : <b>0.00%</b><br/>

                                                            Total : <b>94.88%</b><br/>

                                                            No of Stocks : <b>42 (Category Avg - 43.38)</b><br/>

                                                            Large Cap Investments : <b>75.84%</b><br/>

                                                            Mid Cap Investments : <b>10.3%</b><br/>

                                                            Small Cap Investments : <b>0%</b><br/>

                                                            Other : <b>8.74%</b>
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
            </div >);
    }
}

export default MultiSeriesAreaChart;