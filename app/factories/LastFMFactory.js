"use strict";

app.factory("LastFMFactory", function($q, $http) {

	let baseURL = "http://ws.audioscrobbler.com/2.0/";
	let albumSearch = "?method=album.search&album=";
	let userInput = "sinners+like+me";
	let apiString = "&api_key=1036cabbf52b9b5ebd2c7bfee28ea1f1";
	let format = "&format=json";

	const getLastFMvinyl = function (userInput) {
		return $q((resolve, reject) => {
			$http.get(baseURL + albumSearch + userInput +  apiString + format)
            .then((response) => {
              console.log("getApiVinyl response: ", response);
              let resultsFromAPI = response.data;
              resolve(resultsFromAPI);
        	});
		});
	};


// example of URL to search for an album
/*
http://ws.audioscrobbler.com/2.0/
?method=album.search&album=sinners+like+me
&api_key=1036cabbf52b9b5ebd2c7bfee28ea1f1
&format=json
*/



 return {getLastFMvinyl};
});