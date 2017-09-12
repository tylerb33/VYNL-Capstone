"use strict";

const app = angular.module("VynlApp", ["ngRoute"]);

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landingpage.html',
		controller: 'userCtrl'
	})
	.when('/initial', {
		templateUrl: 'partials/displayvinyl.html',
		controller: 'showVinylCtrl',
		// resolve: {isAuth}
		//isAuth is missing some 'plumbing' to function completely
	})
	.otherwise('/');
});