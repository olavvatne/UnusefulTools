/**
 * Created by Torgeir on 13.10.2015.
 */


import React from "react";
import RandomMovie from "../shared/components/RandomMovie";
var initData = document.getElementById("init").text;
React.render(<RandomMovie data={initData}/>, document.getElementById('app'));
