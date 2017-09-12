"use strict";

app.factory("FBFactory", function($q, $http, FBCreds) {

	const getAllVinyl = function(user) {
		let vinylArray = [];
		return $q( (resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/vinyl.json?orderBy="uid"&equalTo="${user}"`)
            .then((itemObject) => {
                let itemCollection = itemObject.data;
                console.log("itemCollection", itemCollection);
                Object.keys(itemCollection).forEach((key) => {
                    itemCollection[key].id = key;
                    vinylArray.push(itemCollection[key]);
                });
                resolve(vinylArray);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

	const addVinyl = function() {

	};

	const getSingleVinyl = function() {

	};

	const deleteVinyl = function() {

	};

	const editVinyl = function() {

	};


	return {getAllVinyl, addVinyl, getSingleVinyl, deleteVinyl, editVinyl};

});



