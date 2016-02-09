// https://tracking.i-parcel.com/Home/Index?trackingnumber=AEIABE20018709571
var jsdom = require('jsdom');

// IPARCEL

var startTask = function(res, postid){

  console.log("IPARCEL : "+postid);
  var url = "https://tracking.i-parcel.com/Home/Index?trackingnumber="+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var elementnav = "div.table-responsive > ";
    var statusnav = elementnav + "table > tbody > tr";
    var status = [];
    window.$(statusnav)
      .each(function(index, element){
        //Create status array
        if(index>=1){
          var item = {
            "time" : window.$( element ).children("td:eq(1)").text(),
            "location" : window.$( element ).children("td:eq(4)").text() \
             + " " + window.$( element ).children("td:eq(3)").text() \
             + " " + window.$( element ).children("td:eq(2)").text() \
             + " " + window.$( element ).children("td:eq(0)").text()
          };
          status.push(item);
        }
      });
    var receivernav = elementnav + "strong:eq(1)";
    var receiver = window.$(sendernav).text().toString();
    status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "i-Parcel",
      "sender": "",
      "receiver": receiver,
      "status":status
    });
    res.send(jsondata);
    console.log("IPARCEL - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
