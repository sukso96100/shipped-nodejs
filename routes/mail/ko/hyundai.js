// http://global.e-hlc.com/htdocs/HOM/BTOC/tracking.jsp?DvlInvNo=6024682808557
//http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo=6024682808557
var request = require('request');

var jsdom = require('jsdom');
var phantom = require('phantom');
// KOrea Post - Domestic Posts

var startTask = function(res, postid){
  // postid should be 13 digits
  // example : 1234567890123
  console.log("HYUNDAI : "+postid);
  var url = "http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo="+postid;
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        console.log(status);
        page.property('content').then(function(content) {
          console.log(content);


          jsdom.env( content, ["http://code.jquery.com/jquery.js"],
          function (err, window) {
    var status = [];
    window.$("table.table_02:eq(1) > tbody > tr")
      .each(function(index, element){
        //Create status array
        if(index>0){
          var item = {
            "time" : window.$( element ).children("td:eq(0)").text()
            + " " + window.$( element ).children("td:eq(1)").text(),
            "location" : window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
            + " - " + window.$( element ).children("td:eq(3) > p").text()
          };
          status.push(item);
        }
      });
    var sender = window.$("tbody.inp_01 > tr.top > td > div > span:eq(0)").text();
    var receiver = window.$("tbody.inp_01 > tr.bot > td > div > span:eq(0)").text();

    status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "현대택배(Hyundai Logistics)",
      "sender": sender,
      "receiver": receiver,
      "status":status
    });
    res.send(jsondata);
    console.log("HYUNDAI - RESPONSE FOR "+ postid + " SENT");
  });

  page.close();
  ph.exit();
});
});
});
});



}
module.exports = startTask;
