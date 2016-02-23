// 9405510200829925559426
var jsdom = require('jsdom');

// USPS

var startTask = function(res, postid){

  console.log("USPS : "+postid);
  var url = "https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum="+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var status = [];
    window.$("#tc-hits > tbody > tr")
      .each(function(index, element){

        //Create status array
        if(index!=1){
          var item = {
            "time" : element.querySelector("td.date-time > p").innerHTML.replace(/\t+/g, "").replace(/\n+/g, "").replace(/<(?:.|\n)*?>/gm, ''),
            "location" : element.querySelector("td.location > p").innerHTML.replace(/\t+/g, "").replace(/\n+/g, "").replace(/<(?:.|\n)*?>/gm, '')
            + " - " + element.querySelector("td.status > p").innerHTML.replace(/\t+/g, "").replace(/\n+/g, "").replace(/<(?:.|\n)*?>/gm, '')
          };
          status.push(item);
        }
      });
    // status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "USPS",
      "sender": "",
      "receiver": "",
      "status":status
    });
    res.send(jsondata);
    console.log("USPS - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
