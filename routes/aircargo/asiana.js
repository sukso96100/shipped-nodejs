
var jsdom = require('jsdom');
var phantom = require('phantom');
// var phantom=require('node-phantom');
// Asiana Cargo
//https://www.asianacargo.com/tracking/newAirWaybill.do?globalLang=Ko&Billno=05392682
//localhost, 127.0.0.0/8, ::1
var startTask = function(res, postid, i18n){
  console.log("Asiana Cargo : "+postid);
  var url = "https://www.asianacargo.com/tracking/newAirWaybill.do?globalLang="+i18n+"&Billno="+postid;
  console.log(url);
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {

        // Open Asiana Cargo Main Page
      page.open(url).then(function(status) {
        console.log(status);
        page.property('content').then(function(status) {
          console.log("onLoadFinished");
          console.log("=======================================================")
          console.log(status);
          console.log("=======================================================")

          page.includeJs("//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js",
            function() {
              console.log("evaluating scripts... : Clicking form submit button");
              page.evaluate(function() {
                // document.getElementsByClassName("btn_big")[1];
                goaction3(document.frm01);
                // $(".btn_big:eq(1)").click();
              });
              console.log("sleep 5 sec");
              setTimeout(
                 function () {
                   console.log("5 sec passed");
                  //  page.render( 'google.png' );
                   phantom.exit(0);
                   console.log("5 sec passed");
                 },
                 5000 // wait 5,000ms (5s)
               );
            });
        });
      });
    });
  });
}

module.exports = startTask;
