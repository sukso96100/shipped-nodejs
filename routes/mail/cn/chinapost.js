// http://intmail.11185.cn/zdxt/jsp/zhdd/gjyjgzcx/gjyjqcgzcx/yjqclz.jsp?vYjhm=RI904960008CN&validres=success&fromFlag=0&gngjFlag=1&ntdbz=0#

// 9405510200829925559426
var jsdom = require('jsdom');

// USPS

var startTask = function(res, postid){

  console.log("China Post : "+postid);
  var url = "http://intmail.11185.cn/zdxt/jsp/zhdd/gjyjgzcx/gjyjqcgzcx/yjqclz.jsp?vYjhm="+postid+"&validres=success&fromFlag=0&gngjFlag=1&ntdbz=0#";
  jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    var status = [];
    window.$("tbody > tr")
      .each(function(index, element){

        //Create status array
        if(index!=1){
          var item = {
            "time" : window.$( element ).children("td:eq(1)").text().replace(/<(?:.|\n)*?>/g, ""),
            "location" : ewindow.$( element ).children("td.(2))").text().replace(/<(?:.|\n)*?>/g, "")
          };
          status.push(item);
        }
      });
    status.reverse();
    var jsondata = JSON.stringify({
      "postid": postid,
      "url":url,
      "carrier": "中国邮政(China Post)",
      "sender": "",
      "receiver": "",
      "status":status
    });
    res.send(jsondata);
    console.log("China Post - RESPONSE FOR "+ postid + " SENT");
  });
}

module.exports = startTask;
