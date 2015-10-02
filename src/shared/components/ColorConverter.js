import React from "react";
import rgbToHex from "rgb-to-hex";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from "material-ui";

let ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();
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

    static get childContextTypes()
    {
        return { muiTheme: React.PropTypes.object };
    }

    getChildContext()
    {
        return { muiTheme: ThemeManager.getCurrentTheme() };
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
                                <TextField ref="red"
                                           hintText="Red value"
                                           floatingLabelText="Red"
                                           errorText={this.state.invalidRed}
                                           onChange={this._validateRed}
                                           style={{width: "70%"}}
                                    />
                            </div>
                            <div className="mui-col-md-4">
                                <TextField ref="green"
                                           hintText="Green value"
                                           floatingLabelText="Green"
                                           errorText={this.state.invalidGreen}
                                           onChange={this._validateGreen}
                                           style={{width: "70%"}}
                                    />
                            </div>
                            <div className="mui-col-md-4">
                                <TextField ref="blue"
                                           hintText="Blue value"
                                           floatingLabelText="Blue"
                                           errorText={this.state.invalidBlue}
                                           onChange={this._validateBlue}
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
                        <div className="mui-text-left">
                            <RaisedButton
                                label="Convert"
                                primary={true}
                                onClick={this._handleClick}
                                id="btn-convert"
                                />
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
