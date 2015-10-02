import React from "react";
import UIText from '../mui/UIText.js';
import UISelect from '../mui/UISelect.js';

class WeightField extends React.Component {

    constructor() {
        super();
        this._handleChangedWeightUnit = this._handleChangedWeightUnit.bind(this);
        this._validateWeight = this._validateNumber.bind(this, 'weight', 'weightNotNumber');
        this.state = {weightUnit: WeightField.KG, weightNotNumber: null};
    }

    _handleChangedWeightUnit(event, selected) {
        this.setState({weightUnit: selected+1 + ""})
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
        if(!this.refs.weight) {
            return null;
        }

        var weight = this.refs.weight.getValue();
        if(this.state.weightUnit === WeightField.KG) {
            return weight;
        }
        else if(this.state.weightUnit === WeightField.LBS) {
            return weight * 0.45359237;
        }
        else {
            return weight
        }
    }

    render() {
        let weightUnits = [
            { payload: WeightField.KG, text: 'kg' },
            { payload: WeightField.LBS, text: 'lbs' },
        ];

        return (
            <div style={{display: "inline-block"}}>
                    <UIText labelText="Weight" ref="weight"
                            errorText={this.state.weightNotNumber}
                            onChange={this._validateWeight}
                            validationPattern="\d+(\.\d*)?"
                        />
                    <UISelect menuItems={weightUnits}
                              value={this.state.heightUnit}
                              onChange={this._handleChangedWeightUnit}
                              labelText="Unit"/>
            </div>
        );
    }
};

WeightField.KG = '1';
WeightField.LBS = '2';

module.exports = WeightField;