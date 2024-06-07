// index.js
// where your node app starts

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

app.get('/api/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp;

  // Check if the timestamp is a valid Unix time in milliseconds
  if (!isNaN(timestamp)) {
    const date = new Date(Number(timestamp));
    if (date.toString() !== 'Invalid Date') {
      return res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }

  // Check if the timestamp is a valid date string
  const date = new Date(timestamp);
  if (date.toString() !== 'Invalid Date') {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }

  // If the input is not valid
  res.json({ error: 'Invalid Date' });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
