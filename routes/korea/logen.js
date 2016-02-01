// http://www.ilogen.com/mobile/trace_r.asp?gubun=slipno&value1=21634256641

var jsdom = require('jsdom');

// Logen Corporation

var startTask = function(res, postid){
  // postid should be 13 digits
  // example : 1234567890123
  console.log("LOGEN : "+postid);
  var murl = "http://www.ilogen.com/mobile/trace_r.asp?gubun=slipno&value1="+postid;

  jsdom.env({
    url: murl, encoding: 'euc-kr',
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {

      var status = [];
      window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(2) > tbody > tr")
        .each(function(index, element){
          //Create status array
          if(index>=2 && window.$( element ).children("td").length>=2){
            var item = {
              "time" : window.$( element ).children("td:eq(0)").text(),
              "location" : window.$( element ).children("td:eq(1)").text() + " - " + window.$( element ).children("td:eq(2)").text()
            };
            status.push(item);
          }
        });
      var sender = window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(1) > tbody > tr:eq(2) > td:eq(3)").text().toString();
      var receiver = window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(1) > tbody > tr:eq(2) > td:eq(1)").text().toString();
      var jsondata = JSON.stringify({
        "postid": postid,
        "url":url,
        "carrier": "로젠택배(Logen Corporation)",
        "sender": sender,
        "receiver": receiver,
        "status":status
      });
      res.send(jsondata);
      console.log("LOGEN - RESPONSE FOR "+ postid + " SENT");
    }
  });


}

module.exports = startTask;
