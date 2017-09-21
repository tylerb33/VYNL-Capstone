"use strict";

app.controller("showVinylCtrl", function($scope, $window, FBFactory, LastFMFactory, LastFMService, userFactory){

$scope.LastFMService = LastFMService;

let buildVinylObj;

  let vinylFromLastFM = [];
  let arrayOfCustomVinylObjects = [];
  let searchResults = [];

  // The below function queries the LastFM API, takes all ~50 resulting objects.

  $scope.wishlistToTrue = function(album) {
    album.wishlisted = true;
    album.owned = false;
    // delete item.$$hashKey;
    console.log ("album", album);
    FBFactory.addVinyl(album);
  };

  $scope.ownedToTrue = function(album) {
    album.wishlisted = false;
    album.owned = true;
    // delete item.$$hashKey;
    console.log ("album", album);
    FBFactory.addVinyl(album);
  };

// Loops through the array of objects from search to find the one with matching MBID from click, which is passed in from the partial.


  $scope.findMatchingMBID = function(IDfromDispVinylhtml) {
    console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
    console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
    searchResults.forEach(function(item, index) {
      if (item.mbid == IDfromDispVinylhtml) {
          item.wishlisted = true;
        // console.log("You Chose:", item);
          FBFactory.addVinyl(item);
      }
    });
  };



// The below looks to see if a vinyl has an image. If it doesn't, then it will not have an object built for it and will not be printed to the page.

  buildVinylObj = function(singleRecord) {
      $scope.arrayOfCustomVinylObjects = [];


    if (singleRecord.image[3]['#text'] !== "" && singleRecord.mbid !== "") {
      let currentUserID = userFactory.getCurrentUser();
      // console.log ("currentUserID", currentUserID);
      //if vinyl record has an image, run the below
      let vinylObj = {
          //had to use bracket notation for #text since the hash is a special character, throws errors otherwise
          album_image: singleRecord.image[3]['#text'],
          album_link: singleRecord.url,
          album_name: singleRecord.name,
          artist_name: singleRecord.artist,
          firebaseID: "",
          mbid: singleRecord.mbid,
          owned: false,
          wishlisted: false,
          uid: currentUserID
      };
      arrayOfCustomVinylObjects.push(vinylObj);
    }    
      console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
      $scope.arrayOfCustomVinylObjects = arrayOfCustomVinylObjects;

  };

});
