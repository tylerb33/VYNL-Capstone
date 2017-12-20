"use strict";

app.controller("locatorCtrl", function($scope, $window, FBFactory, LastFMFactory, LocationFactory, userFactory){

	function initializeMap(lat, long) {
		let latitude = lat;
		let longitude = long;

		var mymap = L.map('mapid').setView([latitude, longitude], 13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    maxZoom: 18,
		    id: 'mapbox.streets',
		    accessToken: 'pk.eyJ1IjoidHlsZXJiMyIsImEiOiJjamF6Z3gwM3oxaHQ4MzJvOXhsZ3g3bDFlIn0.Jo7_JkWf41s181_JG0MCxQ'
		}).addTo(mymap);

		const createMarkersForMap = function(data) {
			console.log ("dattaaaa", data);
				data.forEach(function(singleStore) {
				let markerLatitude = singleStore.geometry.location.lat;
				let markerLongitude = singleStore.geometry.location.lng;
				
				L.marker([markerLatitude, markerLongitude]).addTo(mymap)
				     .bindPopup(`<strong>${singleStore.name}</strong>`);
				});
			};

		function getStores() {
			LocationFactory.getLocalRecordShops(latitude, longitude)
				.then((allLocalStores) => {
					createMarkersForMap(allLocalStores.results);
				});
		}

		getStores();
	}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log ("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    let latitude = position.coords.latitude; 
    let longitude = position.coords.longitude;
    initializeMap(latitude, longitude);
}



getLocation();

});
