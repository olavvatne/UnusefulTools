/**
 * Created by Torgeir on 13.02.2016.
 */


import React from "react";
import ReactDOM from "react-dom";

import CountryCodes from "../shared/components/CountryCodes";
var initData = document.getElementById("init").text;
ReactDOM.render(<CountryCodes data={initData}/>, document.getElementById('app'));