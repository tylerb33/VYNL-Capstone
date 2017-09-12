"use strict";

const app = angular.module("VynlApp", ["ngRoute"]);

//This checks to see if the user is logged in, isAuth sets a true of false variable that will be used to check if the route is okay. 
let isAuth = (userFactory) => new Promise ((resolve, reject) => {
	console.log("This is the userFactory", userFactory);
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log("Authentication Worked!");
			resolve();
		}else {
			console.log("Authentication Didn't Work.");
			reject();
		}
	});
});


//This sets up what is viewable in ng-view, the resolve {isAuth} checks to see if isAuth is true (user logged in) so you can access that view on the main html page and the controller allows that html partial to use one of the controllers.
app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landingpage.html',
		controller: 'userCtrl'
	})
	.when('/initial', {
		templateUrl: 'partials/displayvinyl.html',
		controller: 'showVinylCtrl',
		resolve: {isAuth}
		//isAuth is missing some 'plumbing' to function completely
	})
	.when('/wishlist', {
		templateUrl: 'partials/displayvinyl.html',
		controller: 'wishlistCtrl',
		resolve: {isAuth}
	})
	.when('/edit/:vinylId', {
		templateUrl: 'partials/editvinyl.html',
		controller: 'editCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

//separates your firebase credentials and calls it. 
app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});