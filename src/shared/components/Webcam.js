import React from "react";
import Webcamera from "react-webcam";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { RaisedButton} from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

export default class Webcam extends React.Component {
    constructor() {
        super();
        this._capture = this._captureImage.bind(this);
        this.state = {screenshot: null}
    }

    _captureImage() {
        var screenshot = this.refs.camscreen.getScreenshot();
        this.setState({screenshot: screenshot});
    }

    static get childContextTypes()
    {
        return { muiTheme: React.PropTypes.object };
    }

    getChildContext()
    {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }

    render() {
        return (
            <div>
                <Webcamera ref="camscreen"></Webcamera>
                <RaisedButton label="Capture" primary={true} onClick={this._capture}/>
                { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
            </div>
        );
    }
}