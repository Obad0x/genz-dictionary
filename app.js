const express = require('express');
const app = express();

app.get('/', (req, res) => {

  res.render('index')
})

app.get('/emoji', (req, res) => {
  res.render('emoji')
})

app.post('/emoji', (req, res) => {


})


app.get('/slangs', (req, res) => {
  res.render('slangs');
})