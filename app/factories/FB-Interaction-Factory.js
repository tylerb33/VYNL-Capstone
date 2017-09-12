"use strict";

app.factory("FBFactory", function($q, $http, FBCreds) {

	const getAllVinyl = function(user) {
		let vinylArray = [];
        return $q( (resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/vinyl.json?orderBy="uid"&equalTo="${user}"`)
            // console.log ("LOOK HERE", `${FBCreds.databaseURL}/vinyl.json?orderBy="uid"&equalTo="${user}"`)
            .then((itemObject) => {
                let itemCollection = itemObject.data;
                console.log("itemCollection", itemCollection);
                Object.keys(itemCollection).forEach((key) => {
                    itemCollection[key].firebaseID = key;
                    vinylArray.push(itemCollection[key]);
                });
                console.log("VINYLARRAY", vinylArray);
                resolve(vinylArray);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

	const addVinyl = function(newVinylObject) {

        return $q( (resolve, reject) => {
            $http.post(`${FBCreds.databaseURL}/vinyl.json`, newVinylObject)  
            .then( (data) => {
                console.log("data", data);
                resolve(data);
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
        });        
    };

	const getSingleVinyl = function(vinylFBID) {

        return $q( (resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/vinyl/${vinylFBID}.json`)  
            .then( (data) => {
                console.log("data", data);
                resolve(data);
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
        }); 
	};

	const deleteVinyl = function(vinylFBID) {
        return $q( (resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/vinyl/${vinylFBID}.json`)  
            .then( (data) => {
                console.log("data", data);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        }); 
	};


	const editVinyl = function(vinylFBID, editedVinylObject) {
        return $q( (resolve, reject) => {
            let stringyObject = JSON.stringify(editedVinylObject);
            $http.patch(`${FBCreds.databaseURL}/vinyl/${vinylFBID}.json`, stringyObject)  
            .then( (data) => {
                console.log("data", data);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        }); 
    };

	return {getAllVinyl, addVinyl, getSingleVinyl, deleteVinyl, editVinyl};
});



