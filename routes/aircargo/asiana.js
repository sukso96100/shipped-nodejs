
var request = require('request');
var buffer = require('buffer').Buffer;
var iconv  = require('iconv').Iconv;
var assert = require('assert');
var jsdom = require('jsdom');
// var phantom=require('node-phantom');
// Asiana Cargo
//https://www.asianacargo.com/tracking/newAirWaybill.do?globalLang=Ko&Billno=05392682
//localhost, 127.0.0.0/8, ::1
var startTask = function(res, postid, i18n){
  console.log("Asiana Cargo : "+postid);
  var url = "https://www.asianacargo.com/tracking/newAirWaybill.do?globalLang="+i18n;
  var userurl = url+"&Billno="+postid;
  console.log(url);
  console.log(userurl);
  request({
  url: url,
  method: 'POST',
  body: 'prefix=988&Prefix=988&mawb='+postid+'&Billno='+postid,
  headers: {
    'Origin': 'https://www.asianacargo.com',
    'Referer': 'https://www.asianacargo.com/cargoContent.do?globalLang='+i18n,
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
          console.log(window.$("html").html());

          //Info 1
          var status = [];
          window.$("div#rst_view2_0 > div.scrollbox > div > table > tbody > tr")
            .each(function(index, element){
              //Create status array
              if(index==0){
                var time = window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "");
              }else {
                var time = window.$( element ).children("td:eq(4)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "");
              }
                var item = {
                  "time" : time,
                  "location" : window.$( element ).children("td:eq(0)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                    + " - " + window.$( element ).children("td:eq(1)").text()
                };
                status.push(item);
            });
            status.reverse();

            //Info 2
            var status1 = [];
            window.$("div#rst_view3_0 > div.scrollbox > div > table > tbody > tr")
              .each(function(index, element){
                //Create status array
                  var item = {
                    "time" : window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, ""),
                    "location" : window.$( element ).children("td:eq(0)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                      + " - " + window.$( element ).children("td:eq(1)").text()
                  };
                  status1.push(item);
              });

              for(var i=status1.length; i>0; i--){
                status.unshift(status1[i-1]);
              }

            var sender = window.$("div#new_track_step > div.point_off > h1").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "");
            var receiver = window.$("div#new_track_step > div.point_on2 > h1").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "");

            var jsondata = JSON.stringify({
              "postid": postid,
              "url":userurl,
              "carrier": "아시아나 항공 항공화물(Asiana Cargo)",
              "sender": sender,
              "receiver": receiver,
              "status":status
            });
            res.send(jsondata);
            console.log("ASIANA - RESPONSE FOR "+ postid + " SENT");
        });
    }else{
      res.send(error);
    }
  });
}

module.exports = startTask;
