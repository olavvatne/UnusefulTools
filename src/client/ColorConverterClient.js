
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from 'material-ui';
import ColorConverter from "../shared/components/ColorConverter";

injectTapEventPlugin();
React.render(<ColorConverter />, document.getElementById('app'));