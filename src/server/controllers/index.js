/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import ReactDOMServer from "react-dom/server";

import * as Tools from "../../shared/components"
import movies from "../database/movies.js";

import weatherController from "./weather.js";


module.exports.set = function(app) {

    var createTool = function(name, initialData) {
        let reactdata = initialData? {data: initialData}: {};
        let component = React.createElement(Tools[name], reactdata);
        let content = ReactDOMServer.renderToString(component);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: Tools[name].toolTitle,
            toolMetaDescription: Tools[name].toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: name + "Client",
            environment: environment.environment
        };

        if(initialData) {
            templateData.data = initialData;
        }

        return templateData;
    };

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
    weatherController.set(app, getEnvironment, createTool);

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
        let templateData = createTool("BMI");
        res.render('pages/default-tool', templateData);
    });

    app.get('/webcam', function(req, res) {
        let templateData = createTool("Webcam");
        res.render('pages/default-tool', templateData);
    });


    app.get('/weeknumber', function(req, res) {
        let templateData = createTool("WeekNumber");
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
        let templateData = createTool("ColorConverter");
        res.render('pages/default-tool', templateData);
    });

    app.get('/dice-roll', function(req, res) {
        let templateData = createTool("Dice");
        res.render('pages/default-tool', templateData);
    });

    app.get('/special-characters', function(req, res) {
        let templateData = createTool("SpecialCharacters");
        res.render('pages/special-tool', templateData);
    });

    app.get('/random-movie', function(req, res) {

        var callback = function(err, docs) {

            var initData = JSON.stringify(docs);
            let templateData = createTool("RandomMovie", initData);
            res.render('pages/default-data-tool', templateData);
        }
        movies.getRandomMovie(req.db, callback)
    });

    app.get('/lorem-ipsum', function(req, res) {
        let templateData = createTool("LoremIpsum");
        res.render('pages/special-tool', templateData);
    });

    app.get('/noise-mixer', function(req, res) {
        let templateData = createTool("WhiteNoise");
        res.render('pages/default-tool', templateData);
    });


    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
}