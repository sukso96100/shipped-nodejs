var jsdom = require('jsdom');

var startTask = function(res, postid){
  // postid should be 13 digits
  // example : 1234567890123
  console.log("KOREAPOST_DOMESTIC : "+postid);
  var url = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1="+postid;
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var status = [];
    window.$("table.detail_off > tbody:eq(0) > tr")
      .each(function(index, element){
        var item = {
          "time" : window.$( element ).children("td:eq(0)").text() + " " + window.$( element ).children("td:eq(1)").text(),
          "location" : window.$( element ).children("td:eq(2)").text() + " - " + window.$( element ).children("td:eq(3)").text()
        };
        status.push(item);
      });

    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "우체국 - 국내우편(Korea Post - Domestic Posts)",
      "sender": window.$("tr:eq(1) > td:eq(1)").text(),
      "receiver": window.$("tr:eq(1) > td:eq(2)").text(),
      "status":status
    });
    res.send(jsondata);

  });
}

module.exports = startTask;
