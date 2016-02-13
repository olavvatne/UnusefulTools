/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import HelloWorld from "../../shared/components/HelloWorld";
import WhiteNoise from "../../shared/components/WhiteNoise";
import WeekNumber from "../../shared/components/WeekNumber";
import ImageConverter from "../../shared/components/ImageConverter";
import BMI from "../../shared/components/BMI";
import Webcam from "../../shared/components/Webcam";
import ColorConverter from "../../shared/components/ColorConverter";
import Dice from "../../shared/components/Dice";
import LoremIpsum from "../../shared/components/LoremIpsum";
import SpecialCharacters from "../../shared/components/SpecialCharacters.js";
import RandomMovie from "../../shared/components/RandomMovie.js";
import CountryCodes from "../../shared/components/CountryCodes.js";

import movies from "../database/movies.js";
import countryCodesData from "../database/countryCodesData.js";

import weatherController from "./weather.js";


module.exports.set = function(app) {

    var getEnvironment = function() {
        if(app.get('env') === 'development') {
            return {scriptPath: 'http://localhost:8080',
                    environment: 'development'
            };
        }
        return {scriptPath: '',
                environment: 'production'
        };
    }
    weatherController.set(app, getEnvironment);

    app.get('/', function (req, res) {

        var templateData = {
            tools: [
                {url: "/random-movie", image: "images/random-movie.svg", title: "Random movie"},
                {url: "/weeknumber", image: "images/calendar.svg", title: "Week number"},
                {url: "/webcam", image: "images/camera.svg", title: "Browser webcamera"},
                {url: "/bmi-calculator", image: "images/scale.svg", title: "BMI calculator"},
                {url: "/dice-roll", image: "images/die.svg", title: "Dice roll"},
                {url: "/weather", image: "images/weather.svg", title: "Current weather"},
                {url: "/special-characters", image: "images/keyboard.svg", title: "Special characters"},
                {url: "/lorem-ipsum", image: "images/lorumipsum.svg", title: "Lorem ipsum"},
                {url: "/rgb-to-hex", image: "images/paint.svg", title: "Convert color RGB to hex"},
                {url: "/noise-mixer", image: "images/noise.svg", title: "Noise mixer"}
            ],
            environment: getEnvironment().environment
        };
        res.render('pages/home', templateData);
    });

    /*app.get('/helloworld', function(req, res) {
     let content = React.renderToString(<HelloWorld />);
     var templateData = {
     reactEntryPath: getEnvironment()(),
     reactContent: content
     };
     res.render('pages/default-tool', templateData);
     });*/

    app.get('/bmi-calculator', function(req, res) {
        let content = React.renderToString(<BMI />);
        //content = null;
        var environment = getEnvironment();
        var templateData = {
            toolTitle: BMI.toolTitle,
            toolMetaDescription: BMI.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "BMIClient",
            environment: environment.environment

        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/webcam', function(req, res) {
        let content = React.renderToString(<Webcam />);
        //content = null;
        var environment = getEnvironment();
        var templateData = {
            toolTitle: Webcam.toolTitle,
            toolMetaDescription: Webcam.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "WebcamClient",
            environment: environment.environment
        };
        res.render('pages/default-tool', templateData);
    });


    app.get('/weeknumber', function(req, res) {
        let content = React.renderToString(<WeekNumber />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: WeekNumber.toolTitle,
            toolMetaDescription: WeekNumber.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "WeekNumberClient",
            environment: environment.environment
        };
        res.render('pages/default-tool', templateData);
    });

    /*app.get('/imageconverter', function(req, res) {
     let content = React.renderToString(<ImageConverter />);
     var templateData = {
     reactContent: content,
     reactEntryPath: getEnvironment()(),
     reactScript: "ImageConverterClient"
     };
     res.render('pages/default-tool', templateData);
     });*/

    app.get('/rgb-to-hex', function(req, res) {
        let content = React.renderToString(<ColorConverter />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: ColorConverter.toolTitle,
            toolMetaDescription: ColorConverter.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "ColorConverterClient",
            environment: environment.environment
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/dice-roll', function(req, res) {
        let content = React.renderToString(<Dice />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: Dice.toolTitle,
            toolMetaDescription: Dice.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "DiceClient",
            environment: environment.environment
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/special-characters', function(req, res) {
        let content = React.renderToString(<SpecialCharacters />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: SpecialCharacters.toolTitle,
            toolMetaDescription: SpecialCharacters.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "SpecialCharactersClient",
            environment: environment.environment
        };
        res.render('pages/special-tool', templateData);
    });

    app.get('/random-movie', function(req, res) {

        var callback = function(err, docs) {

            var initData = JSON.stringify(docs);
            let content = React.renderToString(<RandomMovie data={initData}/>);
            var environment = getEnvironment();
            var templateData = {
                toolTitle: RandomMovie.toolTitle,
                toolMetaDescription: RandomMovie.toolMetaDescription,
                reactContent: content,
                reactEntryPath: environment.scriptPath,
                reactScript: "RandomMovieClient",
                environment: environment.environment,
                data: initData
            };
            res.render('pages/default-data-tool', templateData);
        };
        movies.getRandomMovie(req.db, callback)
    });

    app.get('/lorem-ipsum', function(req, res) {
        let content = React.renderToString(<LoremIpsum />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: LoremIpsum.toolTitle,
            toolMetaDescription: LoremIpsum.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "LoremIpsumClient",
            environment: environment.environment
        };
        res.render('pages/special-tool', templateData);
    });

    app.get('/noise-mixer', function(req, res) {
        let content = React.renderToString(<WhiteNoise />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: WhiteNoise.toolTitle,
            toolMetaDescription: WhiteNoise.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "WhiteNoiseClient",
            environment: environment.environment
        };
        res.render('pages/default-tool', templateData);
    });

    app.get('/country-codes', function(req, res) {
        var callback = function(err, docs) {

            if (docs.length > 0) {
                var initData = JSON.stringify(docs);
                let content = React.renderToString(<CountryCodes data={initData}/>);
                var environment = getEnvironment();
                var templateData = {
                    toolTitle: CountryCodes.toolTitle,
                    toolMetaDescription: CountryCodes.toolMetaDescription,
                    reactContent: content,
                    reactEntryPath: environment.scriptPath,
                    reactScript: "CountryCodesClient",
                    environment: environment.environment,
                    data: initData
                };
                res.render('pages/default-data-tool', templateData);
            }
            res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
        };
        countryCodesData.getCountryCodes(req.db, callback)
    });


    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
}