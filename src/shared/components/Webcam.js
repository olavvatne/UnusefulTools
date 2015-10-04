import React from "react";
import UIButton from './mui/UIButton.js';
import Webcamera from "./libs/ReactCam";

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
    
    render() {
        //TODO: Dropdown, select filter.
        var downloadThumbs = this.state.screenshots.map((screenshot) => {
            return (
                <a className="image-thumb" href={screenshot} download="download.png" target="_blank">
                    <img src={screenshot} width="130px"/>
                </a>
            )
        });
        return (
            <div className="mui-panel">
                <div className="mui-container">
                    <div className="mui-row">
                        <div className="mui-col-md-4">
                            <div>
                                <h1 style={{marginTop: "0px"}}>{Webcam.toolTitle}</h1>
                                <p>{Webcam.toolDescription}</p>
                            </div>
                            <div >
                                <UIButton label="Capture" primary={true} onClick={this._capture} />
                            </div>
                            <div className="mt10 mb10">
                                { downloadThumbs ? downloadThumbs: null }
                            </div>

                        </div>
                        <div className="mui-col-md-8" style={{paddingTop: "10px"}}>
                            <Webcamera ref="camscreen" width="100%"></Webcamera>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


Webcam.toolTitle = "Web Camera";
Webcam.toolDescription =  "Capture tool for web camera. Click capture, and download. Easy peasy. " +
    "Pretty much useless for most browsers because of compatibility issues, but oh how it works in Chrome.";
Webcam.toolMetaDescription = "Capture images online with your webcam. Download captured images directly to your device after taking a snapshot with your web camera.";

module.exports = Webcam;