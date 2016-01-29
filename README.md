# UnusefulTools

##Deploy 
* merge develop into master 
* login server 
* pull master 
* npm install
* add apikey.js to root folder, if first time deploying
* occasionally update geoip-lite ip-address mapping
* build (npm run build)
* restart node (restart unuseful-app-1)

## New component
* REMEMBER "--save" when including new libraries
* Create component
* Create concise title
* Create Description
* Create metadescription
* Update sitemap
* Icon for frontpage

## Debug
* move style.css to style/style.css (should be fixed)
* Show output: (node might use the port already) NODE_ENV=production PORT=5000 npm run server
* ps aux | grep node (and kill node with kill -9 PID if node is running)
* /etc/init/unuseful-app-1.conf
* /etc/nginx/sites-enabled/unuseful-app
* add location to nginx if new folder in public

##MongoDB ubuntu server
* Digital Ocean provides mean stack instance that include MongoDB.
* If not follow this [guide]{https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04}
* Add official MongoDB repository: sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
* Add MongoDB repository details: echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
* Update packages list: sudo apt-get update
* Install MongoDB: sudo apt-get install -y mongodb-org
* Check if mongodb is running: service mongod status
* Update packages in production: npm install
* Create database for unuseful. First enter: "mongo". Then: "use unusefuldb"
* Then create a collection for movies: "db.createCollection("movies")
* Insert dummy data by: db.movies.insert({"title": "The godfather"}

To stop/restart/start do: service mongod stop/restart/start
