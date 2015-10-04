/**
 * Created by Olav on 10/4/2015.
 */
import React from 'react';
import UIButton from './mui/UIButton.js';
import UISelect from './mui/UISelect.js';
var reqwest = require('reqwest');
var XMLHttpRequest = require('xhr2');

class Weather extends React.Component {

    constructor() {
        super();
        this._handleGeo = this._handleGeoPosition.bind(this);
        this.state = {coords: {}}
    }

    _handleGeoPosition(position) {
        console.log("POSITION");
        console.log(position);
        console.log(position.coords);
        var succ = function (data) {
            console.log(data);
            //TODO: Handle . A lot of data coming here. What to chose.
            this.setState({coords: position.coords, location: data.results[0].address_components[3].long_name})
        }.bind(this);
        reqwest({
            url: '/getlocation',
            type: 'json',
             contentType: 'application/json',
             method: 'post',
             data: JSON.stringify({ lat: position.coords.latitude, lon: position.coords.longitude }),
             success: succ
        })
        //this.setState({coords: position.coords});
        //this.props.getCoords(position.coords);
    }

    componentDidMount() {
        console.log("TEST");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._handleGeo);
        }
    }

    render() {
        console.log("render");
        return (
            <div className="mui-container">
                <div className="mui-row">
                    <h2><p>{this.state.location}</p></h2>

                </div>
            </div>
        );
    }
}



Weather.toolTitle = "Weather";
Weather.toolDescription = "";
Weather.toolMetaDescription = "";

module.exports = Weather