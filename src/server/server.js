import express from "express";
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
import WeekNumber from "../shared/components/WeekNumber";
import ImageConverter from "../shared/components/ImageConverter";
import ToolTemp from "../shared/components/ToolTemp";
var sassMiddleware = require('node-sass-middleware')
const app = express();

//TODO: New backend structure that makes more sense.
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(sassMiddleware({
    /* Options */
    src: './style',
    dest: './public',
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.static('./public')); //compiled sass put in here

app.get('/', function (req, res) {
    let content = React.renderToString(<ToolTemp />);
    var templateData = {
        toolTitle: "Tool #1",
        toolDescription: "First tool of many.",
        reactContent: content
    };
    res.render('index', templateData);
});

app.get('/helloworld', function(req, res) {
    let content = React.renderToString(<HelloWorld />);
    var templateData = {
        toolTitle: "Tool #1",
        toolDescription: "First tool of many.",
        reactContent: content
    };
    res.render('pages/DefaultTool', templateData);
});


//TODO: process.env.PORT || 3000
app.get('/weeknumber', function(req, res) {
    let content = React.renderToString(<WeekNumber />);
    var templateData = {
        toolTitle: "Week number",
        toolDescription: "Which week is it? Current week of the year is displayed.",
        reactContent: content,
        reactScript: "WeekNumberClient"
    };
    res.render('pages/DefaultTool', templateData);
});

app.get('/imageconverter', function(req, res) {
    let content = React.renderToString(<ImageConverter />);
    var templateData = {
        toolTitle: "Convert images",
        toolDescription: "Convert your image.",
        reactContent: content,
        reactScript: "ImageConverterClient"
    };
    res.render('pages/DefaultTool', templateData);
});

var server = app.listen(7000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});