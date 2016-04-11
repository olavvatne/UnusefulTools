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
            var imgName = c.short_name.toLowerCase();
            var iconPath = "/images/countryFlags/" + imgName + ".png";
            var fallbackIcon = "/images/countryFlags/fallback.png";;

            return (
                <tr key={c.short_name}>
                    <td>
                        <div>
                            <object data={iconPath} type="image/png">
                                <img src={fallbackIcon} alt={c.short_name}/>
                            </object>
                            <span className="cname">{c.full_name}</span>
                            <span className="ccode">{c.country_code}</span>
                        </div>
                    </td>
                </tr>
            )
        });

        return (
            <div className="countryCodesComponent">
                <h1>{CountryCodes.toolTitle}</h1>

                <UIText labelText="Search country or Country code" ref="country"
                        errorText=""
                        onChange={this._onInput}
                        validationPattern=""
                        style={{display: "inline-block"}}/>

                <div >
                    <table className="countryCodesTable">

                        <tbody>
                            {filtered_result}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

CountryCodes.toolTitle = "Country Codes";
CountryCodes.toolDescription = "";
CountryCodes.toolMetaDescription = "Telephone prefix country code for all countries";

module.exports = CountryCodes;