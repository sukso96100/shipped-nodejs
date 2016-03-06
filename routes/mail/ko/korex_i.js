//http://ex.korex.co.kr:7004/fis20/KIL_HttpCallExpTrackingInbound_Ctr.do?rqs_HAWB_NO=433921252543
var jsdom = require('jsdom');

// CJ_KOREA_EXPRESS_INTERNATIONAL

var startTask = function(res, postid){

  console.log("CJ_KOREA_EXPRESS_INTERNATIONAL : "+postid);
  var url = "http://ex.korex.co.kr:7004/fis20/KIL_HttpCallExpTrackingInbound_Ctr.do?rqs_HAWB_NO="+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var status = [];
    window.$("div > table:eq(2) > tbody > tr")
      .each(function(index, element){
        //Create status array
        if(window.$( element ).children("td:eq(1)").text()!=""){
          var item = {
            "time" : window.$( element ).children("td:eq(1)").text(),
            "location" : window.$( element ).children("td:eq(0)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
          };
          status.push(item);
        }
      });
    status.reverse();
    var sender = window.$("div > table:eq(0) > tbody > tr:eq(1) > td:eq(0)").text();
    var receiver = window.$("div > table:eq(0) > tbody > tr:eq(3) > td:eq(0)").text();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "CJ대한통운 - 국제우편(CJ Korea Express - International Mails)",
      "sender": sender,
      "receiver": receiver,
      "status":status
    });
    res.send(jsondata);
    console.log("CJ_KOREA_EXPRESS_INTERNATIONAL - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
