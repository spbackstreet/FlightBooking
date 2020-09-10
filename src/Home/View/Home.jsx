import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import { Scrollbars } from "react-custom-scrollbars";
import DatePicker from "react-datepicker";
import filghtData from './config';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Slider from '@material-ui/core/Slider';
import { confirmAlert } from 'react-confirm-alert'; // Import



const selectStyles = {
  menu: base => ({
    ...base,
    zIndex: 100,
    textAlign: 'left !important',
  })
};


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Search: "",
      data: filghtData,
      passengers: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ],
      value: [0, 20],
      sourceValues: [],
      destinationValues: [],
      sourceDestination:"All avaliable flights."
    }
  }
  valuetext = (value) => {
    console.log(`${this.state.value}°C`);
  }
  handleChange = (event, newValue) => {
    console.log(event, newValue)
    this.setState({ value: newValue });
  };
  componentDidMount() {
    console.log(filghtData)
    var flags = [], output = [], l = filghtData.length, i;
    var flags1 = [], output1 = []
    for (i = 0; i < l; i++) {
      if (flags[filghtData[i].source]) continue;
      if (flags1[filghtData[i].destination]) continue;
      flags[filghtData[i].source] = true;
      flags1[filghtData[i].destination] = true;
      output.push({ value: filghtData[i].source_code, label: filghtData[i].source });
      output1.push({ value: filghtData[i].destination_code, label: filghtData[i].destination });
    }
    this.setState({
      sourceValues: output,
      destinationValues: output1,
    })

  }

  searchOperation = () => {
if(!this.state.originCity){
  confirmAlert({
    message: "Please select origin city",
    buttons: [
        {
            label: 'Ok'
        },
    ]
});
}
else if(!this.state.desinationCity){
  confirmAlert({
    message: "Please select destination city",
    buttons: [
        {
            label: 'Ok'
        },
    ]
})
}
else{
  let searchedArray = filghtData.filter(
    (item) => item.source_code == this.state.originCity.value && item.destination_code == this.state.desinationCity.value);
  this.setState({ data: searchedArray, sourceDestination: this.state.originCity.label+" > "+this.state.desinationCity.label})
}

  }




  priceFilter=()=>{
console.log(this.state.value)
let priceFiltered = filghtData.filter(
  (item) => parseInt(item.fare.replace(/Rs /g, "")) >= this.state.value[0]*1000 && parseInt(item.fare.replace(/Rs /g, "")) <= this.state.value[1]*1000);
  console.log(priceFiltered)
this.setState({ data: priceFiltered })
  }
  render = () => {

    return (
      <div>
        <section id="container">
          <div>
          </div>
          <header className="header black-bg">
            <a
              className="logo">
              <img style={{ width: "100px" }} src={require("../img/logo.png")} alt="logo" />
            </a>
            <h1 style={{ textAlign: "center" }}>Flight Search Engine</h1>
          </header>
          <aside>
            <div id="sidebar" className="nav-collapse">
              <ul className="sidebar-menu" id="nav-accordion">
                <li
                  className="sub-menu mt"
                >
                  <a>
                    <i className="fa fa-tasks"></i> <span>One way</span>
                  </a>
                  <div>
                    <ul class="sub">
                      <Select
                        className="mt-5"
                        placeholder="Enter Origin City"
                        value={this.state.originCity}
                        styles={selectStyles}
                        options={this.state.sourceValues}
                        onChange={(e) => this.setState({ originCity: e })}

                      />
                      <Select
                        className="mt-5"
                        placeholder="Enter Destination City"
                        value={this.state.desinationCity}
                        styles={selectStyles}
                        options={this.state.destinationValues}
                        onChange={(e) => this.setState({ desinationCity: e })}

                      />
                      <DatePicker
                        className="form-control form-control-inline input-medium default-date-picker mt-5"
                        size="16"
                        type="text"
                        placeholderText="Departure Date"
                        dateFormat="dd-MMM-yyyy"
                        selected={this.state.departDate}
                        minDate={new Date()}
                        onChange={(e) => this.setState({ departDate: e })}
                        onChangeRaw={this.handleDateChangeRaw}
                      />
                      <DatePicker
                        className="form-control form-control-inline input-medium default-date-picker mt-5"
                        size="16"
                        type="text"
                        placeholderText="Return Date"
                        dateFormat="dd-MMM-yyyy"
                        selected={this.state.arrivalDate}
                        minDate={new Date()}
                        onChange={(e) => this.setState({ arrivalDate: e })}
                        onChangeRaw={this.handleDateChangeRaw}
                      />
                      <Select
                        className="mt-5"
                        placeholder="No. of passengers"
                        styles={selectStyles}
                        value={this.state.selectedpoi}
                        options={this.state.passengers}
                      />
                      <button
                        class="btn btn-primary min-wid-90 mt-5"
                        onClick={() => this.searchOperation()}
                      >
                        Search
                            </button>
                    </ul>
                  </div>
                </li>

                <div>
                  <li
                    className="sub-menu"
                  >
                    <a>
                      <i className="fa fa-tasks"></i>
                      <span>
                        Refine flight search
                      </span>
                    </a>
                    <div>
                      <b>Price Range (in K)</b>
                      <Slider
                        value={this.state.value}
                        onChange={(e, x) => this.handleChange(e, x)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={() => this.valuetext()}
                      />
                      <button
                        class="btn btn-primary min-wid-90 mt-5"
                        onClick={()=>this.priceFilter()}
                      >
                        Apply Filter
                            </button>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </aside>
          <section id="main-content">
            <section className="wrapper">
              <div className="mt">
              <h3>{this.state.sourceDestination}</h3>
                <hr />
                <div className="row mt">
                  <div style={{ marginLeft: "20px", width: "80%" }}>
                    <div className="tbwdth">
                      <div className="mt">
                        <div className="tbl-holder">
                          <div className="spin">
                            <Spinner
                              visible={this.state.loading}
                              spinnerColor={"rgba(0, 0, 0, 0.3)"}
                            />
                          </div>
                          <div>
                            <Scrollbars style={{ height: "70vh" }}>
                              {this.state.data.map((
                                item,
                                key
                              ) => {
                                return (
                                  <li class="d-flex p-col-list" style={{ background: "aliceblue", borderRadius: "20px", marginBottom: "5px", paddingBottom: "10px" }}>
                                    <div >
                                      <h3>{item.fare}</h3>
                                      <span>{item.flight_id}</span>
                                      <div class="p-size-small">
                                        <div class="d-flex align-items-center">
                                          <span aria-label="4.1 out of 5 stars">
                                            <img src={require("../img/start-p.png")} />
                                          </span>
                                          <span aria-label="88,954" class="pl-1">
                                            <span class="p-size-small">88,954</span>
                                          </span>
                                        </div>
                                      </div>
                                      <div class="p-size-big mt-3">
                                        <span class="rupee font-weight"></span> {item.source_code} {">"} {item.destination_code}
                                      </div>
                                      <div class="d-flex align-items-center mb-2">
                                        <div>Depart : {item.departs_at}</div>
                                      </div>
                                      <div class="d-flex align-items-center mb-2">
                                        <div>Arrive : {item.arrives_at}</div>
                                      </div>
                                    </div>
                                    <div class="p-col-right">
                                      <div class="img_pic">
                                        {item.flight_id.includes('JA') ?
                                          <img style={{ width: "100px" }} src={require("../img/logo1.png")} class="img-fluid" />
                                          : <img style={{ width: "100px" }} src={require("../img/logo.png")} class="img-fluid" />
                                        }</div>
                                      <button
                                        class="btn btn-primary min-wid-90"
                                      >
                                        Book Now
                            </button>
                                    </div>
                                  </li>
                                );
                              })}
                            </Scrollbars>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
    );
  }
}


export default Home;