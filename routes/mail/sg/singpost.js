// https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=691118437714

var jsdom = require('jsdom');

// CJ Korea Express

var startTask = function(res, postid){
  console.log("CJ_KOREA_EXPRESS_DOMESTIC : "+postid);
  var url = "http://beta.singpost.com/track-items"+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    if(err!=undefined){
      console.log(err);
    }
    var status = [];
    window.$("center > table:eq(6) > tbody > tr")
      .each(function(index, element){
        //Create status array
        if(index>=1){
          var item = {
            "time" : window.$( element ).children("td:eq(0)").text() + " " + window.$( element ).children("td:eq(1)").text(),
            "location" : window.$( element ).children("td:eq(2) > table > tbody > tr > td:eq(0)").text()
             + " - " + window.$( element ).children("td:eq(2) > table > tbody > tr > td:eq(1)").text()
            + " - " + window.$( element ).children("td:eq(3)").text()
          };
          status.push(item);
        }
      });
    var sender = window.$("center > table:eq(3) > tbody > tr:eq(1) > td:eq(0)").text();
    var receiver = window.$("center > table:eq(3) > tbody > tr:eq(1) > td:eq(1)").text();

    status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url": userurl,
      "carrier": "CJ 대한통운 - 국내우편(CJ Korea Express - Domestic Mails)",
      "sender": sender,
      "receiver": receiver,
      "status":status
    });
    res.send(jsondata);
    console.log("CJ_KOREA_EXPRESS_DOMESTIC - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
