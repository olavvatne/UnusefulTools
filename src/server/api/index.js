import movies from "../database/movies.js"

module.exports.set = function(app) {

    app.get('/api/v1/movies', function(req, res) {

        // TODO: This should not be possible, getting 10000 movies will crash browser!!

        var db = req.db;
        var collection = db.get('movies');
        collection.find({}, {}, function(err, docs) {
            //console.log(docs);
            res.json(docs);
        });
    });

    app.get('/api/v1/random-movies', function(req, res) {
        var callback = function (err, docs) {
            res.json(docs);
        };
        movies.getRandomMovie(req.db, callback);
    });
};