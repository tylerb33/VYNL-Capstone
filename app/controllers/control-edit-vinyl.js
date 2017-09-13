"use strict";

// there will be a 'display' function that will load a single vinyl and populate the edit form. 
// then a submit function will send that filled out form/object into Firebase, along with its Firebase ID... with a Patch method
app.controller("editCtrl", function($scope, $window, $routeParams, $location, userFactory, FBFactory){

$scope.headerText = "Edit Vinyl";
$scope.buttonText = "Submit Edit";

	$scope.album = {
		artist_name: "",
		album_name: "",
		album_image: ""
	};

const showEditValues = function(){
    	FBFactory.getSingleVinyl($routeParams.vinylId)
    	.then((objectOfSelectedVinyl) => {
    		console.log("data for vinyl you clicked", objectOfSelectedVinyl);
    		$scope.album = objectOfSelectedVinyl.data;
    		$scope.album.firebaseID = $routeParams.vinylId;
    	});
    };

$scope.submitVinyl = function() {
    FBFactory.editVinyl($routeParams.vinylId, $scope.album)
        .then( (data) => {
            $location.path("#!/initial");
        });
};


showEditValues();

});