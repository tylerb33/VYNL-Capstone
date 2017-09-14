"use strict";

app.controller("ownedCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){

  let vinylFromLastFM = [];
  let currentArray = [];

	const getAllUserOwned = function(UID) {
		let useridgoeshere = userFactory.getCurrentUser();
		FBFactory.getAllVinyl(useridgoeshere)
		.then((arrayOfCustomVinylObjects) => {
			console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
			currentArray = arrayOfCustomVinylObjects;
			$scope.arrayOfCustomVinylObjects = arrayOfCustomVinylObjects;
		});
	};

	$scope.deleteVinyl = function(FBID, mbid){
	      currentArray.forEach(function(item, index) {
	      if (item.mbid == mbid) {
	        console.log ("ITEM IS HERE", item);
	          item.owned = false;
	          item.wishlisted = false;
	    	FBFactory.deleteVinyl(FBID)
	    	.then( (irrelevant) => {
	    		// FBFactory.showAllTasks();
	    	});
	    };
	  });
	};

    $scope.findMatchingMBIDforWishlist = function(IDfromDispVinylhtml) {
	    console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
	    console.log ("currentArray", currentArray);
	    currentArray.forEach(function(item, index) {
	      if (item.mbid == IDfromDispVinylhtml) {
	        console.log ("ITEM IS HERE", item);
	          item.wishlisted = true;
	          item.owned = false;
	          delete item.$$hashKey;
	        // console.log("You Chose:", item);
	          FBFactory.editVinyl(item.firebaseID, item);
	      }
	    });
  	};





	getAllUserOwned();

});