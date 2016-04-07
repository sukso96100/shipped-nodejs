//http://global.e-hlc.com/htdocs/HOM/BTOC/tracking.jsp?DvlInvNo=6024682808557
//http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo=6024682808557
//http://www.hlc.co.kr/open/tracking?invno=6024682808557
//http://www.hlc.co.kr/companyService/tracking/06/tracking_goods_result.jsp
var request = require('request');
var buffer = require('buffer').Buffer;
var iconv  = require('iconv').Iconv;
var assert = require('assert');
var jsdom = require('jsdom');
// Hyundai Logistics - Domestic Posts

var startTask = function(res, postid){

  console.log("HYUNDAI : "+postid);
  console.log("Sending POST Request");
  // url for user
  var url = "http://www.hlc.co.kr/open/tracking?invno="+postid;
  //url for data parsing
  var url2 = "http://global.e-hlc.com/servlet/Tracking_View_DLV_ALL";

  //Send POST Request
  request({
  url: url2,
  encoding: 'binary',
  method: 'POST',
  body: 'DvlInvNo='+postid,
  headers: {
    'Origin': 'http://global.e-hlc.com',
    'Referer': 'http://global.e-hlc.com/htdocs/HOM/BTOC/hdcm_tracing.jsp',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
 },
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
          console.log(window.$("html").html());
          window.$("div.mat_30:eq(1) > table > tbody > tr")
            .each(function(index, element){
              //Create status array
              if(index>=1){
                var time = window.$( element ).children("td:eq(0)").text().toString()
                + " " + window.$( element ).children("td:eq(1)").text().toString();
                var location = window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                + "-" + window.$( element ).children("td:eq(3)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "");
                var item = {
                  "time" : time,
                  "location" : location
                };
                status.push(item);
              }
            });
            var sender = window.$("tbody.inp_01 > tr.top > td:eq(0) > div.tgr_box > span.mid_span").text().toString();
            var receiver = window.$("tbody.inp_01 > tr.bot > td:eq(0) > div.tgr_box > span.mid_span").text().toString();
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
    }else{
      res.send(error);
    }

  });


}
module.exports = startTask;
