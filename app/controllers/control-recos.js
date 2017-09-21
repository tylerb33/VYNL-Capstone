"use strict";

app.controller("recosCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory, $q){

  let vinylFromLastFM = [];
  let currentArray = [];
  let ownedMBID = [];
  let buildVinylObj;
  let arrayOfCustomVinylObjects = [];

//the below takes an array and removes any duplicate values
	const getUniqueValuesInArray = function (initialAlbums) {
		let uniqueValues= [];

		$.each(initialAlbums, function(i, el){
    		if($.inArray(el, uniqueValues) === -1) uniqueValues.push(el);
		});

		return uniqueValues;
	};

//the below calls the database to get the users' owned albums, then calls a helper function to remove any duplicates.

	const getAllUserOwnedMBIDs = function() {

		return $q((resolve, reject) => {

			let useridgoeshere = userFactory.getCurrentUser();
			FBFactory.getAllVinyl(useridgoeshere)
			.then((arrayOfCustomVinylObjects) => {
				for (let i = 0; i < arrayOfCustomVinylObjects.length; i++) {
					if (arrayOfCustomVinylObjects[i].owned === true) {
	            		ownedMBID.push(arrayOfCustomVinylObjects[i].artist_name);
	            	}
	      		}
			let getUniques = getUniqueValuesInArray(ownedMBID);
			console.log ("getUniques", getUniques);
      		resolve(getUniques);
			});
		});
	};



	const getRelatedArtists = function() {
		
		return $q((resolve, reject) => {
				let MBIDofRelatedArtists = [];
				getAllUserOwnedMBIDs()
				.then ((arrayOfArtists) => {
					// console.log ("arrayOfArtists", arrayOfArtists);
					$.each(arrayOfArtists, function(item, element) {
						LastFMFactory.getSimilarArtists(element)
						.then((data) => {
							console.log ("data", data);
							for (let i=0; i<data.length; i++) {
								MBIDofRelatedArtists.push(data[i]);
							}
							console.log ("MBIDofRelatedArtists", MBIDofRelatedArtists);
							resolve(MBIDofRelatedArtists);
						});
					});
					// console.log ("MBIDofRelatedArtists", MBIDofRelatedArtists);
				});
			});	
		};


// the below uses the MBIDs of artists collected by getRelatedArtists() to get related, 'top' albums from Last FM.
	const getRelatedAlbums = function() {

		return $q((resolve, reject) => {
			let albumMBIDS = [];
			getRelatedArtists()
			.then ((relatedArtistMBIDS) => {
				console.log ("relatedArtistMBIDS", relatedArtistMBIDS);
				$.each(relatedArtistMBIDS, function(item, element) {
					console.log ("element", element);
					LastFMFactory.getAlbums(element)
					.then((data) => {
						console.log ("HERE NOW?", data);
						resolve(data);
					});
				});
			});	
		});
	};

//
$scope.showVinylOnPage = function() {
	getRelatedAlbums()
	.then ((relatedAlbums) => {
		console.log ("HERE YET", relatedAlbums);
		for (let i=0; i<relatedAlbums.length; i++) {
			console.log ("relatedAlbums[i]", relatedAlbums[i]);
			buildVinylObj(relatedAlbums[i]);
		}
	});

};

// The below looks to see if a vinyl has an image. If it doesn't, then it will not have an object built for it and will not be printed to the page.

  buildVinylObj = function(singleRecord) {
  	console.log ("singleRecord", singleRecord);
      $scope.arrayOfCustomVinylObjects = [];


    if (singleRecord.image[3]['#text'] !== "" && singleRecord.mbid !== "") {
      let currentUserID = userFactory.getCurrentUser();
      //if vinyl record has an image, run the below
      let vinylObj = {
          //had to use bracket notation for #text since the hash is a special character, throws errors otherwise
          album_image: singleRecord.image[3]['#text'],
          album_link: singleRecord.url,
          album_name: singleRecord.name,
          artist_name: singleRecord.artist.name,
          firebaseID: "",
          mbid: singleRecord.mbid,
          owned: false,
          wishlisted: false,
          uid: currentUserID
      };
      arrayOfCustomVinylObjects.push(vinylObj);
    }    
      console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
      $scope.arrayOfCustomVinylObjects = arrayOfCustomVinylObjects;

  };

  $scope.wishlistToTrue = function(album) {
    album.wishlisted = true;
    album.owned = false;
    delete album.$$hashKey;
    console.log ("album", album);
    FBFactory.addVinyl(album);
  };



	// getAllUserOwnedMBIDs();
	$scope.showVinylOnPage();


	});