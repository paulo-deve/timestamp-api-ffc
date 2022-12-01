// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {
  const { date } = req.params

  const dateRegex = /\d{5,}/

  if (dateRegex.test(date)) {
    const dateInt = parseInt(date)
    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() })
  }

  const newDate = new Date(date ? date : Date.now())

  if (newDate.toString() === 'Invalid Date') {
    return res.json({
      error: 'Invalid Date'
    })
  }

  return res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString()
  })
})

app.get('/api', (req, res) => {
  const newDate = new Date(Date.now())

  return res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString()
  })
})

// listen for requests :)E
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
