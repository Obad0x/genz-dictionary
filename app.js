require('dotenv').config()
 const express = require('express')
 const app = express();
const port = process.env.PORT;
const emojiRoutes = require('./routes/emojiRoutes');
const SlangRoutes = require('./routes/slangRoutes')
const bodyParser = require('body-parser');
// creating new instance of the OpenAIApi routes


// View enginen
app.set('view engine', 'ejs');
// set the views folder
app.set('views', './views')
// setting the Public Folder
app.use(express.static('public'))
// using express.json to handle incoming request
app.use(express.json())
// parsing incoming json object
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
// get the / route which is the main route
app.get('/', (req, res) => {

  res.render('index', {
    title : 'Select an option  below'
  })
})


// middleware to get the emoji routes 
app.use(emojiRoutes);

// middleware to get the emoji routes
app.use(SlangRoutes);


// middle ware to handle 404 request
app.use((req, res)=>{
  res.send('404 , this page does not exist').status(404)
})


// server listening for request on the given PORT
 app.listen(port, (req, res)=>{
  console.log(`gen-z dictionary is live on the server on port ${port}`)
})

console.log(port)