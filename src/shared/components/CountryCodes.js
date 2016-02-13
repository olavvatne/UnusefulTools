/**
 * Created by Torgeir on 13.02.2016.
 */

import React from 'react';

class CountryCodes extends React.Component {

    constructor() {
        super();
        this.state = {
            countryCodes: []
        };

    }

    componentWillMount() {
        var countryCodes = JSON.parse(this.props.data);
        this.setState({
            countryCodes: countryCodes
        });
    }

    render() {

        var countryCodes = this.state.countryCodes.map(function(c) {
            return c.full_name;
        });

        return (
            <div>
                <h1>{CountryCodes.toolTitle}</h1>
                <p>{countryCodes}</p>
            </div>
        );
    }

}

CountryCodes.toolTitle = "Country Codes";
CountryCodes.toolDescription = "";
CountryCodes.toolMetaDescription = "";

module.exports = CountryCodes;