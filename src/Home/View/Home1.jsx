import React, { Component } from 'react';
import '../css/Counter.scss'
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      currentTime: ''
    }
  }
componentDidMount(){

    // const year = new Date().getFullYear();
    // const fourthOfJuly = new Date(year, 6, 4).getTime();
    // const fourthOfJulyNextYear = new Date(year + 1, 6, 4).getTime();
    // const month = new Date().getMonth();

    let timer = setInterval(() => {
      fetch('http://10.21.54.87:9200/omsorder/_count', {
        method: 'POST'
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(this)
          this.setState({ count: response.count.toString().split("") })
          console.log(this.state.count)
        })
      this.setState({ currentTime: moment(new Date()).format("DD-MMMM-YYYY-HH:mm:ss") })
      // const today = new Date().getTime();

      // let diff;
      // if (month > 6) {
      //   diff = fourthOfJulyNextYear - today;
      // } else {
      //   diff = fourthOfJuly - today;
      // }




      // let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      // let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      // let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // display
      // document.getElementById("timer").innerHTML =
      //   "<div class=\"days\"> \
      //   <div class=\"numbers\">" + days + "</div>days</div> \
      // <div class=\"hours\"> \
      //   <div class=\"numbers\">" + hours + "</div>hours</div> \
      // <div class=\"minutes\"> \
      //   <div class=\"numbers\">" + minutes + "</div>minutes</div> \
      // <div class=\"seconds\"> \
      //   <div class=\"numbers\">" + seconds + "</div>seconds</div> \
      // </div>";

    }, 5000);
}
  render = () => {
    return (
      <>
        <div class="container">
          <div id="timer">
            {this.state.count.map((element,index) => (
              <div style={{ marginRight: "5px" }} class={index===0?"seconds":index===1?"minutes":index===2?"hours":"days"}>
                <div class="numbers">{element}</div>Jio
              </div>
            ))}
          </div>
          <h1>{this.state.currentTime} order count</h1>
        </div>
        <footer>
          <p>made by <a href="https://codepen.io/juliepark"> Sameer</a> ♡</p>
        </footer>
      </>
    )
  }
}


export default Home;