"use strict";

app.controller("ownedCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory
  ){

  let vinylFromLastFM = [];
  let currentArray = [];
  let filteredforOwned = [];

	const getAllUserOwned = function(UID) {
		filteredforOwned = [];

		let useridgoeshere = userFactory.getCurrentUser();
		FBFactory.getAllVinyl(useridgoeshere)
		.then((arrayOfCustomVinylObjects) => {
			for (let i = 0; i < arrayOfCustomVinylObjects.length; i++) {
        		if (arrayOfCustomVinylObjects[i].owned) {
            		filteredforOwned.push(arrayOfCustomVinylObjects[i]);
        	}
      	}
			console.log ("owned albums:", filteredforOwned);
			$scope.arrayOfCustomVinylObjects = filteredforOwned;
		});
	};

	$scope.deleteVinyl = function(album){
      // filteredforWishlist.forEach(function(item, index) {
      console.log ("album", album);
      album.owned = false;
      album.wishlisted = false;
    	FBFactory.deleteVinyl(album.firebaseID)
    	.then( (irrelevant) => {
    		getAllUserOwned();
    	});
    };

  $scope.wishlistToTrue = function(album) {
    album.wishlisted = true;
    album.owned = false;
    delete album.$$hashKey;
    console.log ("album", album);
    FBFactory.editVinyl(album.firebaseID, album)
    .then ( (response) => {
    	getAllUserOwned();
    });
  };


	getAllUserOwned();

});