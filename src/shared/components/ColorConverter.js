import React from "react";
import UIButton from './mui/UIButton.js';
import UIText from './mui/UIText.js';
import rgbToHex from "rgb-to-hex";

class ColorConverter extends React.Component {

    constructor() {
        super();
        this._validateRed = this._validateRgb.bind(this, 'red', 'invalidRed');
        this._validateGreen = this._validateRgb.bind(this, 'green', 'invalidGreen');
        this._validateBlue = this._validateRgb.bind(this, 'blue', 'invalidBlue');
        this._handleClick = this._convertToHex.bind(this);
        this.state = {
            invalidRed: null,
            invalidGreen: null,
            invalidBlue: null,
            redUnit: null,
            greenUnit: null,
            blueUnit: null,
            hexValue: "# - - - - - -",
        }
    }

    _validateRgb(color, errorName) {
        var value = this.refs[color].getValue();
        var regex = /^[0-9]+([,.][0-9]+)?$/g;

        if (!regex.test(value) && value.length > 0 || value < 0 || value > 255) {
            this.setState({
                [errorName]: 'Invalid color'
            })
        }
        else {
            this.setState({
                [errorName]: null
            })
        }
    }

    _convertToHex() {
        var red = this.refs.red.getValue();
        var green = this.refs.green.getValue();
        var blue = this.refs.blue.getValue();

        if (!red || !green || !blue) {
            return null;
        }
        if (this.state.invalidRed || this.state.invalidGreen || this.state.invalidBlue) {
            return null;
        }

        var rgbString = 'rgb('+ red + ',' + green + ',' + blue +')';
        var hex = '#' + rgbToHex(rgbString);

        this.setState({
            hexValue: hex
        })
    }

    render() {
        return (
            <div className="mui-container">
                <div className="mui-ro" id="about">
                    <h1>{ColorConverter.toolTitle}</h1>
                    <p>{ColorConverter.toolDescription}</p>
                </div>
                <div className="mui-row" id="input-row">
                    <div className="mui-col-md-6">
                        <div className="mui-row">
                            <div className="mui-col-md-4">
                                <UIText labelText="Red" ref="red"
                                        errorText={this.state.invalidRed}
                                        onChange={this._validateRed}
                                        validationPattern="\d+(\.\d*)?"
                                        style={{width: "70%"}}
                                    />
                            </div>
                            <div className="mui-col-md-4">
                                <UIText labelText="Green" ref="green"
                                        errorText={this.state.invalidGreen}
                                        onChange={this._validateGreen}
                                        validationPattern="\d+(\.\d*)?"
                                        style={{width: "70%"}}
                                    />
                            </div>
                            <div className="mui-col-md-4">
                                <UIText labelText="Blue" ref="blue"
                                        errorText={this.state.invalidBlue}
                                        onChange={this._validateBlue}
                                        validationPattern="\d+(\.\d*)?"
                                        style={{width: "70%"}}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="mui-col-md-6">
                        <div className="mui-row">
                            <div className="mui-col-md-12">
                                <div className="mui-text-display4 mui-text-accent mui-text-right" style={{width: "90%"}}>
                                    { this.state.hexValue }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-4">
                        <div className="mui-text-right">
                            <UIButton label="Convert" primary={true} onClick={this._handleClick} id="btn-convert"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ColorConverter.toolTitle = "RGB to hex converter";
ColorConverter.toolDescription=  "Convert RGB color values to hexadecimal color values";

module.exports = ColorConverter;
