let val= "appServiceNag";
var mongodb= require('mongodb');
module.exports.myval=val
const { Console } = require('console');
 var mongoclient=mongodb.MongoClient;
 var url = "mongodb://localhost:27017/";
 function insertStudent(student,res){
     mongoclient.connect(url,{ useUnifiedTopology: true } ,function(err,db){
        if(err)throw err
             db.collection("students").insertOne(student,function(err,result){
                 if(err){
                     console.log(err);
                     res.send(err);

                 }else{
                     console.log(result);
                     res.send(result);
                 }
                 db.close();
             })
         
     })
 }
module.exports.registerStudent=insertStudent;
async function login(user){

   let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
            var myorgdb=db.db("studentorg");
  let existingUser=  await   myorgdb.collection("users").findOne(user.username);
           if(existingUser==null){
         let result=  await   myorgdb.collection("users").insertOne(user);
            result2=result+1;
         console.log(result2)
         db.close();
        return  result2;
           }else{db.close();
            return "{message:userallready taken}"

           }
               
          
        
    
}
async function finduser(user){
    let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
             var myorgdb=db.db("studentorg");
 
          let result=  await   myorgdb.collection("users").findOne(user);
             result2=result;
          console.log(result2)
          db.close();
         return  result2;
                
           
         
     
 }

module.exports.loginUser=login;

function signUp(user,res){


    mongoclient.connect(url,{ useUnifiedTopology: true } ,function(err,db){
        if(err)throw err;
            db.collection("users").insertOne(user,function(err,result){
                if(err){
                    console.log(err);
                    res.send(err);

                }else{
                    console.log(result)
                    res.send(result);

                }
                db.close();
            })
        
    })
}
    module.exports.signUpuser=signUp;




  function getStudents(){
      let students=[];
    mongoclient.connect(url,{ useUnifiedTopology: true } ,function(err,db){
        if(err){

        }else{
            myorgdb.collection("students").find({}).toArray(function(err,result){
                if(err){
                
                }else{
            students=result
                }
                db.close();

        
    })

        }
    })
    return students;
    }
    module.exports.getallStudents=getStudents;
    function getusers(){
        mongoclient.connect(url,{ useUnifiedTopology: true } ,function(err,db){
            if(err) throw err
                myorgdb.collection("students").find({}).toArray(function(err,result){
                    if(err){
                    }else{
                        users=result;
                    }
                    db.close();
            
            
        })
    
            
        })
        return users;

        }