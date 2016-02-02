f = open('ratings.list', 'r')


movies = []

while True:
	line = f.readline()
	if line == '':
		break
	# Ditch distribution

	votes = line[17:26]
	votes = votes.strip()
	#print("votes: ", votes)

	# Ditch low voted movies
	try:
		if not votes or (int(votes) < 1000):
			continue
	except:
		continue

	rank = line[26:31]
	rank = rank.strip()

	# Ditch low rated movies
	if not rank or (float(rank) < 7.0):
		continue

	# get title
	strippedLine = line[31:]
	indexAfterTitle = strippedLine.find("(")
	title = strippedLine[:indexAfterTitle]
	title = title.strip()

	# year
	year = strippedLine[indexAfterTitle + 1:strippedLine.find(")")]
	year = year.strip()

	movie = {"title":title, "year":year, "rating":rank, "votes":votes}
	movies.append(movie)

f.close()

# Write result to file
with open('result_no_series.list', 'w') as f:
	count = 0
	title = movies[0]['title']
	movie_string = movies[0]['rating'] + ", " + title + ", " + movies[0]['votes'] + ", " + movies[0]['year'] + "\n"

	for i in range(1, len(movies)):
		if title == movies[i]['title']:
			count += 1
		else:
			count = 0


		if count == 0:
			f.write(movie_string)
			movie_string = movies[i]['rating'] + ", " + movies[i]['title'] + ", " + movies[i]['votes'] + ", " + movies[i]['year'] + "\n"

		title = movies[i]['title']