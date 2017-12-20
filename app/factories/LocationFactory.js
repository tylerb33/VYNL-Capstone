"use strict";

app.factory("LocationFactory", function($q, $http, lastFMcreds) {

	const getLocalRecordShops = function (latitude, longitude) {
		return $q((resolve, reject) => {
			$http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAT51fjRStRAoHkANPPmW5SoSSw4mvrHQI&location=${latitude},${longitude}&radius=5000&keyword=record+shop`)
            .then((response) => {
              console.log("getLocalRecordShops response: ", response);
              resolve(response.data);
        	});
		});
	};


	return {getLocalRecordShops};
});