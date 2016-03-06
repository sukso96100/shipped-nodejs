// http://intmail.11185.cn/zdxt/jsp/zhdd/gjyjgzcx/gjyjqcgzcx/yjqclz.jsp?vYjhm=RI904960008CN&validres=success&fromFlag=0&gngjFlag=1&ntdbz=0#

// 9405510200829925559426
var jsdom = require('jsdom');
var phantom = require('phantom');
// var phantom=require('node-phantom');
// USPS

var startTask = function(res, postid){

  console.log("China Post : "+postid);
  var url = "http://intmail.11185.cn/zdxt/jsp/zhdd/gjyjgzcx/gjyjqcgzcx/yjqclz.jsp?vYjhm="+postid+"&validres=success&fromFlag=0&gngjFlag=1&ntdbz=0#";

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        console.log(status);
        page.property('content').then(function(content) {
          console.log(content);

          jsdom.env( content.toString(), ["http://code.jquery.com/jquery.js"],
          function (err, window) {
            var status = [];
            window.$("table > tbody > tr")
              .each(function(index, element){
                console.log(element.innerHTML);
                console.log(index);
                //Create status array
                // if(index!=0){
                  var item = {
                    "time" : window.$( element ).children("td:eq(1)").text(),
                    "location" : window.$( element ).children("td:eq(2)").text().replace(/<(?:.|\n)*?>/g, "")
                  };
                  status.push(item);
                // }
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

          });

          page.close();
          ph.exit();
        });
      });
    });
  });





}

module.exports = startTask;
