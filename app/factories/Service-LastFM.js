"use strict";

app.service("LastFMService", function($q, $http, userFactory) {

this.results = [];


	let baseURL = "http://ws.audioscrobbler.com/2.0/";
	let albumSearch = "?method=album.search&album=";
	let userInput = "sinners+like+me";
	let apiString = "&api_key=1036cabbf52b9b5ebd2c7bfee28ea1f1";
	let format = "&format=json";

	this.getLastFMvinyl = function (userInput) {
		return $q((resolve, reject) => {
			$http.get(baseURL + albumSearch + userInput +  apiString + format)
            .then((response) => {
              let filteredToAlbums = response.data.results.albummatches.album;
              console.log ("filteredToAlbums", filteredToAlbums);
      			let currentUserID = userFactory.getCurrentUser();

              	this.results = filteredToAlbums.map(function(album) {
		

              		return {
					      // console.log ("currentUserID", currentUserID);
					      //if vinyl record has an image, run the below
					          //had to use bracket notation for #text since the hash is a special character, throws errors otherwise
					          album_image: album.image[3]['#text'],
					          album_link: album.url,
					          album_name: album.name,
					          artist_name: album.artist,
					          firebaseID: "",
					          mbid: album.mbid,
					          owned: false,
					          wishlisted: false,
					          uid: currentUserID // include uid to the object only if a user is logged in.

	                };    	
	        	});
			});
		});
	};
});
