"use strict";

app.controller("navCtrl", function($scope, $window, userFactory){
  
  // $scope.searchText = filterFactory;
	$scope.isLoggedIn = false;

	$scope.logout = () => {
    	userFactory.logOut();
  	};

  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      console.log("user is in the authStateChanged");
      $scope.isLoggedIn = true;
      console.log("currentUser logged in?", user);
      console.log("logged in t-f", $scope.isLoggedIn );
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/";
    }
  });
	
  $scope.searchLastFM = function(artistSearch) {
    console.log ("user search", artistSearch);

  };
});