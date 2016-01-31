var startTask = function(res, postid){
  console.log("KOREAPOST_DOMESTIC : "+postid);
  var url = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1="+postid;
  res.send('koreapost_domestic');
}

module.exports = startTask;
