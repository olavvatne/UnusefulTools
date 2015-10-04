/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import HelloWorld from "../../shared/components/HelloWorld";
import WeekNumber from "../../shared/components/WeekNumber";
import ImageConverter from "../../shared/components/ImageConverter";
import BMI from "../../shared/components/BMI";
import Webcam from "../../shared/components/Webcam";
import ColorConverter from "../../shared/components/ColorConverter";
import Dice from "../../shared/components/Dice";
import Weather from "../../shared/components/Weather";
import request from "request";

module.exports.set = function(app) {

    var getScriptPath = function() {
        if(app.get('env') === 'development') {
            return 'http://localhost:8080';
        }
        return ''
    }

    app.get('/', function (req, res) {

        var templateData = {
            tools: [
                {url: "/rgb-to-hex", image: "images/paint.svg", title: "Convert color RGB to hex"},
                {url: "/webcam", image: "images/camera.svg", title: "Browser webcamera"},
                {url: "/bmi-calculator", image: "images/scale.svg", title: "BMI calculator"},
                {url: "/weeknumber", image: "images/calendar.svg", title: "Week number"},
                {url: "/dice-roll", image: "images/die.svg", title: "Dice roll"}
            ]
        };
        res.render('pages/home', templateData);
    });

    /*app.get('/helloworld', function(req, res) {
     let content = React.renderToString(<HelloWorld />);
     var templateData = {
     reactEntryPath: getScriptPath(),
     reactContent: content
     };
     res.render('pages/default-tool', templateData);
     });*/

    app.get('/bmi-calculator', function(req, res) {
        let content = React.renderToString(<BMI />);
        //content = null;
        var templateData = {
            toolTitle: BMI.toolTitle,
            toolMetaDescription: BMI.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "BMIClient"
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/webcam', function(req, res) {
        let content = React.renderToString(<Webcam />);
        //content = null;
        var templateData = {
            toolTitle: Webcam.toolTitle,
            toolMetaDescription: Webcam.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "WebcamClient"
        };
        res.render('pages/default-tool', templateData);
    });


    app.get('/weeknumber', function(req, res) {
        let content = React.renderToString(<WeekNumber />);
        var templateData = {
            toolTitle: WeekNumber.toolTitle,
            toolMetaDescription: WeekNumber.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "WeekNumberClient"
        };
        res.render('pages/default-tool', templateData);
    });

    /*app.get('/imageconverter', function(req, res) {
     let content = React.renderToString(<ImageConverter />);
     var templateData = {
     reactContent: content,
     reactEntryPath: getScriptPath(),
     reactScript: "ImageConverterClient"
     };
     res.render('pages/default-tool', templateData);
     });*/

    app.get('/rgb-to-hex', function(req, res) {
        let content = React.renderToString(<ColorConverter />);
        var templateData = {
            toolTitle: ColorConverter.toolTitle,
            toolMetaDescription: ColorConverter.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "ColorConverterClient"
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/dice-roll', function(req, res) {
        let content = React.renderToString(<Dice />);
        var templateData = {
            toolTitle: Dice.toolTitle,
            toolMetaDescription: Dice.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "DiceClient"
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/weather', function(req, res) {
        console.log("THIS WORKS!")
        let content = React.renderToString(<Weather />);
        var templateData = {
            toolTitle: Weather.toolTitle,
            toolMetaDescription: Weather.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "WeatherClient"
        };
        res.render('pages/default-tool', templateData);
    });

    app.post('/getlocation', function(req, res) {
        console.log("INSIDE");
        var api = "AIzaSyChxs1Xua4N7TM107GjkytH_pdWlvzvOTA";
        var lat = req.body.lat;
        var lon = req.body.lon;
        console.log(req.body);
        console.log(lat);
        console.log(lon);
        var base = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        var url = base + lat + "," + lon +"&key=" + api;
        console.log(url);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // from within the callback, write data to response, essentially returning it.
                res.send(body);
            }
        })
    });

    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found"});
    });
}