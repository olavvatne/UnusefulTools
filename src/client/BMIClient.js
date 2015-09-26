/**
 * Created by Olav on 9/19/2015.
 */

import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from 'material-ui';
import BMI from "../shared/components/BMI";
import WeightField from "../shared/components/libs/WeightField";

let ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();
React.render(<BMI/>, document.getElementById('app'));//