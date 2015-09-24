import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField } from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

class HeightField extends React.Component {

    constructor() {
        super();
        this._handleChangedHeightUnit = this._handleChangedHeightUnit.bind(this);
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this.state = {heightUnit: HeightField.CM, heightNotNumber: null};
    }

    static get childContextTypes()
    {
        return { muiTheme: React.PropTypes.object };
    }

    getChildContext()
    {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }

    _handleChangedHeightUnit(event, selected) {
        console.log(selected);
        this.setState({heightUnit: selected+1 + ""})
    }

    //TODO: Create generalized operation class; Duplicate!
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

    getValue() {
        if(!this.refs.height) {
            return null;
        }

        var height = this.refs.height.getValue();
        if(this.state.heightUnit === HeightField.CM) {
            return height;
        }
        else if(this.state.heightUnit === HeightField.INCHES) {
            return height * 2.54;
        }
        else {
            return height
        }
    }

    render() {
        let heightUnits = [
            { payload: HeightField.CM, text: 'cm' },
            { payload: HeightField.INCHES, text: 'inches' },
        ];

        return (
            <div style={{display: "inline-block"}}>
                <TextField ref="height" hintText="Enter your height."
                           floatingLabelText="Height"
                           errorText={this.state.heightNotNumber}
                           onChange={this._validateHeight}
                           style={{paddingBottom:"15px"}}
                    />

                <SelectField
                    value={this.state.heightUnit}
                    onChange={this._handleChangedHeightUnit}
                    menuItems={heightUnits}
                    floatingLabelText="Unit"/>
            </div>
        );
    }
};

HeightField.CM = '1';
HeightField.INCHES = '2';

module.exports = HeightField;