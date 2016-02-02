# run through textfile and format to json

import json
import csv
import requests

#r = requests.get("http://www.vg.no")
#print(r.status_code)


errors = []
movies = []

# reading resultfile
with open('result_no_series.list', 'r') as f:
	reader = csv.reader(f)

	base_url = "http://www.omdbapi.com/?t="

	count = 0

	

	for row in reader:
		title = row[1]
		title = title[1:]
		t_lower = title.lower()
		t = t_lower.replace(" ", "+")
		
		full_url = base_url + t

		r = requests.get(full_url)

		json = r.json()

		count += 1

		if json["Response"] != "True":
			errors.append((count, t, r.status_code))
			continue

		movies.append(json)


		print("Iteration: ", count, " Successes: ", len(movies), "Fails: ", len(errors))

print("================ Done getting ===================")
print("Errors: ", len(errors))
print("successes: ", len(movies))
print("=================================================")
print("Writing errors to file...")
# Write errors to file for further inspection
with open('errors.txt', 'w') as f:
	for error in errors:
		f.write(str(error[0]) + ", " + str(error[1]) + ", " + str(error[2]) + "\n")

print("=================================================")
print("Adding successes to db...")
# connect to local db
import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.unusefuldb

collection = db.movies

result = collection.insert_many(movies)

print("Done!")
print("==================================================")
