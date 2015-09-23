import React from "react";
import Webcamera from "./libs/ReactCam";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { RaisedButton} from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Webcam extends React.Component {
    constructor() {
        super();
        this._capture = this._captureImage.bind(this);
        this.state = {screenshot: null}
    }

    _captureImage() {
        var screenshot = this.refs.camscreen.getScreenshot();
        console.log(screenshot)
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
                <div className="mui-ro">
                    <h1>{Webcam.toolTitle}</h1>
                    <p>{Webcam.toolDescription}</p>
                </div>
                <Webcamera ref="camscreen"></Webcamera>
                <RaisedButton label="Capture" primary={true} onClick={this._capture}/>
                <a href={this.state.screenshot} download="download.png" target="_blank">Download</a>
                { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
            </div>
        );
    }
}


Webcam.toolTitle = "Webcam calculator";
Webcam.toolDescription=  "The body mass index is a value based on an indviduals weight and height";

module.exports = Webcam;