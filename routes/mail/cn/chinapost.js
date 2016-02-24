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





  //
  //
  //
  // phantom.create(function(err,ph) {
  //   return ph.createPage(function(err,page) {
  //     return page.open(url, function(err,status) {
  //       console.log("opened site? ", status);
  //       page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
  //         //jQuery Loaded.
  //         //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
  //         setTimeout(function() {
  //           return page.evaluate(function() {
  //             //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
  //             // var h2Arr = [],
  //             // pArr = [];
  //             // $('h2').each(function() {
  //             //   h2Arr.push($(this).html());
  //             // });
  //             // $('p').each(function() {
  //             //   pArr.push($(this).html());
  //             // });
  //
  //             var status = [];
  //             $("table > tbody > tr")
  //               .each(function(index, element){
  //
  //                 //Create status array
  //                   var item = {
  //                     "time" : $( element ).children("td:eq(1)").text(),
  //                     "location" : $( element ).children("td.(2))").text().replace(/<(?:.|\n)*?>/g, "")
  //                   };
  //                   status.push(item);
  //
  //               });
  //             status.reverse();
  //             var jsondata = JSON.stringify({
  //               "postid": postid,
  //               "url":url,
  //               "carrier": "中国邮政(China Post)",
  //               "sender": "",
  //               "receiver": "",
  //               "status":status
  //             });
  //             res.send(jsondata);
  //             console.log("China Post - RESPONSE FOR "+ postid + " SENT");
  //
  //
  //             return jsondata;
  //           }, function(err,result) {
  //             console.log(result);
  //             ph.exit();
  //           });
  //         }, 5000);
  //       });
  // 	});
  //   });
  // });


    // request({
    // "url": url,
    // "method": "GET"}, function (error, response, body) {
    //   // console.log(body);
    // if (!error && response.statusCode == 200) {
    //   console.log(body);
    //   res.send(body);
    // }else{
    //   res.send(error);
    // }
    // })



  //
  //
  // jsdom.env( url, ["http://code.jquery.com/jquery.js"],
  // function (err, window) {
  //   var status = [];
  //   window.$("table > tbody > tr")
  //     .each(function(index, element){
  //
  //       //Create status array
  //         var item = {
  //           "time" : window.$( element ).children("td:eq(1)").text(),
  //           "location" : ewindow.$( element ).children("td.(2))").text().replace(/<(?:.|\n)*?>/g, "")
  //         };
  //         status.push(item);
  //
  //     });
  //   status.reverse();
  //   var jsondata = JSON.stringify({
  //     "postid": postid,
  //     "url":url,
  //     "carrier": "中国邮政(China Post)",
  //     "sender": "",
  //     "receiver": "",
  //     "status":status
  //   });
  //   res.send(jsondata);
  //   console.log("China Post - RESPONSE FOR "+ postid + " SENT");
  // });
}

module.exports = startTask;
