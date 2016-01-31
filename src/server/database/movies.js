/**
 * Created by Torgeir on 31.01.2016.
 */

var movies = {
    getRandomMovie: function(db, callback) {
        var nrOfMovies = 10;

        var collection = db.get('movies');
        collection.count({}, function(err, count) {
            var random_ids = [];

            for (var i = 0; i < nrOfMovies; i++) {

                var nr = Math.floor(Math.random() * count);

                if (random_ids.indexOf(nr) > 0) {
                    i -= 1;
                    continue
                }
                random_ids.push(nr)
            }
            console.log(random_ids)

            collection.find({
                'random_id': {$in: random_ids}
            }, {}, callback);
        });
    }
}

export default movies;