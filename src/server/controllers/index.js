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
import ToolTemp from "../../shared/components/ToolTemp";

module.exports.set = function(app) {

    var getScriptPath = function() {
        if(app.get('env') === 'development') {
            return 'http://localhost:8080';
        }
        return ''
    }

    app.get('/', function (req, res) {
        let content = React.renderToString(<ToolTemp />);
        var templateData = {
            reactEntryPath: getScriptPath(),
            reactContent: content
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
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "WebcamClient"
        };
        res.render('pages/default-tool', templateData);
    });


    app.get('/weeknumber', function(req, res) {
        let content = React.renderToString(<WeekNumber />);
        var templateData = {
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
            reactContent: content,
            reactEntryPath: getScriptPath(),
            reactScript: "ColorConverterClient"
        };
        res.render('pages/default-tool', templateData);
    });
}