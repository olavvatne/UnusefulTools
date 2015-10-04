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
        this.state = {coords: {}, location: null, hasGeo: true, visible: false}
    }

    _handleGeoPosition(position) {
        console.log("POSITION");
        console.log(position);
        console.log(position.coords);
        var succ = function (data) {
            console.log(data);
            this.setState({coords: position.coords, location: data.location, forecast: JSON.parse(data.forecast)})
        }.bind(this);
        reqwest({
            url: '/getweather',
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
        setTimeout(function(){
            this.setState({visible: true});
        }.bind(this), 700);
        console.log("TEST");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._handleGeo, function(error) {
                this.setState({hasGeo: false})
            });
        }
        else {
            this.setState({hasGeo: false})
        }
    }

    render() {
        var img = null;
        var info = null;
        if(this.state.forecast) {
            var url = "/images/weather/" + this.state.forecast.weather[0].icon + ".png";
            img = <img src={url} alt="weather icon"/>
            info = (<p>{this.state.forecast.weather[0].description}</p>);
        }
        return (
            <div>
                <div className="mui-container">
                    <div className="mui-row" style={{minHeight: "200px"}}>
                        {!this.state.location && this.state.visible ?
                            <p className="fade-in" style={{textAlign: "center", fontSize: "1.5em"}}>Please share your current location.</p>
                        : null}
                        {!this.state.hasGeo ?
                            <p>It seems like your browser does not support geolocation. Please upgrade your browser.</p>:
                            null
                        }
                        <div className="fade-in">
                        <h2>{this.state.location}</h2>
                        {img}
                        {info}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



Weather.toolTitle = "Weather";
Weather.toolDescription = "";
Weather.toolMetaDescription = "";

module.exports = Weather