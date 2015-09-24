import express from "express";
import engine  from "ejs-locals";
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
import WeekNumber from "../shared/components/WeekNumber";
import ImageConverter from "../shared/components/ImageConverter";
import BMI from "../shared/components/BMI";
import Webcam from "../shared/components/Webcam";
import ColorConverter from "../shared/components/ColorConverter";
import ToolTemp from "../shared/components/ToolTemp";
var sassMiddleware = require('node-sass-middleware');
const app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3000);

app.engine('ejs', engine);//Support for layout for templates
app.set('view engine', 'ejs');
//TODO: New backend structure that makes more sense.
app.set('views', './views');


var srcPath = './style';
var destPath = './public';

app.use(sassMiddleware({
    /* Options */
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'
}));
app.use(express.static('./public')); //compiled sass and other stuff put in here
app.use(express.static('./images'));

app.get('/', function (req, res) {
    let content = React.renderToString(<ToolTemp />);
    var templateData = {
        reactContent: content
    };
    res.render('pages/home', templateData);
});

app.get('/helloworld', function(req, res) {
    let content = React.renderToString(<HelloWorld />);
    var templateData = {
        reactContent: content
    };
    res.render('pages/default-tool', templateData);
});

app.get('/bmi', function(req, res) {
    let content = React.renderToString(<BMI />);
    //content = null;
    var templateData = {
        reactContent: content,
        reactScript: "BMIClient"
    };
    res.render('pages/default-tool', templateData);
});

app.get('/webcam', function(req, res) {
    let content = React.renderToString(<Webcam />);
    //content = null;
    var templateData = {
        reactContent: content,
        reactScript: "WebcamClient"
    };
    res.render('pages/default-tool', templateData);
});


app.get('/weeknumber', function(req, res) {
    let content = React.renderToString(<WeekNumber />);
    var templateData = {
        reactContent: content,
        reactScript: "WeekNumberClient"
    };
    res.render('pages/default-tool', templateData);
});

app.get('/imageconverter', function(req, res) {
    let content = React.renderToString(<ImageConverter />);
    var templateData = {
        reactContent: content,
        reactScript: "ImageConverterClient"
    };
    res.render('pages/default-tool', templateData);
});

app.get('/rgb-to-hex', function(req, res) {
    let content = React.renderToString(<ColorConverter />);
    var templateData = {
        reactContent: content,
        reactScript: "ColorConverterClient"
    };
    res.render('pages/default-tool', templateData);
});

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});