const express = require('express');             //importing express module
const app = express();                          //creating an instance of express


//importing all-middleware.js file in this file
var all_middlewares = require('./all-middleware.js');
//using external middleware
app.use(all_middlewares({option1:'1',option2:'2'}));


app.use('/fake_path',express.static('public'));  //to use static files with virtual path as it is more secure


app.get('/get', (req, res) => {                 //using get method
    res.send('homepage access using get request through url');           //sending response to the client
});


app.post('/post', (req, res) => {               //using post method
  res.send('homepage access using post request through postman application');           //sending response to the client
});


app.get('/index', (req, res) => {                                                   //using get method
  res.sendFile( __dirname + '/index.html');     //sending response to the client
});


app.get('/get_variable_1/a/:var_a/b/:var_b', (req, res) => {                      //passing parameters using url get method
  res.send("showing variable passed through url: var_a = " + req.params.var_a + " , var_b = " + req.params.var_b); //showing url parameters on the client screen
});


// passing parameters when not necessery
app.get('/get_variable_2/a/:var_a?', (req, res) => { 
  if(req.params.var_a == undefined){
    res.send("parameter not passed");
  }else{
    res.send("use question mark if parameter is not mandatory: " + req.params.var_a); 
  }
});


// passing parameters using dash notation
app.get('/get_variable_3/:a-:b',(req,res)=>{                                 
  res.send("a = "+ req.params.a +" , b = "+ req.params.b);
});




// passing optional parameters using dash notation
app.get('/get_variable_4/:a?-:b?',(req,res)=>{                                 
  res.send("a = "+ req.params.a +" , b = "+ req.params.b);
});


// passing parameters using dot notation
app.get('/get_variable_5/:a.:b',(req,res)=>{                                 
  res.send("a = "+ req.params.a +" , b = "+ req.params.b);
});


// passing optional parameters using dot notation
app.get('/get_variable_6/:a?.:b?',(req,res)=>{                                 
  res.send("a = "+ req.params.a +" , b = "+ req.params.b);
});


// optional parameters are a or b or ab but cd is mandatory
app.get('/get_variable_7/a?b?cd',(req,res)=>{                                 
  res.send("a?b?cd");
});


// possible parameters abcd,abbcd,abbbcd 
app.get('/get_variable_8/ab+cd',(req,res)=>{                                 
  res.send("ab+cd");
});


// possible parameters abcd,abjasldjflacd 
app.get('/get_variable_9/ab*cd',(req,res)=>{                                 
  res.send("ab*cd but middle parameter is: " + req.params[0]);
});


// possible parameters abcd,abjasldjflacd 
app.get('/get_variable_10/ab(*)cd',(req,res)=>{                                 
  res.send("ab*cd but middle parameter is: " + req.params[0]);
});


// possible parameters are words ending with fly keyword 
app.get(/.*fly$/,(req,res)=>{                                 
  res.send("only parameters ending with fly are accepted");
});


var middleware_1 = function(req,res,next){
  console.log("middleware_1 is also working");
  next();
}                               //middleware_1 is defined here      
app.use(middleware_1);        //this type of middleware will work for all types of get requests


var middleware_2 = function(req,res,next){
  console.log("middleware_2 is working");
  next();
}                                                      //middleware_2 is defined here      
app.get('/middleware_2', middleware_2, (req,res)=>{    //middleware will be called from here                             
  res.send("<h1>middleware_2 will be called for this specific request</h1>");
});


var middleware_3 = function(req,res,next){
  if(req.params.name == 'ashwani kumar'){
    console.log("middleware_3 user_name is validated");
  }else{
    console.log("middleware_3 user_name is not validated");
  }  
  next();
}                                                             //middleware_3 is defined here      
app.get('/middleware_3/:name?', middleware_3, (req,res)=>{    //middleware will be called from here                             
  res.send("<h1>middleware_3 will be called and username is passed to middleware_3</h1>");
});



//listening on port 5000
app.listen(5000, () => {                        
  console.log('server listening on port 5000!');
});
