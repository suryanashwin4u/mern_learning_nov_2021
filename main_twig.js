const express = require('express');             //importing express module
const app = express();                          //creating an instance of express

//importing bodyParser in the file after installing its package
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/fake_folder_name',express.static('public'));       //defining virtual path for public folder name
app.set('view engine','twig');           //setting view engine 'pug'
app.set('views','./public/views');      //setting path of all the pug templates  




//rendering index.pug template in the views folder
app.get('/index-twig',(req,res)=>{
    res.render('index_twig',{ title:"twig template engine", message:"index_twig.twig called" });
});

// passing parameters using dash notation and showing sum
app.get('/:a,:b',(req,res)=>{                                 
    res.render('calc_twig',{ title:"twig template engine", message:"calc_twig.twig called", sum:parseInt(req.params.a)+parseInt(req.params.b), subtract:parseInt(req.params.a) - parseInt(req.params.b) , multiply:parseInt(req.params.a) * parseInt(req.params.b), divide:parseInt(req.params.a)/parseInt(req.params.b), remainder:parseInt(req.params.a) % parseInt(req.params.b)});
});

app.get('/form-twig',(req,res)=>{                                 
    res.render('form_twig',{ title:"twig template engine", message:"form_twig.twig called" });
});

app.post('/form-data-submit',(req,res)=>{
    res.render('form_data_twig',{ title:"twig template engine", message:"form_data_twig.twig called", email:req.body.email, password:req.body.password });
});

//listening on port 3000
app.listen(5000, () => {                        
    console.log('server listening on port 5000!');
});
  
