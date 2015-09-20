import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();
class BMI extends React.Component {

    constructor() {
        super();
        this._handleChangedWeightUnit = this._handleChangedWeightUnit.bind(this);
        this._validateWeight = this._validateNumber.bind(this, 'weight', 'weightNotNumber');
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this._handleClick = this._computeBMI.bind(this);
        this.state = {weightUnit: '1', weightNotNumber: null, heightNotNumber: null, bmi: null};
    }

    static get childContextTypes()
    {
        return { muiTheme: React.PropTypes.object };
    }

    getChildContext()
    {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }

    _handleChangedWeightUnit(event, selected) {
        console.log(selected);
        this.setState({weightUnit: selected+1 + ""})
    }

    _validateNumber(stateName, errorName) {
        var v = this.refs[stateName].getValue();
        var regex = /^[0-9]+([,.][0-9]+)?$/g;
        console.log(v);
        if(!regex.test(v) && v.length > 0) {
            console.log("ERROR");
            this.setState({[errorName]: 'Not a number'});
        }
        else if(this.state[errorName]) {
            this.setState({[errorName]: null});
        }
    }

    _computeBMI() {
        console.log("HEI");
        if(!this.refs.weight  || !this.refs.height) {
            console.log("WTF");
            return null;
        }

        var weight = this.refs.weight.getValue();
        var height = this.refs.height.getValue();
        console.log(weight);
        console.log(height);
        //TODO: convert lbs
        var BMI = weight/Math.pow(height, 2);
        this.setState({bmi: BMI});
    }

    render() {
        let weightUnits = [
            { payload: '1', text: 'kg' },
            { payload: '2', text: 'lbs' },
        ];

        return (
            <div>
                <div className="mui-row">
                    <div className="mui-col-sm-6">
                        <TextField ref="weight" hintText="Enter your weight."
                                   floatingLabelText="Weight"
                                   errorText={this.state.weightNotNumber}
                                   onChange={this._validateWeight}
                            />
                    </div>
                    <div className="mui-col-sm-6">
                        <SelectField
                            value={this.state.weightUnit}
                            onChange={this._handleChangedWeightUnit}
                            hintText="Hint Text"
                            menuItems={weightUnits}
                            floatingLabelText="Unit"/>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-sm-6">
                        <TextField ref="height" hintText="Enter your height."
                                   floatingLabelText="Height"
                                   errorText={this.state.heightNotNumber}
                                   onChange={this._validateHeight}/>
                    </div>
                    <div className="mui-col-sm-6">
                        <div className="mui-text-display4 mui-text-accent mui-text-center">
                            { Math.round(this.state.bmi * 100)/100 }
                        </div>
                    </div>
                    <div className="mui-col-sm-12">
                        <RaisedButton label="Calculate" primary={true} onClick={this._handleClick} />
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = BMI;