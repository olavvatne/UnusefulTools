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
        console.log(position);
        var payload = {};
        if(!position.code) {
            payload = { lat: position.coords.latitude, lon: position.coords.longitude };
        }

        var succ = function (data) {
            console.log(data);
            this.setState({coords: position.coords, location: data.location, forecast: JSON.parse(data.forecast)})
        }.bind(this);

        reqwest({
            url: '/getweather',
            type: 'json',
             contentType: 'application/json',
             method: 'post',
             data: JSON.stringify(payload),
             success: succ
        });
    }

    componentDidMount() {
        document.body.style.backgroundImage = 'url(/images/bokeh.jpg)';
        document.getElementById("header__id").style.color = "white";

        //If no timeout, cause blinking text for browsers that already have accepted geolocation
        setTimeout(function(){
            this.setState({visible: true});
        }.bind(this), 700);
        if (navigator.geolocation) {
            //HandleGeo is run whether it can retrieve a geolocation or not.
            //In case the browser is to old, node.js does a ip lookup
            //but with a less accurate result
            navigator.geolocation.getCurrentPosition(this._handleGeo, this._handleGeo);
        }
        else {
            this.setState({hasGeo: false})
        }
    }

    render() {


        var img = null;
        var info = null;
        var temperature = null;
        if(this.state.forecast) {
            var url = "/images/weather/" + this.state.forecast.weather[0].icon + ".svg";
            img = <img className="weather-content__image" src={url} alt="weather icon"/>
                    console.log(this.state.forecast);
            temperature = (this.state.forecast.main.temp - 273.15).toFixed(1);;
            info = (<p>{this.state.forecast.weather[0].description}</p>);
        }

        return (
            <div>
                <div className="mui-container">
                    <div className="mui-row">
                        <div className="weather-content mui-text-center">
                            {!this.state.location && this.state.visible ?
                                <p className="fade-in" style={{textAlign: "center", fontSize: "1.5em"}}>Please share your current location.</p>
                            : null}

                            {!this.state.hasGeo ?
                                <p>It seems like your browser does not support geolocation. Please upgrade your browser.</p>:
                                null
                            }

                            <div className="fade-in">

                                <h2>{this.state.location}</h2>
                                { this.state.forecast ?
                                    <table className="weather-content__data">
                                        <tr>
                                            <td>
                                                <img src="/images/weather/Cloud-Download.svg" alt="Pressure"/>
                                                <p>{this.state.forecast.main.pressure} hpa</p>
                                            </td>
                                            <td>
                                                <img src="/images/weather/Wind.svg" alt="Wind"/>
                                                <p>{this.state.forecast.wind.speed} m/s</p>
                                            </td>
                                            <td>
                                                <img src="/images/weather/Raindrop.svg" alt="Humidity"/>
                                                <p>{this.state.forecast.main.humidity} %</p>
                                            </td>
                                            <td>
                                                <img src="/images/weather/Thermometer-25.svg" alt="Temperature"/>
                                                <p>{temperature} &deg;C</p>
                                            </td>
                                        </tr>
                                    </table>
                                    :null}
                                {img}
                                <p  className="weather-content__description">{info}</p>

                            </div>
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