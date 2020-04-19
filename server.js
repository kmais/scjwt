var express = require("express");
var app = express();
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var port = process.env.PORT || 5000;

var ACCOUNT_SID = "ACb117e5ba1426d34171d9b66bffa4f98c";
var API_KEY_SID = "SK7648e3c0a1a89553b51795101b52e4d6";
var API_KEY_SECRET = "edYdQeRZYZPb1gVyIuMHLHvBTJ8GmY35";

// Serialize the token as a JWT
/*

var ACCOUNT_SID = "ACb117e5ba1426d34171d9b66bffa4f98c";
var API_KEY_SID = "SK7648e3c0a1a89553b51795101b52e4d6";
var API_KEY_SECRET = "edYdQeRZYZPb1gVyIuMHLHvBTJ8GmY35";

*/

app.get("/jwt/:id/:room/:name", function (req, res) {
  console.log("hello");
  console.log(req.params);

  var accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, req.params.id);

  console.log(accessToken);

  // Set the Identity of this token
  accessToken.identity = req.params.name;

  // Grant access to Video
  var grant = new VideoGrant();
  grant.room = req.params.room;
  accessToken.addGrant(grant);
  console.log(accessToken);
  var jwt = accessToken.toJwt();
  //console.log(jwt);
  res.send(jwt);
});

app.listen(port, function () {
  console.log("Server up and Listening");
});
