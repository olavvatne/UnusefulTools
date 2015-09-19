/**
 * Created by Olav on 9/19/2015.
 */

import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from 'material-ui';
import BMI from "../shared/components/BMI";


injectTapEventPlugin();
React.render(<BMI />, document.getElementById('app'));