/**
 * Created by Torgeir on 13.02.2016.
 */

import React from 'react';
import UIText from './mui/UIText.js';

class CountryCodes extends React.Component {

    constructor() {
        super();

        this._onInput = this._onInput.bind(this);

        this.state = {
            countryCodes: [],
            filtered_countries: []
        };
    }

    componentWillMount() {
        var countryCodes = JSON.parse(this.props.data);
        this.setState({
            countryCodes: countryCodes
        });
    }

    _onInput(change) {

    }

    render() {

        var countryCodes = this.state.countryCodes.map(function(c) {
            return c.full_name;
        });

        return (
            <div>
                <h1>{CountryCodes.toolTitle}</h1>
                <p>{countryCodes}</p>
                <UIText labelText="Country" ref="country"
                        errorText=""
                        onChange={this._onInput}
                        validationPattern=""
                        style={{display: "inline-block"}}/>
            </div>
        );
    }

}

CountryCodes.toolTitle = "Country Codes";
CountryCodes.toolDescription = "";
CountryCodes.toolMetaDescription = "";

module.exports = CountryCodes;