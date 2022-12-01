const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {

  const { date } = req

  console.log(date)

  const newDate = new Date(date)

  if (newDate.toString() === 'Invalid Data') {
    return res.json({
      error: 'Invalid Date'
    })
  }

  return res.json({
    unix: newDate.getTime(),
    utc: newDate.toString()
  })
})