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
import SpecialCharacters from "../../shared/components/SpecialCharacters.js";
import weatherController from "./weather.js";


module.exports.set = function(app) {

    var getScriptPath = function() {
        if(app.get('env') === 'development') {
            return 'http://localhost:8080';
        }
        return ''
    }
    weatherController.set(app, getScriptPath);

    app.get('/', function (req, res) {

        var templateData = {
            tools: [
                {url: "/weeknumber", image: "images/calendar.svg", title: "Week number"},
                {url: "/webcam", image: "images/camera.svg", title: "Browser webcamera"},
                {url: "/bmi-calculator", image: "images/scale.svg", title: "BMI calculator"},
                {url: "/dice-roll", image: "images/die.svg", title: "Dice roll"},
                {url: "/rgb-to-hex", image: "images/paint.svg", title: "Convert color RGB to hex"},
                {url: "/weather", image: "images/weather.svg", title: "Current weather"},
                {url: "/special-characters", image: "images/keyboard.svg", title: "Special characters"}
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

    app.get('/special-characters', function(req, res) {
        let content = React.renderToString(<SpecialCharacters />);
        var templateData = {
            toolTitle: SpecialCharacters.toolTitle,
            toolMetaDescription: SpecialCharacters.toolMetaDescription,
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "SpecialCharactersClient"
        };
        res.render('pages/special-tool', templateData);
    });

    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found"});
    });
}