# VYNL
An easy way to track your vinyl collection, as well as keep track of vinyl to keep searching for!

## Getting Started

Follow the below to get this app up and running on your machine.

1. Clone this repo
2. Cd into the Lib file, 'then NPM install'
3. Create a directory within App named 'Values'. Within this folder create a folder named 'fb-creds.js'
4. In the fb-creds.js file, paste in the below, plugging in firebase credentials specific to your database:

```
app.constant("FBCreds", {
    apiKey: "YOUR API KEY",
    authDomain: "YOUR AUTH DOMAIN",
    databaseURL: "YOUR DATABASE URL"
});
```
