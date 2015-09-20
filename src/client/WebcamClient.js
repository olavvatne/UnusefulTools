/**
 * Created by Olav on 9/20/2015.
 */

import React from "react";
import Webcamera from "react-webcam";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField} from 'material-ui';
import Webcam from "../shared/components/Webcam";


injectTapEventPlugin();
React.render(<Webcam />, document.getElementById('app'));