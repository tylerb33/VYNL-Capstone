"use strict";

app.controller("showVinylCtrl", function($scope, $window, FBFactory, LastFMFactory, userFactory){


  let vinylFromLastFM = [];
  let arrayOfCustomVinylObjects = [];


  // The below function queries the LastFM API, takes all ~50 resulting objects.

  $scope.searchLastFM = function(userInput) {
    LastFMFactory.getLastFMvinyl(userInput)
    .then((APIvinyl) => {
      // console.log ("APIvinyl", APIvinyl);
      vinylFromLastFM = APIvinyl.results.albummatches.album;
      vinylFromLastFM.forEach(function(item, index) {
        buildVinylObj(item);
      });
      // console.log ("APIvinyl", APIvinyl.results.albummatches.album);

    });
  };

// Loops through the array of objects from search to find the one with matching MBID from click, which is passed in from the partial.

  $scope.findMatchingMBID = function(IDfromDispVinylhtml) {
    console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);
    console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
    arrayOfCustomVinylObjects.forEach(function(item, index) {
      if (item.mbid == IDfromDispVinylhtml) {
        // console.log("You Chose:", item);
          FBFactory.addVinyl(item);
      }
    });
  };

    // console.log ("IDfromDispVinylhtml", IDfromDispVinylhtml);


// The below looks to see if a vinyl has an image. If it doesn't, then it will not have an object built for it and will not be printed to the page.

  const buildVinylObj = function(singleRecord) {

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
          uid: currentUserID // include uid to the object only if a user is logged in.
      };
      arrayOfCustomVinylObjects.push(vinylObj);
    }    
      console.log ("arrayOfCustomVinylObjects", arrayOfCustomVinylObjects);
      $scope.arrayOfCustomVinylObjects = arrayOfCustomVinylObjects;
  };
});