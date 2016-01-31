var jsdom = require('jsdom');

var startTask = function(res, postid){
  console.log("KOREAPOST_DOMESTIC : "+postid);
  var url = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1="+postid;
  jsdom.env(
  url,
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var jsondata = JSON.stringify({
      "postid": postid,
      "carrier": "우체국 - 국내우편(Korea Post - Domestic Posts)",
      "sender": window.$("tr:eq(1) > td:eq(1)").text(),
      "receiver": window.$("tr:eq(1) > td:eq(2)").text()
    });
    res.send(jsondata);

  }
);




}

module.exports = startTask;
