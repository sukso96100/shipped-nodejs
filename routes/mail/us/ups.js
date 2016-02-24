var jsdom = require('jsdom');
var request = require('request');
// UPS

var startTask = function(res, postid, i18n){

  console.log("UPS : "+postid);
  var I18N = i18n;
  if(i18n==undefined||i18n==""){
    I18N = "en_us"
  }
  var url = "http://wwwapps.ups.com/WebTracking/detail?tracknum="+postid+"&loc="+I18N;




  request({
  "rejectUnauthorized": false,
  "url": url,
  "method": "GET"}, function (error, response, body) {
    // console.log(body);
  if (!error && response.statusCode == 200) {
      jsdom.env( body, ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        // console.log(window.$("table.dataTable > tbody").text());
        var status = [];
        window.$("table.dataTable > tbody > tr")
          .each(function(index, element){
            console.log(element.innerHTML);
            console.log(index);
            //Create status array
            // if(index!=0){

              var item = {
                "time" : window.$( element ).children("td:eq(1)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                + " " + window.$( element ).children("td:eq(2)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, ""),
                "location" : window.$( element ).children("td:eq(0)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
                + " - " + window.$( element ).children("td:eq(3)").text().replace(/(<(?:.|\n)*?>)|\t+|\n+/g, "")
              };
              status.push(item);
            // }
          });
        // status.reverse();
        var jsondata = JSON.stringify({
          "postid": postid,
          "url":url,
          "carrier": "UPS",
          "sender": "",
          "receiver": "",
          "status":status
        });
        res.send(jsondata);

      });
  }else{
    res.send(error);
  }
  })




  // jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  // function (err, window) {
  //
  //   console.log("UPS - RESPONSE FOR "+ postid + " SENT");
  // });


}

module.exports = startTask;
