import React from "react";
import Webcamera from "react-webcam";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField} from 'material-ui';

export default class Webcam extends React.Component {

    render() {
        return (
            <div><Webcamera></Webcamera></div>
        );
    }
}