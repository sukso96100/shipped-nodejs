

var jsdom = require('jsdom');

// KOrea Post - Domestic Posts

var startTask = function(res, postid, langcode){
  // postid should be 13 digits
  // example : 1234567890123
  console.log("ECMS_EXPRESS : "+postid);
  var url = "www.ecmsglobal.com/oms/showtracking?lang=" + langcode + "&trackingno="+postid;
  console.log(url);
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var status = [];
    window.$("dl.trackList > dd")
      .each(function(index, element){
        //Create status array
        if(index>=1){
          var item = {
            "time" : window.$( element ).children("div:eq(2) > div.t").text(),
            "location" : window.$( element ).children("div:eq(2) > div.w").text() + " " + window.$( element ).children("div:eq(1)").text()
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
}

module.exports = startTask;
