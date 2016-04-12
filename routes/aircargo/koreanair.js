//Korean Air Cargo
//http://cargo.koreanair.com/ecus/trc/servlet/TrackingServlet
//12345678
var prefix = "180";
var nav = "div#show_div > table > tbody > tr:eq(3) > td > table > tbody > tr \
 > td:eq(2) > table > tbody > tr > td:eq(0) > form > table > tbody > tr > td >";

var jsdom = require('jsdom');
var request = require('request');
var buffer = require('buffer').Buffer;
var iconv  = require('iconv').Iconv;
var assert = require('assert');
var startTask = function(res, postid, i18n){
  console.log("Korean Air Cargo : "+postid);
  var url = "http://cargo.koreanair.com/ecus/trc/servlet/TrackingServlet?menu1=m1&menu2=m01-1&version="+i18n;
  console.log(url);
  request({
  url: url,
  method: 'POST',
  body: 'awb_no='+prefix+postid+'&multiAwbNo='+prefix+postid+'&preAwbNo='+prefix+'&postAwbNo='+postid+'&version='+i18n+'&pid=5',
  headers: {
    'Origin': 'http://cargo.koreanair.com/',
    'Referer': 'http://cargo.koreanair.com/ecus/trc/servlet/TrackingServlet',
    'Content-Type': 'application/x-www-form-urlencoded'}
  },
  function (error, response, body){
    console.log("Res Received");

    if (!error && response.statusCode == 200) {

      // var data = new buffer(body, 'binary');
      // var converter = new iconv('euc-kr', 'UTF8');
      // data = converter.convert(data).toString();
      // console.log(data);
        console.log(body);
        jsdom.env( body, ["http://code.jquery.com/jquery.js"],
        function (err, window) {

          //Info 1
          var status = [];
          window.$(nav+"table:eq(9) > tbody > tr")
            .each(function(index, element){
              var condition = window.$( element ).children("td:eq(0)").text();

              //Create status array
              if(index>=1&&condition!="No Data!"){
                var item = {
                  "time" : window.$( element ).children("td:eq(2)").text()
                  + " " + window.$( element ).children("td:eq(3)").text(),
                  "location" : window.$( element ).children("td:eq(6)").text()
                  + " - " + window.$( element ).children("td:eq(1)").text()
                  + " - " + window.$( element ).children("td:eq(7)").text()
                };
                status.push(item);
              }
            });


            var sender = window.$(nav+"table:eq(5) > tbody > tr:eq(1) > td:eq(3)").text();
            var receiver = window.$(nav+"table:eq(5) > tbody > tr:eq(1) > td:eq(4)").text();

            var jsondata = JSON.stringify({
              "postid": postid,
              "url":url,
              "carrier": "대한항공 항공화물(Korean Air Cargo)",
              "sender": sender,
              "receiver": receiver,
              "status":status
            });
            res.send(jsondata);
            console.log("KOREANAIR - RESPONSE FOR "+ postid + " SENT");
        });
    }else{
      res.send(error);
    }
  });
}

module.exports = startTask;
