ratings_raw_example.list is the file obtained from IMDB.
scrape.py extracts information from it and stores it in result_example.list.
populate_db.py use information (actually only title) from result_example.list and populates mongodb.
update_db adds a random_id to each movie in the db. It makes it possible to get random movies from the db.

