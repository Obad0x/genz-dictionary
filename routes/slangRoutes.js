const express = require('express')
const Router = express.Router();
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey : process.env.API_KEY
})

const openai = new OpenAIApi(configuration)



Router.get('/slangs', (req, res)=>{
    res.render('slangs', {title : "slang"})
  })
  
  
  
  
  // post request to get post the data from the slang .ejs to the server
   Router.post('/slangs', async (req, res)=>{
    
    
  
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
              
       
          
        }).then( response => {res.render('slangs', {text :response.data.choices[0].text, title : "slang"}) })
        .catch((err)=>{
          console.log(err)
          res.send('please retry')
        })
        
  
        
      })
  
      module.exports = Router;