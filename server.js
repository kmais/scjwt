var express = require("express");
var app = express();
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var port = process.env.PORT || 5000;

// Serialize the token as a JWT

app.get("/jwt/:actSID/:apiSID/:SS/:room/:name", function (req, res) {
      //console.log("hello");
      //console.log(req.params);

      var ACCOUNT_SID = req.params.actSID;
      var API_KEY_SID = req.params.apiSID;
      var API_KEY_SECRET = req.params.SS;
      var ttl = '14400'

      var accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

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