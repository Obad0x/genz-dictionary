const ejs = require('ejs');
const axios = require('axios');
const express = require('express')
const app = express();


app.set('view engine', 'ejs')

 app.get('/', console.get)



axios.get('https://emoji-api.com/emojis?search=computer&access_key=1c4c0ffde8b70c09dcd1e312b142f224bbc8b384')
  .then(function (response) {
    // handle success
    const data = response.data ;
    const emojidata = data.map(item => item.slug)
    const character = data.map(item => item.character)


    app.get ('/', (req,res)=>{})
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log('failed')
  })
  
app.listen(3000, console.log('the server is live'))


