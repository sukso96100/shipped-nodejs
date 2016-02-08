

var jsdom = require('jsdom');
var request = require('request');

// ECMS Express
var startTask = function(res, postid, i18n){
    console.log("ECMS_EXPRESS : "+postid);
    var url = "https://www.ecmsglobal.com/oms/showtracking?lang=" + i18n + "&trackingno="+postid;
    request({
    "rejectUnauthorized": false,
    "url": url,
    "method": "GET"}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        jsdom.env( body, ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          var status = [];
          console.log(window.$("html").html());
          window.$("dl.trackList > dd")
            .each(function(index, element){
              //Create status array
              if(index>=1){
                var item = {
                  "time" : window.$( element ).children("div.location > div.t").text(),
                  "location" : window.$( element ).children("div.location > div.w").text() + " - " + window.$( element ).children("div.n").text()
                };
                status.push(item);
              }
            });
            var jsondata = JSON.stringify({
              "postid": postid,
              "url":url,
              "carrier": "ECMS Express(APEX)",
              "sender": "",
              "receiver": "",
              "status":status
            });
            res.send(jsondata);
            console.log("ECMS_EXPRESS - RESPONSE FOR "+ postid + " SENT");
        });
    }else{
      res.send(error);
    }
  })
}

module.exports = startTask;
