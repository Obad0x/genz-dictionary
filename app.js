require('dotenv').config()
 const express = require('express')
 const app = express();
const port = process.env.PORT;
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey : process.env.API_KEY
})
const bodyParser = require('body-parser');

const openai = new OpenAIApi(configuration)




app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.render('index', {
    title : 'Select an option  below'
  })
})

app.get('/emojis', (req, res)=>{
  res.redirect('/emoji').status(302)
})







// _______________________________________________EMOJI ROUTES __________________________________________
app.get('/emoji', (req, res) => {
  res.render('emoji', { title : "emoji"})
})


// POST request searching for the emoji
app.post('/emoji',async (req, res) => {


  // storing the search query  in an emoji variable
  let emoji = req.body.emoji;


  const response = await openai.createCompletion({
    "model": "text-davinci-003",
    "prompt":  `what does this emoji stand for ${emoji}, if it has a special meaning also specify`,
    "max_tokens": 45,
    "temperature": 0,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
        
 
    
  }).then( response => {res.render('emoji', {text :response.data.choices[0].text, title : "emoji"})

                        })
  .catch((err)=>{
    console.log(err)
  })



});



// _________________________________________________END_____________________________________________________







// -----------------------------------------SLANG ROUTES ____________________________________________________________


// get request to ge the slang route
app.get('/slangs', (req, res)=>{
  res.render('slangs')
})




// post request to get post the data from the slang .ejs to the server
 app.post('/slangs', async (req, res)=>{
  
  

      // storing the slang in a variable
      let slang = req.body.slang;
     
      // OpenAi api initialization
      const response = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt":  `what those this slang stand for ${slang}`,
        "max_tokens": 20,
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "logprobs": null,
            
     
        
      }).then( response => {res.render('slangs', {text :response.data.choices[0].text})
    
                            })
      .catch((err)=>{
        console.log(err)
      })
      

      console.log(response.data)
      
      
      
    
      
          
       
 

      
    })


// _____________________________________________________________END ________________________________________


app.use((req, res)=>{
  res.send('404 , this page does not exist').status(404)
})
 app.listen(port, (req, res)=>{
  console.log(`gen-z dictionary is live on the server on port ${port}`)
})

console.log(port)