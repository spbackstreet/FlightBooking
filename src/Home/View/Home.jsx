import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import { ReactMic } from 'react-mic';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Search: "",
            mfSchemes: [
                {
                    strItemName: "CR Bluechip Equity Fund - D (G)",
                    stritemdesc: "29.92",
                    strItemPrc: "4.30%"
                },
                {
                    strItemName: "JM Large Cap Fund - D (G)",
                    stritemdesc: "3.86",
                    strItemPrc: "2.30%"
                },
                {
                    strItemName: "Axis Bluechip Fund - D (G)",
                    stritemdesc: "9.92",
                    strItemPrc: "4.10%"
                },
                {
                    strItemName: "Union Largecap Fund - GrowthLarge Cap Fund",
                    stritemdesc: "20.92",
                    strItemPrc: "4.20%"
                },
                {
                    strItemName: "LIC MF Large Cap Fund - GF",
                    stritemdesc: "3.76",
                    strItemPrc: "2.33%"
                },
                {
                    strItemName: "Union Largecap Fund - GrowthLarge Cap Fund",
                    stritemdesc: "3.90",
                    strItemPrc: "2.33%"
                },
                {
                    strItemName: "HDFC Top 100 Fund - GrowthLarge Cap Fund",
                    stritemdesc: "4.86",
                    strItemPrc: "2.31%"
                }
            ]
        }
    }
    bindGraph=(strItemName)=>{
        this.props.history.push({ pathname: '/Graph',
        state: {
            strItemName:strItemName
          } })
    }

    render = () => {
        const { Search } = this.state;
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
                                            <div onClick={() => this.props.history.push({ pathname: '/Edit' })} class="md-font f-16 pl-3 pb-2" style={{ textAlign: "end" }}>Edit Profile</div>
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
                                                                        <div className="date-title bold-font mt-3  mb-2 ml-3 mr-3 f-16">Top Performing Funds</div>
                                                                    </div>


                                                                    <div class="row no-gutters" style={{ marginTop: "20px" }}>
                                                                        <div class="col-12">
                                                                            <div class="form-group">
                                                                                <div class="radio-wrap">
                                                                                    <div class="wrapper-1">
                                                                                        <div class="d-flex flex-wrap flex-row justify-content-center align-items-center ptb-5">
                                                                                            <div class="dc-input">
                                                                                                <input type="text" class="form-control search" name="search" id='searchitem' placeholder="Type or scan to search" autoComplete="off"
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
                                                                                                        <th>Mutual Fund Name</th>
                                                                                                        <th>AuM (Cr)</th>
                                                                                                        <th>Interest rate</th>
                                                                                                    </tr>


                                                                                                </table>

                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    {this.state.mfSchemes.map( (item, key)=> {
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

                                                                                                            <tr onClick={() =>this.bindGraph(item.strItemName)}>
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