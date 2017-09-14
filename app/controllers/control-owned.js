"use strict";

app.controller("ownedCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){

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

	$scope.deleteVinyl = function(FBID, mbid){
	      filteredforOwned.forEach(function(item, index) {
	      if (item.mbid == mbid) {
	        console.log ("ITEM IS HERE", item);
	          item.owned = false;
	          item.wishlisted = false;
	    	FBFactory.deleteVinyl(FBID)
	    	.then( (response) => {
	    		getAllUserOwned();
	    	});
	    }
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


   //  $scope.findMatchingMBIDforWishlist = function(IDfromDispVinylhtml) {
	  //   console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
	  //   console.log ("filteredforOwned", filteredforOwned);
	  //   filteredforOwned.forEach(function(item, index) {
	  //   	console.log("LOOKIE", item.mbid, IDfromDispVinylhtml);
	  //     if (item.mbid == IDfromDispVinylhtml) {
	  //       console.log ("ITEM IS HERE", item);
	  //         item.wishlisted = true;
	  //         item.owned = false;
	  //         delete item.$$hashKey;
	  //       // console.log("You Chose:", item);
	  //         FBFactory.editVinyl(item.firebaseID, item)
	  //         .then( (response) => {
   //        			getAllUserOwned();
   //    		});    
	  //    }
	  //  });
  	// };





	getAllUserOwned();

});