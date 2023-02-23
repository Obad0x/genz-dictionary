const express = require('express');
const Router = express.Router();
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey : process.env.API_KEY
})
const bodyParser = require('body-parser');
const openai = new OpenAIApi(configuration)



Router.get('/emoji', (req, res) => {
    res.render('emoji', { title : "emoji"})
  })
  
  
  // POST request searching for the emoji
  Router.post('/emoji',async (req, res) => {
  
  
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
      res.send('please retry fatal error')
    })
  
  
  
  });

Router.get('/emojis', (req, res)=>{
    res.redirect('/emoji').status(302)
  })

  module.exports = Router;