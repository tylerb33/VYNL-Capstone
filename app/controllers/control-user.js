"use strict";
app.controller("userCtrl", function($scope, $window, userFactory, $location) {
  console.log("User Control Loaded");

//This creates the authentication for the webpage. It pulls in the authentication data from firebase and checks if the user is logged in or out. 

  let logout = () => {
        console.log("logout clicked");
        userFactory.logOut()
          .then(function () {
            console.log("logged out");
            $location.href = "#!/";
          }, function (error) {
            console.log("error on logout");
          });
    };

  $scope.loginGoogle = () => {
    console.log("Google Login");

    userFactory.authWithProvider()
    .then((result) => {
      let user = result.user.uid;
      $location.path('/usercollection');
      $scope.$apply();
    }).catch((error) => {
      console.log("Google Login Error");
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Error:", errorCode, errorMessage);
    });
  };


});
  // $scope.account = {
 //    email: "",
 //    password: ""
 //  };
//not planning to allow users to register currently
    // $scope.register = () => {
    //  console.log("you clicked on register");
    //  userFactory.register({
    //    email: $scope.account.email,
    //    password: $scope.account.password
    //  })
    //  .then((userData) => {
    //    console.log("User controller newUser", userData);
    //    $scope.logIn();
    //  }, (error) => {
    //    console.log("error creating new user", error);
    //  });
    // };
    
//not planning to allow users to register currently
    // $scope.logIn = () => {
    //  userFactory.logIn($scope.account)
    //  .then( () => {
    //    $window.location.href = "#!/task-list";
    //  });
    // };


  //when first loaded, make sure no one is logged in
  // // console.log("what is this?", userFactory.isAuthenticated());
  // if (userFactory.isAuthenticated()) 
  //   logout();
  
// console.log("app isAuth", isAuth());
//   if (isAuth()){
//     console.log("app isAuth", isAuth());
//   }

