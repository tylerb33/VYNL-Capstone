"use strict";

app.controller("addCtrl", function($scope, $routeParams, $location, userFactory, FBFactory){

$scope.headerText = "Create New Vinyl";
$scope.buttonText = "Add to Wishlist";

let currentUser = userFactory.getCurrentUser();

$scope.album = {
		artist_name: "",
		album_name: "",
		album_image: "",
		uid: currentUser,
		user_created: true,
		wishlisted: true,
		owned: false
	};


$scope.submitVinyl = function() {
	FBFactory.addVinyl($scope.album)
		.then((data) => {
			$location.url("/wishlist");
		});
	};

});

