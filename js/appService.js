let val= "appServiceNag";
var mongodb= require('mongodb');
module.exports.myval=val
const { Console } = require('console');
 var mongoclient=mongodb.MongoClient;
 var url = "mongodb://localhost:27017/";
  
async function login(user){

   let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
            var myorgdb=db.db("studentorg");
            
  let existingUser=  await   myorgdb.collection("users").find(user);
           if(existingUser==null){
         let result=  await   myorgdb.collection("users").insertOne(user);
            result2=result+1;
         console.log(result2)
         db.close();
        return JSON.stringify(result2);
           }else{db.close();
            return JSON.stringify("{message:username or password incorrect}");

           }
            
}
module.exports.loginUser=login;


async function finduser(user){
    let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
             var myorgdb=db.db("studentorg");
 
          let result=  await   myorgdb.collection("users").findOne(user);
             result2=result;
          console.log(result2)
          db.close();
         return  result2;
                
           
         
     
 }



   async function signUp(user,res){
    let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
    var myorgdb=db.db("studentorg");
    
let existingUser=  await   myorgdb.collection("users").find("{ username:"+user.username +"}");
   if(existingUser==null){
 let result=  await   myorgdb.collection("users").insertOne(user);
    result2=result+1;
 console.log(result2)
 db.close();
return  JSON.stringify(result);
   }
   else{db.close();
    return JSON.stringify("{message:userallready taken}");

   }
    
}
      

    module.exports.signUpuser=signUp;




 async function resgisterStudent(student){
    let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
    var myorgdb=db.db("studentorg");
    
let existingUser=  await   myorgdb.collection("students").find({ sId:"+student.sId +"}).toArray();
   if(!Array.isArray(existingUser)){
       console.log(existingUser)
 let result=  await   myorgdb.collection("students").insertOne(student);
    result2=result+1;
console.log(result2)
 db.close();
return  JSON.stringify(result);
   }
   else{
       db.close();
    console.log(existingUser);

    return JSON.stringify("{message:student exits on ID}");

   }
}    
 module.exports.registerstudents=resgisterStudent;



    async function getstudentslist( ){
        let db=await mongoclient.connect(url,{ useUnifiedTopology: true } );
        var myorgdb=db.db("studentorg");
        let students=  await   myorgdb.collection("students").find({}).toArray();

    

    return JSON.stringify(students);
 }
 module.exports.getallStudents=getstudentslist;
