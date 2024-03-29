// Stephen Davis
// stephendavis.io

import React, { Component } from "react";
import * as CONSTANTS from "../Constants";
import logo from "../logo.svg";

class Home extends Component {
  componentDidMount() {
    document.body.classList.add(CONSTANTS.CSS_BODY_CLASSES.HIDE_OVERFLOW);
  }

  render() {
    return (
      <div className="App">
        <div className="AppLogoScreen">
          <h1>{CONSTANTS.APP_NAME}</h1>
          <h2>
            {CONSTANTS.AUTHOR.NAME} - <code>{CONSTANTS.AUTHOR.ID}</code>
          </h2>
          <img src={logo} className="AppLogo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Home;
