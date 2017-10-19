
# Online Test (Github Pages)
	https://fsvieira.github.io/wines-and-beer/

# Config Files
	* bs-config.js 
		* Its the dev web server configuration file, it contains important information like port,
		folder and type of files to sync/watch.
	* src/config/
		* Its the folder containing all configuration files used by the web-app.

# Dev
	Install node and nvm, on root folder run:
	
	* npm install
		* This will install all needed dependecies,
	* gulp watch
		* This will build and watch files for developing,
	* npm run dev
		* This will lunch web server with live-sync.
		
# Build
	* gulp build
	
	Sources are ready on www folder.


# Libs
  It uses Angular 1 framework with ui-router.
  
# Tools
  The project uses Gulp, Browserify and Babel to support older browsers.
  The project also uses jshint tools to lint the code for better code quality.
  
# Architecture
Its a simple MVVC architecture using views to display data, controllers to get and prepare data for views and data service for a better data layer abstraction from external or internal data services.

Currently the Services only handles localstorage data and it is not connected to any wine service only a json test file (https://github.com/fsvieira/wines-and-beer/blob/master/src/resources/wines.json), this is because I didn't have time to complete the api connection and I had some problems registering on the wine websites, however the architecture will allow to easily add other data sources.




