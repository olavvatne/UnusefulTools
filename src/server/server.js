import express from "express";
import React from "react";
import HelloWorld from "../shared/components/HelloWorld";
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
    res.render('pages/helloworld', templateData);
});


//TODO: process.env.PORT || 3000
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});