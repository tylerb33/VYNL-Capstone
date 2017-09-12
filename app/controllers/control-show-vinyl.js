"use strict";

app.controller("showVinylCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){


  let vinylFromLastFM = [];
  $scope.arrayOfCustomVinylObjects = [];

  // The below function queries the LastFM API, takes all ~50 resulting objects.

  $scope.searchLastFM = function(userInput) {
    LastFMFactory.getLastFMvinyl(userInput)
    .then((APIvinyl) => {
      vinylFromLastFM = APIvinyl.results.albummatches.album;
      vinylFromLastFM.forEach(function(item, index) {
        $scope.buildVinylObj(item);
      });
      // console.log ("APIvinyl", APIvinyl.results.albummatches.album);

    });
  };




// The below looks to see if a vinyl has an image. If it doesn't, then it will not have an object built for it and will not be printed to the page.

  $scope.buildVinylObj = function(singleRecord) {

    if (singleRecord.image[3]['#text'] !== "") {
      let currentUserID = userFactory.getCurrentUser();
      console.log ("currentUserID", currentUserID);
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
          uid: currentUserID // include uid to the object only if a user is logged in.
      };
      $scope.arrayOfCustomVinylObjects.push(vinylObj);
    }
      console.log ("arrayOfCustomVinylObjects", $scope.arrayOfCustomVinylObjects);
      
  };
});