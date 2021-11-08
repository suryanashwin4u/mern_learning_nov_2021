const express = require('express');             //importing express module
const app = express();                          //creating an instance of express

app.use('/fake_folder_name',express.static('public'));       //defining virtual path for public folder name
app.set('view engine','ejs');           //setting view engine 'pug'
app.set('views','./public/views');      //setting path of all the pug templates  

//rendering index.pug template in the views folder
app.get('/',(req,res)=>{
    res.render('index_ejs',{ title:"ejs template engine", message:"message passed inside ejs template" });
});

//listening on port 3000
app.listen(5000, () => {                        
    console.log('server listening on port 5000!');
});
  
