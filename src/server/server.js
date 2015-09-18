import express from "express";
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
import WeekNumber from "../shared/components/WeekNumber";
import ImageConverter from "../shared/components/ImageConverter";
import ToolTemp from "../shared/components/ToolTemp";
const app = express();

//TODO: New backend structure that makes more sense.
app.set('views', './views');
app.set('view engine', 'ejs');

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
    res.render('pages/helloworld', templateData);
});

app.get('/weeknumber', function(req, res) {
    let content = React.renderToString(<WeekNumber />);
    var templateData = {
        toolTitle: "Week number",
        toolDescription: "Which week is it? Current week of the year is displayed.",
        reactContent: content
    };
    res.render('pages/helloworld', templateData);
});

app.get('/imageconverter', function(req, res) {
    let content = React.renderToString(<ImageConverter />);
    var templateData = {
        toolTitle: "Convert images",
        toolDescription: "Convert your image.",
        reactContent: content
    };
    res.render('pages/helloworld', templateData);
});

var server = app.listen(7000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});