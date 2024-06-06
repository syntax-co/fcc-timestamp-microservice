

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

  // functions
  const validDate = (date) => {
    return date.toUTCString() != 'Invalid Date'
  }

  const isInt = (date) => {
    return !isNaN(parseInt(date))
  }





  var date = new Date(req.params.date);

  if (req.params.date) {

    

    if (isInt(req.params.date) && !validDate(date)) {
      date = new Date(parseInt(req.params.date))
    } 


    if (!validDate(date)) {
      date = new Date(+req.params.date)
    }

    

    if (!validDate(date)) {
      res.json({error:'Invalid Date'})
    }


    else {
      res.json({
        unix:date.getTime(),
        utc:date.toUTCString()
      })
    }

  }
  else {
    res.json({
      unix:new Date().getTime(),
      utc: new Date().toUTCString()
    })
  }
  
  
})









// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
