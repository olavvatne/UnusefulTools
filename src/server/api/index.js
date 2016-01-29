module.exports.set = function(app) {

    app.get('/api/v1/movies', function(req, res) {
        var db = req.db;
        var collection = db.get('movies');
        collection.find({}, {}, function(err, docs) {
            console.log(docs);
            res.json(docs);
        });
    });

    app.get('/api/v1/random-movies', function(req, res) {
        // get 10 random movies
        var nrOfMovies = 10;
        var db = req.db;
        var collection = db.get('movies');
        collection.count({}, function(err, count) {
            var random_ids = [];

            for (var i = 0; i < nrOfMovies; i++) {
                console.log(Math.random());
                console.log(count);
                var nr = Math.floor(Math.random() * count);

                console.log(nr)
                if (random_ids.indexOf(nr) > 0) {
                    i -= 1;
                    continue
                }
                random_ids.push(nr)
            }
            console.log(random_ids)

            collection.find({
                'random_id': {$in: random_ids}
            }, {}, function(err, docs) {
                res.json(docs);
            });
        });
    });
};