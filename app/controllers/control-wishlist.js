"use strict";

app.controller("wishlistCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){

  let vinylFromLastFM = [];
  let currentArray = [];
  let filteredforWishlist = [];
  let arrayOfCustomVinylObjects = [];

	const getAllUserWishlist = function(UID) {
    $scope.arrayOfCustomVinylObjects = [];
    arrayOfCustomVinylObjects = [];
    filteredforWishlist = [];

		let useridgoeshere = userFactory.getCurrentUser();
		FBFactory.getAllVinyl(useridgoeshere)
		.then((arrayOfCustomVinylObjects) => {
      for (let i = 0; i < arrayOfCustomVinylObjects.length; i++) {
        if (arrayOfCustomVinylObjects[i].wishlisted ) {
            filteredforWishlist.push(arrayOfCustomVinylObjects[i]);
        }
      }
			console.log ("wishlisted albums:", filteredforWishlist);
			$scope.arrayOfCustomVinylObjects = filteredforWishlist;
		});
	};

  $scope.wishlistToTrue = function(album) {
    album.wishlisted = true;
    album.owned = false;
    delete album.$$hashKey;
    console.log ("album", album);
    FBFactory.editVinyl(album.firebaseID, album)
    .then ( (response) => {
      // getAllUserOwned();
    });
  };

  $scope.ownedToTrue = function(album) {
    album.wishlisted = false;
    album.owned = true;
    delete album.$$hashKey;
    console.log ("album", album);
    FBFactory.editVinyl(album.firebaseID, album)
    .then ( (response) => {
      // getAllUserOwned();
    });
  };


	$scope.deleteVinyl = function(FBID, album){
      // filteredforWishlist.forEach(function(item, index) {
      // if (item.mbid == mbid) {
      album.owned = false;
      album.wishlisted = false;
    	FBFactory.deleteVinyl(FBID)
    	.then( (irrelevant) => {
    		// getAllUserWishlist();
    	});
    };
  // });

  // $scope.findMatchingMBIDforOwned = function(IDfromDispVinylhtml) {
  //   console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
  //   console.log ("filteredforWishlist", filteredforWishlist);
  //   filteredforWishlist.forEach(function(item, index) {
  //     if (item.mbid == IDfromDispVinylhtml) {
  //       console.log ("ITEM IS HERE", item);
  //         item.owned = true;
  //         item.wishlisted = false;
  //         delete item.$$hashKey;
  //       // console.log("You Chose:", item);
  //         FBFactory.editVinyl(item.firebaseID, item)
  //         .then( (response) => {
  //         getAllUserWishlist();
  //     });
  //     }
  //   });
  // };



	getAllUserWishlist();

});


  // $scope.searchLastFM = function(userInput) {
  //   LastFMFactory.getLastFMvinyl(userInput)
  //   .then((APIvinyl) => {
  //     // console.log ("APIvinyl", APIvinyl);
  //     vinylFromLastFM = APIvinyl.results.albummatches.album;
  //     vinylFromLastFM.forEach(function(item, index) {
  //       buildVinylObj(item);
  //     });
  //     // console.log ("APIvinyl", APIvinyl.results.albummatches.album);

  //   });
  // };