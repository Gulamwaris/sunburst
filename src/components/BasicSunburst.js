/*jshint -W030 */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";

import D3Chart from "./D3Chart";

import "./styles/sunburst.css";

export default class ChartWrapper extends Component {
  state = {
    fileName: "",
  };

  componentDidMount() {
    D3Chart.create(this._rootNode);

    //Passing the root node of DOM to be manipulated to  the D3Chart.create function in the D3Chart file -- GULAM[18/3/2020]--CREATED
  }

  render() {
    return (
      <div className="mainContainer" id="main">
        <div className="pdfViewerContainer"></div>
      </div>
    );
  }
}
