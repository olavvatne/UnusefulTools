import express from "express";
import React from "react";
import Router from "react-router";
import HelloWorld from "../shared/components/HelloWorld";
const app = express();

// set up Jade
app.set('views', './views');
app.set('view engine', 'ejs');

import routes from "../shared/routes";

app.get('/', function (req, res) {
    Router.run(routes, req.url, Handler => {
        let content = React.renderToString(<Handler />);
        res.render('index', { reactContent: content });
    });
});

app.get('/helloworld', function(req, res) {
    let content = React.renderToString(<HelloWorld />);
    var templateData = {
        toolTitle: "Tool #1",
        toolDescription: "First tool of many.",
        reactContent: content
    }
    res.render('pages/helloworld', templateData);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});