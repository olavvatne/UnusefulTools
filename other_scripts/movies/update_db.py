# add key 1,2,3,4... to all movies in db for easier random extraction

import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.unusefuldb

collection = db.movies

random_id = 0

for movie in collection.find():
	id = movie['_id']

	print("Setting random_id: ", random_id)

	# update
	collection.update({'_id': id}, {'$set': {'random_id': random_id}})
	random_id += 1

print("==========================")
print("Done inserting")
print("==========================")