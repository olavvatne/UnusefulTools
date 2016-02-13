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
            countryCodes: countryCodes,
            filtered_countries: countryCodes
        });
    }

    _onInput(change) {
        console.log(change);
        // Check countrycodes for mathes with change and slice from filtered_countries
        var countries = this.state.countryCodes;
        var filtered_countries = [];

        // remove 0 and + from start

        var re = RegExp(change, 'i');

        //console.log(countries);

        for (var c in countries) {
            var full_name = countries[c].full_name;
            var short_name = countries[c].short_name;
            var country_code = countries[c].country_code;

            if (full_name.match(re) || short_name.match(re) || country_code.match(re)) {
                filtered_countries.push(countries[c]);
                console.log(countries[c]);
            }


        }

        this.setState({
            filtered_countries: filtered_countries
        });

    }

    render() {

        var filtered_result = this.state.filtered_countries.map(function(c) {
            return (
                <tr key={c.short_name}>
                    <td>
                        {c.full_name}
                    </td>
                    <td>
                        {c.country_code}
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <h1>{CountryCodes.toolTitle}</h1>

                <UIText labelText="Country" ref="country"
                        errorText=""
                        onChange={this._onInput}
                        validationPattern=""
                        style={{display: "inline-block"}}/>

                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Country Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered_result}
                    </tbody>
                </table>
            </div>
        );
    }

}

CountryCodes.toolTitle = "Country Codes";
CountryCodes.toolDescription = "";
CountryCodes.toolMetaDescription = "";

module.exports = CountryCodes;