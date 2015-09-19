import express from "express";
import engine  from "ejs-locals";
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
import WeekNumber from "../shared/components/WeekNumber";
import ImageConverter from "../shared/components/ImageConverter";
import ToolTemp from "../shared/components/ToolTemp";
var sassMiddleware = require('node-sass-middleware');
const app = express();

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


app.get('/', function (req, res) {
    let content = React.renderToString(<ToolTemp />);
    var templateData = {
        toolTitle: "Tool #1",
        toolDescription: "First tool of many.",
        reactContent: content
    };
    res.render('pages/home', templateData);
});

app.get('/helloworld', function(req, res) {
    let content = React.renderToString(<HelloWorld />);
    var templateData = {
        toolTitle: "Tool #1",
        toolDescription: "First tool of many.",
        reactContent: content
    };
    res.render('pages/default-tool', templateData);
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
    res.render('pages/default-tool', templateData);
});

app.get('/imageconverter', function(req, res) {
    let content = React.renderToString(<ImageConverter />);
    var templateData = {
        toolTitle: "Convert images",
        toolDescription: "Convert your image.",
        reactContent: content,
        reactScript: "ImageConverterClient"
    };
    res.render('pages/default-tool', templateData);
});

var server = app.listen(7000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});