var http     = require("http");
var con      = {
  hostname:  "localhost",
  port:  5984,
  path: "/mp_db/_design/dbmp/_view/mps",
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
};

var cb = function(res) {
var data = "";
  res.setEncoding("utf8");
  res.on("data", function (d) {
      data += d;
  });

  res.on("end", function(){
    console.log(JSON.parse(data));
  });

  res.on("error", function(e){
    console.log(e);
  });
};

var req = http.request(con, cb);
//
req.on("error", function(e) {
  console.log(e);
});
req.end();
