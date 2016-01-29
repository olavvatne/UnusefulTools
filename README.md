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

