

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204





// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




app.get('/api/:date?',(req,res) => {

  const params = req.params
  

  var date = new Date(params.date);

  if (params.date) {


    const isString = isNaN(parseInt(params.date))
    
    if (isString) {

      date = new Date(params.date)
      console.log(params.date)
    }
    else {
      if (params.date.length>10) {
        date = new Date(parseInt(params.date))
      } 
      else {
        date = new Date(params.date)
      }
    }
    

    
  } else {
    date = new Date(Date.now())
  }

  

  

  if (isNaN(date.getTime())) {
    res.json(
      { error : "Invalid Date" }
    )
  }
  else {
    res.json({
      unix:date.getTime(),
      utc:date.toUTCString()
    })
  }
  
  
})







// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
