/* global chrome */

import React, { Component } from "react";
import icon from "./imgs/bell.png";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    //name description link
    this.state = {
      domain: "",
      title: "",
      synopsis: "",
      link: ""
    };
  }

  // componentDidMount() {
  //   chrome.runtime.sendMessage({ from: "reactapp" });
  //   console.log("BUHRHRHsRHRH");
  //   chrome.runtime.onMessage.addListener(function(msg) {
  //     console.log("BUHRHRHRHssssssssssssRH");
  //     if (msg.from == "background" && msg.event) {
  //       console.log("BUHRHRHRHRH");
  //     }
  //   });

  //   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  //     // const url = new URL(tabs[0].url);
  //     const domain = tabs[0].url;
  //     this.setState({
  //       domain: domain
  //     });
  //   });
  // }
  // handleMessage(msg) {
  //   console.log("inapp");
  //   console.log("inapp", msg.title);
  //   //   this.setState({
  //   //     title: request.title,
  //   //     synopsis: request.title,
  //   //     link: request.title
  //   //   });
  // }

  render() {
    return (
      <div className="modalBody">
        <div className="row">
          <div className="left">
            <img className="icon" src={icon} />
          </div>
          <div className="right">
            <p className="titleText">
              Act Now:{" "}
              <a className="titleLink" href={this.state.link} target="_blank">
                {this.state.title}
              </a>
            </p>
            <p className="genText">{this.state.synopsis}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

// getInfo(query) {
// axios
//   .get(
//     "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
//       item +
//       "&key=AIzaSyAZrElebDLgsC85gz4hpGKceQx_0OwllUc"
//   )
//   .then(response => console.log("succ", response))
//   .catch(err => {
//     console.log(err); //Axios entire error message
//     console.log(err.response.data.error); //Google API error message
//   });
// axios.get('',{
//   params: {
//     q: query,
//     language: 'en',
//     apiKey: {{ }}
//   }
// }).then(results => {
//     this.setState({
//       headlines: results.data.articles.slice(0,5)
//     });
// }).catch(error => {
//     console.log('Error in obtaining headlines', error);
// });
//   console.log(this.state.title);
//   console.log(this.state.synopsis);
//   console.log(this.state.link);
//   console.log("url: ", this.state.domain);
// }
