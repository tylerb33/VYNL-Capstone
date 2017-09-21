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

  $scope.ownedToTrue = function(album) {
    album.wishlisted = false;
    album.owned = true;
    delete album.$$hashKey;
    console.log ("album", album);
    FBFactory.editVinyl(album.firebaseID, album)
    .then ( (response) => {
      getAllUserWishlist();
    });
  };


	$scope.deleteVinyl = function(album){
      // filteredforWishlist.forEach(function(item, index) {
      console.log ("album", album);
      album.owned = false;
      album.wishlisted = false;
    	FBFactory.deleteVinyl(album.firebaseID)
    	.then( (irrelevant) => {
    		getAllUserWishlist();
    	});
    };


	getAllUserWishlist();

});