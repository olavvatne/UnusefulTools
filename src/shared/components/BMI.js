import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from 'material-ui';
import WeightField from './libs/WeightField.js';
import HeightField from './libs/HeightField.js';

let ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();
class BMI extends React.Component {

    constructor() {
        super();
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this._handleClick = this._computeBMI.bind(this);
        this.state = { heightNotNumber: null, bmi: null};
    }

    static get childContextTypes()
    {
        return { muiTheme: React.PropTypes.object };
    }

    getChildContext()
    {
        return { muiTheme: ThemeManager.getCurrentTheme() };
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
        if(!this.refs.weight  || !this.refs.height) {
            return null;
        }

        var weight = this.refs.weight.getValue();
        var height = this.refs.height.getValue()/100;

        //TODO: convert lbs
        var BMI = weight/Math.pow(height, 2);
        this.setState({bmi: BMI});
    }

    _getBMIText() {
        var bmi = this.state.bmi;
        if(!bmi) {
            return null;
        }

        if(bmi < 18.5) {
            return "Underweight";
        }
        else if(bmi <25) {
            return "Healthy";
        }
        else if(bmi <30) {
            return "Overweight";
        }
        else {
            return "Obese";
        }
    }

    render() {

        return (
            <div>
                <div className="mui-row">
                    <div className="mui-col-md-6">
                        <h1>{BMI.toolTitle}</h1>
                        <p>{BMI.toolDescription}</p>
                        <WeightField ref="weight" />
                        <HeightField ref="height" />

                        <div className="row">
                            <RaisedButton label="Calculate" primary={true} onClick={this._handleClick} />
                        </div>
                    </div>
                    <div className="mui-col-md-6">
                        <div className="mui-text-display4 mui-text-accent mui-text-center"
                             style={{marginTop:"20px"}}>
                            { Math.round(this.state.bmi * 100)/100 }
                        </div>
                        <p className="mui-text-display3 mui-text-accent mui-text-center">
                            { this._getBMIText() }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

BMI.toolTitle = "BMI calculator";
BMI.toolDescription=  "The body mass index is a value based on an indviduals weight and height";

module.exports = BMI;