"use strict";

app.factory("LastFMFactory", function($q, $http, lastFMcreds) {

	let baseURL = "http://ws.audioscrobbler.com/2.0/";
	let albumSearch = "?method=album.search&album=";
	let similarArtistSearch = "?method=artist.getsimilar&artist=";
	let topAlbumSearch = "?method=artist.gettopalbums&mbid=";
	let userInput = "";
	let apiString = `&api_key=${lastFMcreds.apiKey}`;
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

	const getSimilarArtists = function (singleArtist) {
		let reducedArtistList = [];

		return $q((resolve, reject) => {
			$http.get(baseURL + similarArtistSearch + singleArtist + apiString + format)
			.then ((response) => {
				let drilledToArtistNames = response.data.similarartists.artist;
				for (let i = 0; i < 5; i++) {
					reducedArtistList.push(drilledToArtistNames[i].mbid);
				}
				// console.log ("REDUCED ARTIST SIMILAR LIST", reducedArtistList);
				resolve(reducedArtistList);
			});
		});
	};


	const getAlbums = function (singleArtistMBID) {
		let similarAlbumMBIDS = [];
		let albums = [];

		return $q((resolve, reject) => {
			$http.get(baseURL + topAlbumSearch + singleArtistMBID + apiString + format)
			.then ((response) => {
				let justAlbums = response.data.topalbums.album;
				for (let i=0; i < 5; i++) {
					albums.push(justAlbums[i]);
				}
				console.log ("response from LASTFM", albums);
				resolve(albums);
		});
	});
};



 return {getLastFMvinyl, getSimilarArtists, getAlbums};
});



