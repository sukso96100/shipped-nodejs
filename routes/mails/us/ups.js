var jsdom = require('jsdom');

// UPS

var startTask = function(res, postid, i18n){

  console.log("UPS : "+postid);
  var url = "https://wwwapps.ups.com/WebTracking/track?track=yes&loc="+i18n+"&trackNums="+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var elementnav = "#fontControl > fieldset > div.appBody > fieldset > div > fieldset > ";
    var statusnav = elementnav + "div.seccol18 > div:eq(1) > fieldset > div.secBody > table > tbody > tr";
    var status = [];
    window.$(statusnav)
      .each(function(index, element){
        //Create status array
        if(index>=1){
          var item = {
            "time" : window.$( element ).children("td:eq(1)").text() + " " + window.$( element ).children("td:eq(2)").text(),
            "location" : window.$( element ).children("td:eq(0)").text() + " - " + window.$( element ).children("td:eq(3)").text()
          };
          status.push(item);
        }
      });
    var receivernav = elementnav + "div.seccol6 > fieldset > div.secBody > dl > dd > strong";
    var receiver = window.$(sendernav).text().toString();
    status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "UPS",
      "sender": "",
      "receiver": receiver,
      "status":status
    });
    res.send(jsondata);
    console.log("UPS - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
