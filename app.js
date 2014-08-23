var blessed = require('blessed')
  , http    = require('http')
  , screen  = blessed.screen();

var con      = {
  hostname:  "localhost",
  port:  5984,
  path: "/mp_db/_design/dbmp/_view/mps",
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
};

var list = blessed.list({
  parent: screen,
  width: '100%',
  height: '200',
  top: 0,
  left: 0,
  //align: 'center',
  fg: 'blue',
  border: {
    type: 'line'
  },
  selectedBg: 'green',
  // Allow key support (arrow keys + enter)
  keys: true
});


var cb = function(res) {
var data = "";
  res.setEncoding("utf8");
  res.on("data", function (d) {
      data += d;
  });

  res.on("end", function(){
    var li = [],
        rd = JSON.parse(data).rows;
    for(var i = 0; i < rd.length; i++){
      li.push(rd[i].value);
    }
    list.setItems(li);

    list.prepend(new blessed.Text({
      left: 2,
      content: ' select definition '
    }));

    // Select the first item.
    list.select(0);

    screen.render();
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


screen.key('q', function(ch, key) {
  return process.exit(0);
});
