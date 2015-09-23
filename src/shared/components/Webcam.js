import React from "react";
import Webcamera from "./libs/ReactCam";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { RaisedButton} from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Webcam extends React.Component {
    constructor() {
        super();
        this._capture = this._captureImage.bind(this);
        this.state = {screenshots: []}
    }

    _captureImage() {
        var screenshot = this.refs.camscreen.getScreenshot();
        var screenshots = this.state.screenshots;
        screenshots.push(screenshot);
        if(screenshots.length > 4) {
            screenshots.shift();
        }
        this.setState({screenshots: screenshots});
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
        var downloadThumbs = this.state.screenshots.map((screenshot) => {
            return (
                <a className="image-thumb" href={screenshot} download="download.png" target="_blank">
                    <img src={screenshot} width="130px"/>
                </a>
            )
        });
        return (
            <div className="mui-row">
                <div className="mui-col-md-4">
                    <div>
                        <h1 style={{marginTop: "0px"}}>{Webcam.toolTitle}</h1>
                        <p>{Webcam.toolDescription}</p>
                    </div>
                    <div >
                        <RaisedButton label="Capture" primary={true} onClick={this._capture}/>
                    </div>
                    <div className="mt10 mb10">
                        { downloadThumbs ? downloadThumbs: null }
                    </div>

                </div>
                <div className="mui-col-md-8" style={{paddingTop: "10px"}}>
                    <Webcamera ref="camscreen" width="100%"></Webcamera>
                </div>

            </div>
        );
    }
}


Webcam.toolTitle = "Web camera";
Webcam.toolDescription=  "Capture tool for web camera. Click capture, and download. Easy peasy." +
    "Pretty much useless for most browsers because of compability issues, but oh how it works in Chrome.";

module.exports = Webcam;