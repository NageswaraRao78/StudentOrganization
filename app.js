const express= require('express');
const app= express();
var path = require("path");
var appService= require('./js/appService');
const bodyParser = require('body-parser');
const { Console } = require('console');
app.use(bodyParser.urlencoded({extended:true}));

console.log(appService.myval);
console.log("Nag");
app.get('/login',(req,res)=>{
    res.sendFile("/views/login.html",{root:__dirname})
});
app.post('/loginUser',(req,res)=>{
console.log(req.body);
   
    
   let user=req.body;
      console.log(user);
  (async function(){
    let result=  await appService.loginUser(user);

    console.log(result)
    res.send (result);
  }
  
  )();

     
});
app.post('/singnupUser',(req,res)=>{
    let user=req.body;
    res.send(appService.signupUser(user));
    
});
app.post('/rigisterStudent',(req,res)=>{
    
    let user=req.body;
    res.send(appService.registerStudent(user));
});
app.get('/sudentDetails',(req,res)=>{
    res.send(appService.getallStudents(user));
});

app.listen(4200,()=>console.log("server started"));