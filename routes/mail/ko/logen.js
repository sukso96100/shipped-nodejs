// http://www.ilogen.com/mobile/trace_r.asp?gubun=slipno&value1=21634256641

var request = require('request');
var buffer = require('buffer').Buffer;
var iconv  = require('iconv').Iconv;
var assert = require('assert');
var jsdom = require('jsdom');

// Logen Corporation

var startTask = function(res, postid){
  console.log("LOGEN : "+postid);
  var murl = "http://www.ilogen.com/mobile/trace_r.asp?gubun=slipno&value1="+postid;

  request({
  url: murl,
  encoding: 'binary',
  method: 'GET'},
  function (error, response, body){
    console.log("Res Received");

    if (!error && response.statusCode == 200) {

      var data = new buffer(body, 'binary');
      var converter = new iconv('euc-kr', 'UTF8');
      data = converter.convert(data).toString();
      console.log(data);

        jsdom.env( data, ["http://code.jquery.com/jquery.js"],
        function (err, window) {

          var status = [];
          window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(2) > tbody > tr")
            .each(function(index, element){
              //Create status array
              if(index>=2 && window.$( element ).children("td").length>=2){
                var item = {
                  "time" : window.$( element ).children("td:eq(0)").text(),
                  "location" : window.$( element ).children("td:eq(1)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                   + " - " + window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                };
                status.push(item);
              }
            });
          var sender = window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(1) > tbody > tr:eq(2) > td:eq(3)").text().toString();
          var receiver = window.$("tbody:eq(0) > tr:eq(2) > td > table:eq(1) > tbody > tr:eq(2) > td:eq(1)").text().toString();
          status.reverse();
          var jsondata = JSON.stringify({
            "postid": postid,
            "url":murl,
            "carrier": "로젠택배(Logen Corporation)",
            "sender": sender,
            "receiver": receiver,
            "status":status
          });
          res.send(jsondata);
          console.log("LOGEN - RESPONSE FOR "+ postid + " SENT");
        });
    }else{
      console.log(error);
      res.send(error);
    }
  });
}

module.exports = startTask;
