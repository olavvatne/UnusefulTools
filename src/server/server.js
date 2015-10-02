import express from "express";
import engine  from "ejs-locals";
import favicon from 'serve-favicon';
import controllers from './controllers';
//TODO: Save node-sass-middleware in package.json
var sassMiddleware = require('node-sass-middleware'); //TODO: Do import instead
var sass = require('node-sass'); //TODO: Move to build.js
var fs = require('fs'); //TODO: Move to build.js

const app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3000);

app.use(express.static('./public')); //compiled sass and other stuff put in here

app.engine('ejs', engine);//Support for layout for templates
app.set('view engine', 'ejs');
//TODO: New backend structure that makes more sense.
app.set('views', './views');
app.use(favicon( './public/images/favicon/favicon.ico'));

var srcPath = './';
var destPath = './public';

//Moving topcoat css into public style folder on start up

/*fs.readFile('folder1/image.png', function (err, data) {
    if (err) throw err;
    fs.writeFile('folder2/image.png', data, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});*/

if(app.get('env') === 'development') {
    app.use(sassMiddleware({
        /* Options */
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix:  '/prefix'
    }));
}

//TODO: Move to build.js
if(app.get('env') === 'production') {
    console.log("==== Render SASS =====")
    sass.render({
        file: srcPath + '/style.scss',
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

controllers.set(app);

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});