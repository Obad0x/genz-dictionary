require('dotenv').config()
 const express = require('express');
 const Emojis = require ('./Emojifacts')
 const app = express();
const port = process.env.PORT;
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey : process.env.API_KEY
})

const openai = new OpenAIApi(configuration)




app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('public'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.render('index')
})

app.get('/emoji', (req, res) => {
  res.render('emoji', { title : "emoji"})
})


// POST request searching for the emoji
app.post('/emoji', (req, res) => {


  // storing the search query  in an emoji variable
  let emoji = req.body.emoji;

  // declared a variable for the result or the output

  let result;

  // using a foreach loop to loop through checking if the emoji eexist
Emojis.Emojifacts.forEach(element => {
      if(element.emoji === emoji){
        result = element;
      }
});

if (result){
  return res.render('emoji', { title : "emoji" , data : result})
}

return res.status(404).json({
  sucess : false, 
  data : `No data exist for this emoji ${emoji}`
})

});



app.get('/slangs', (req, res)=>{
  res.render('slangs', { title : "slangs"})
})

 app.post('/slangs', async (req, res)=>{
  
  

      
      let slang = req.body.slang;

      const response = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt":  `what those this slang stand for ${slang}`,
        "max_tokens": 20,
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "logprobs": null,
        
      }
      )
      console.log(response.data)
      return res.render('slangs', { title: "Slang Meaning", slang: slang, result: response });
 

      
})


 app.listen(port, (req, res)=>{
  console.log(`gen-z dictionary is live on the server on port ${port}`)
})

console.log(port)