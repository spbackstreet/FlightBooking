import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import { ReactMic } from 'react-mic';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Search: "",
            mfSchemes: [
                {
                    strItemName: "Total fat",
                    stritemdesc: "0.3g",
                    strItemPrc: "0%"
                },
                {
                    strItemName: "Saturated fat",
                    stritemdesc: "0.1g",
                    strItemPrc: "0%"
                },
                {
                    strItemName: "Sodium",
                    stritemdesc: "1mg",
                    strItemPrc: "0%"
                },
                {
                    strItemName: "Total carbohydrate",
                    stritemdesc: "23g",
                    strItemPrc: "8%"
                },
                {
                    strItemName: "Dietary fiber",
                    stritemdesc: "2.6g",
                    strItemPrc: "9%"
                },
                {
                    strItemName: "Suger",
                    stritemdesc: "12g",
                    strItemPrc: "N.A."
                },
                {
                    strItemName: "Protein",
                    stritemdesc: "1.1g",
                    strItemPrc: "2%"
                }
            ],
            mfSchemes1: [
                {
                    strItemName: "Vitamin D",
                    stritemdesc: "0.00mcg",
                    strItemPrc: "0%"
                },
                {
                    strItemName: "Calcium",
                    stritemdesc: "5.00mg",
                    strItemPrc: "0%"
                },
                {
                    strItemName: "Iron",
                    stritemdesc: "0.26mg",
                    strItemPrc: "1%"
                },
                {
                    strItemName: "Potassium",
                    stritemdesc: "358mg",
                    strItemPrc: "8%"
                }
            ]
        }
    }
    bindGraph = (strItemName) => {
        this.props.history.push({
            pathname: '/Graph',
            state: {
                strItemName: strItemName
            }
        })
    }

    render = () => {
        var settings = {
            dots: true,
            arrows: true
        };
        const { Search } = this.state;
        return (
            <div class="my_app_container">
                {FixedHeader()}
                <img
                    style={{ width: "100%" }}
                    class="img-fluid"
                    src={require("../img/UpperImage.png")}
                    title=""
                    alt=""
                />
                <div class="card-body">
                    <div className="spin">
                        <Spinner visible={this.state.loading}
                            spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                    </div>
                    <div class="row no-gutters" style={{ border: "outset", borderRadius: "20px" }}>
                        <div class="col-12">
                            <form style={{ padding: "10px" }}>
                                <div class="login">
                                    <div class="form-group">
                                        <div className="date-title bold-font mt-3  mb-2 ml-3 mr-3 f-16">Nutrition Fact</div>
                                    </div>
                                    <tbody>
                                        <tr>
                                            <td colspan="4">
                                                <table cellpadding="0" cellspacing="0" class="list-data">
                                                    <tr>
                                                        <th>Serving size</th>
                                                        <th style={{ textAlign: "right" }}>100 gm</th>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <hr style={{ margin: 0 }} />
                                    <b>Amount per serving</b>

                                    <div class="row no-gutters" style={{ marginTop: "20px" }}>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <div class="radio-wrap">
                                                    <div class="wrapper-1">
                                                        <h1><b>Calories</b></h1>

                                                        <div class="d-flex flex-wrap flex-row justify-content-center align-items-center ptb-5">
                                                            <div class="dc-input">
                                                                <input type="text" class="form-control search" name="search" id='searchitem' placeholder="Type to search" autoComplete="off"
                                                                    onChange={(e) => this.setState({ Search: e.target.value })} />
                                                                <img src={require("../img/searchicon.png")} className="search-img" />
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="4">

                                                                <table cellpadding="0" cellspacing="0" class="list-data">

                                                                    <tr>
                                                                        <th style={{ textAlign: "right" }}>% Daily Value</th>
                                                                    </tr>


                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    {this.state.mfSchemes.map((item, key) => {
                                                        if (
                                                            (Search !== "") &&
                                                            (item.strItemName.toLowerCase().indexOf(Search.toLowerCase()) === -1)
                                                        ) {
                                                            return null
                                                        }
                                                        return (
                                                            <tbody>
                                                                <tr key={key}>
                                                                    <td colspan="4">

                                                                        <table cellpadding="0" cellspacing="0" class="list-data">

                                                                            <tr onClick={() => this.bindGraph(item.strItemName)}>
                                                                                <td>{item.strItemName}</td>
                                                                                <td>{item.stritemdesc}</td>
                                                                                <td>{item.strItemPrc}</td>
                                                                            </tr>


                                                                        </table>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })}
                                                    <hr></hr>
                                                    {this.state.mfSchemes1.map((item, key) => {
                                                        if (
                                                            (Search !== "") &&
                                                            (item.strItemName.toLowerCase().indexOf(Search.toLowerCase()) === -1)
                                                        ) {
                                                            return null
                                                        }
                                                        return (
                                                            <tbody>
                                                                <tr key={key}>
                                                                    <td colspan="4">

                                                                        <table cellpadding="0" cellspacing="0" class="list-data">

                                                                            <tr onClick={() => this.bindGraph(item.strItemName)}>
                                                                                <td>{item.strItemName}</td>
                                                                                <td>{item.stritemdesc}</td>
                                                                                <td>{item.strItemPrc}</td>
                                                                            </tr>


                                                                        </table>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })}
                                                    The % Daily Value (DV) tells you how much a nutrient in a serving
                                                    of a food contribute to daily diet 2,000 calories in a day used for general
                                                    nutrition diet.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h1><b>Harvest stage</b></h1>
                                    <tbody>
                                        <tr>
                                            <td colspan="4">
                                                <table cellpadding="0" cellspacing="0" class="list-data">
                                                    <tr>
                                                        <td>Product Name</td>
                                                        <td>Papaya</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Variety</td>
                                                        <td>Pusa Magesty</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <h2 class="mt-5"><b>Farmer Details</b></h2>
                                    <div class="row no-gutters" style={{ marginTop: "20px" }}>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <div class="radio-wrap">
                                                    <div class="wrapper-1" style={{ background: "lightblue", borderRadius: "10px" }}>
                                                        <img
                                                            style={{ width: "100px", padding: "10px" }}
                                                            class="img-fluid"
                                                            src={require("../img/MySelf.jpg")}
                                                            title=""
                                                            alt=""
                                                        /><b>Sameer Shekhar Patkar </b>(RCP Ghansoli)

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gmap-container" style={{ height: "500px" }}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15077.815815798169!2d73.00511564788208!3d19.13159638579034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srcp!5e0!3m2!1sen!2sin!4v1579516838523!5m2!1sen!2sin" width="100%" height="100%" frameborder="0" allowfullscreen="" title=""></iframe>
                                    </div>
                                    <h1 class="mt-5"><b>At collection center</b></h1>
                                    <tbody>
                                        <tr>
                                            <td colspan="4">
                                                <table cellpadding="0" cellspacing="0" class="list-data">
                                                    <tr>
                                                        <td>Center Name</td>
                                                        <td>Ghansoli</td>
                                                    </tr>
                                                    <tr>
                                                        <td>FSSAI License</td>
                                                        <td>8828206787</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <div class="gmap-container mt-5" style={{ height: "500px" }}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15077.815815798169!2d73.00511564788208!3d19.13159638579034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srcp!5e0!3m2!1sen!2sin!4v1579516838523!5m2!1sen!2sin" width="100%" height="100%" frameborder="0" allowfullscreen="" title=""></iframe>
                                    </div>
                                    <div class="card shadow-sm product-details-tile jioposlite_wrapper">
                                        <div class="p-3">
                                            <Slider class="single-item" {...settings}>
                                                <div>
                                                    <img
                                                        class="img-fluid"
                                                        src={require("../img/1.png")}
                                                        title=""
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <img
                                                        class="img-fluid"
                                                        src={require("../img/2.png")}
                                                        title=""
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <img
                                                        class="img-fluid"
                                                        src={require("../img/3.png")}
                                                        title=""
                                                        alt=""
                                                    />
                                                </div>
                                            </Slider>
                                        </div>
                                    </div>
                                    <div class="wrapper-1 mt-5">
                                        <h1 class="mt-5"><b>Secret behind your fruit's goodness :</b></h1>

                                        <img
                                            style={{ width: "100px", padding: "10px" }}
                                            class="img-fluid"
                                            src={require("../img/4.png")}
                                            title=""
                                            alt=""
                                        /><b>Direct from farm</b>

                                    </div>
                                    <div class="wrapper-1">
                                        <img
                                            style={{ width: "100px", padding: "10px" }}
                                            class="img-fluid"
                                            src={require("../img/5.png")}
                                            title=""
                                            alt=""
                                        /><b>Fully trackable</b>

                                    </div>
                                    <div class="wrapper-1">
                                        <img
                                            style={{ width: "100px", padding: "10px" }}
                                            class="img-fluid"
                                            src={require("../img/6.png")}
                                            title=""
                                            alt=""
                                        /><b>Export quality</b>

                                    </div>
                                    <h1 style={{color:"cadetblue"}} class="mt-5"><b>Delivering with love and care for you to relish</b></h1>
<hr/>
<h3 class="mt-5"><b>About demo group</b></h3>
<br/>
Learning from crops division from demo group is India's best branded fruit company and a market leader in controlled cultivation
and marketing of high quality fruits to domastic and international customers in specially responsible manner.
<br/>
<div class="mt-5"/>
We are happy to serve fresh delicious fruits.
<hr class="mt-5"/>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;