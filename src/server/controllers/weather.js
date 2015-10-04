/**
 * Created by Olav on 10/4/2015.
 */
import React from "react";
import Weather from "../../shared/components/Weather";
import request from "request";
import async from "async";
var parseString = require('xml2js').parseString;

module.exports.set = function(app, path) {


    app.get('/weather', function(req, res) {
        console.log("THIS WORKS!")
        let content = React.renderToString(<Weather />);
        var templateData = {
            toolTitle: Weather.toolTitle,
            toolMetaDescription: Weather.toolMetaDescription,
            reactContent: content,
            reactEntryPath: path(),
            reactScript: "WeatherClient"
        };
        res.render('pages/default-tool', templateData);
    });

    app.post('/getweather', function(req, res) {
        async.parallel([
            function(callback) {
                //TODO: Terms and agreement better
                var api = "AIzaSyChxs1Xua4N7TM107GjkytH_pdWlvzvOTA";
                var lat = req.body.lat;
                var lon = req.body.lon;
                var base = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
                var url = base + lat + "," + lon +"&key=" + api;
                request(url, function (error, response, body) {
                    if(error) { console.log(error); callback(true); return; }
                    if (!error && response.statusCode == 200) {
                        callback(false, JSON.parse(body));
                    }
                });
            },

            function(callback) {
                //TODO: Read terms and agreement better, need to cache results or something.
                //TODO: YR delivers a lot a data, try openweathermap instead!
                var api = "cf065e318acf8be8da6e4b4c354a5fef";
                var lat = req.body.lat;
                var lon = req.body.lon;
                var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&APPID=" + api ;
                //var url = "http://api.yr.no/weatherapi/locationforecast/1.9/?lat=" + lat + ";lon=" + lon
                request(url, function (error, response, body) {
                    if(error) { console.log(error); callback(true); return; }
                    console.log(body)
                    if (!error && response.statusCode == 200) {
                        callback(false, body);
                        /*parseString(body, function (err, result) {
                            //TODO: handle error

                        });*/
                    }
                });
        }],

        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }
            //Googles geo location response from coordinates. Results array from most specific
            //to least specific. Choosing 0, shows address as well, so result 1 is better in terms
            //of creepyness factor
            var forecast = results[1];
            var location = null;
            var data = results[0].results;
            if(data && data.length > 0) {
                //TODO: Handle if only 1 result. Chose that.
                location = data[1] ? data[1].formatted_address : data[0].formatted_address;
            }
            else {
                location = req.body.lat + " " + req.body.lon;
            }
            res.send({location: location, forecast: forecast});
        }
        );

    });

}