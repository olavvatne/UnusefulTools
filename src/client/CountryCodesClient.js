/**
 * Created by Torgeir on 13.02.2016.
 */


import React from "react";
import CountryCodes from "../shared/components/CountryCodes";
var initData = document.getElementById("init").text;
React.render(<CountryCodes data={initData}/>, document.getElementById('app'));