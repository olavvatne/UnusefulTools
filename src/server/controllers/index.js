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

    app.get('/', function (req, res) {

        var templateData = {
            tools: [
                {url: "/rgb-to-hex", image: "images/paint.svg", title: "Convert color RGB to hex"},
                {url: "/webcam", image: "images/camera.svg", title: "Browser webcamera"},
                {url: "/bmi-calculator", image: "images/scale.svg", title: "BMI calculator"},
                {url: "/weeknumber", image: "images/calendar.svg", title: "Week number"},
                {url: "/dice-roll", image: "images/die.svg", title: "Dice roll"}
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



    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found"});
    });
}