"use strict";

app.controller("wishlistCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){


	const getAllUserWishlist = function(UID) {
		let useridgoeshere = userFactory.getCurrentUser();
		FBFactory.getAllVinyl(useridgoeshere)
		.then((arrayOfCustomVinylObjects) => {
			console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
			$scope.arrayOfCustomVinylObjects = arrayOfCustomVinylObjects;
		});
	};

	$scope.deleteVinyl = function(FBID){
    	FBFactory.deleteVinyl(FBID)
    	.then( (irrelevant) => {
    		// FBFactory.showAllTasks();
    	});
    };





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