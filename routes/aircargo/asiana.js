
var jsdom = require('jsdom');
var phantom = require('phantom');
// var phantom=require('node-phantom');
// Asiana Cargo
//https://www.asianacargo.com/tracking/newAirWaybill.do?globalLang=Ko&Billno=05392682
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

             //Complete then Submit Form
        page.evaluate(function () {
            
           goaction3(document.frm01)
            return;
            // Fill the Form
            // for (i=0; i < arr.length; i++) { 
            //     if (arr[i].getAttribute('method') == "POST") {

            //     arr[i].elements["email"].value="mylogin";
            //     arr[i].elements["password"].value="mypassword";
            //     return;
            //     }
            // }
                       
        });
        });
     
      });
    });
  });





}

module.exports = startTask;
