import express from "express";
import engine  from "ejs-locals";
import favicon from 'serve-favicon';
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
import WeekNumber from "../shared/components/WeekNumber";
import ImageConverter from "../shared/components/ImageConverter";
import BMI from "../shared/components/BMI";
import Webcam from "../shared/components/Webcam";
import ColorConverter from "../shared/components/ColorConverter";
import ToolTemp from "../shared/components/ToolTemp";
//TODO: Save node-sass-middleware in package.json
var sassMiddleware = require('node-sass-middleware'); //TODO: Do import instead
var sass = require('node-sass'); //TODO: Move to build.js
var fs = require('fs'); //TODO: Move to build.js

const app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3000);

app.engine('ejs', engine);//Support for layout for templates
app.set('view engine', 'ejs');
//TODO: New backend structure that makes more sense.
app.set('views', './views');
app.use(favicon( './public/images/favicon/favicon.ico'));

var srcPath = './';
var destPath = './public';

var getScriptPath = function() {
    if(app.get('env') === 'development') {
        return 'http://localhost:8080';
    }
    return ''
}

if(app.get('env') === 'development') {
    app.use(sassMiddleware({
        /* Options */
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix:  '/prefix'
    }));
    app.use(express.static('./public')); //compiled sass and other stuff put in here
}

//TODO: Move to build.js
if(app.get('env') === 'production') {
    console.log("==== Render SASS =====")
    sass.render({
        file: srcPath + 'style/style.scss',
            outputStyle: 'compressed'
    },
    function(err, result) {
        if(err) {
            console.log(err);
            throw new Error("Could not render SASS")
        }
        else {
            fs.writeFile(destPath + '/style.css', result.css, function(err) {
                if(err) {
                    return console.log(err);
                    throw new Error("Could not write SASS")
                }
                console.log("The file was saved!");
            });
        }
    });
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

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});