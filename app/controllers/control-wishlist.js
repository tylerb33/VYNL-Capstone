"use strict";

app.controller("wishlistCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){

  let vinylFromLastFM = [];
  let currentArray = [];


	const getAllUserWishlist = function(UID) {
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

  $scope.findMatchingMBIDforOwned = function(IDfromDispVinylhtml) {
    console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
    console.log ("currentArray", currentArray);
    currentArray.forEach(function(item, index) {
      if (item.mbid == IDfromDispVinylhtml) {
        console.log ("ITEM IS HERE", item);
          item.owned = true;
          item.wishlisted = false;
          delete item.$$hashKey;
        // console.log("You Chose:", item);
          FBFactory.editVinyl(item.firebaseID, item);
      }
    });
  };


	getAllUserWishlist();

});

$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 10000
    });
    $('.fdi-Carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });
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