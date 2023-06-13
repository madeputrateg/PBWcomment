const con = require('mysql2-promise')();
var bodyparser =require("body-parser");
const express =require('express');
const { async } = require('q');
const PORT=8001;
con.configure({
    host: "localhost",
    user: "root",
    password: "example",
    database: "comment"
  });
  


const app = express();


app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
});

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.get(
    '/login', async (req,res)=>{
        const {username,password} =req.query;  
         try{
            result=await con.query("SELECT * FROM user WHERE (username=\""+username+"\" AND password=\""+password+"\")") 
            if (result[0].length==0){
                res.status(201).send({message:"error"})
              }else{
                  res.status(200).send({message:"succes",token:{username:username,user_id:result[0][0].id}})
              }
            }
        catch(err){
            res.status(201).send({message:"error"})
        }
    }
)
app.post(
    '/register',async (req,res)=>{
        const {username,email,password} =req.body;
        try{
            result=await con.query("INSERT INTO user(username,password,email) VALUES(\""+username+"\",\""+password+"\",\""+email+"\")");
            res.status(200).send({message:"succes",token:{username:username,user_id:result[0].insertId}})
        }catch(err){
            res.status(201).send({message:"error"})
        }
    }
)
app.post(
    '/comment/add',async (req,res)=>{
        const {user_id,comment} =req.body;
        con.query("INSERT INTO comment(user_id,comment,time) VALUES("+user_id+",'"+comment+"',NOW());", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({message:"succes"})
        });
    }
)
app.post(
    '/comment/reply',async(req,res)=>{
    const {comment_id,user_id,comment} =req.body;
    var data='';
    try {
        result=await con.query("INSERT INTO comment(user_id,comment,time) VALUES("+user_id+",'"+comment+"',NOW());")
        data=result[0].insertId;
        done= await con.query("INSERT INTO commented(comment_head,commentor) VALUES("+comment_id+","+data+");")
        res.status(200).send({message:"succes"})
    }catch(err){
        res.status(201).send({message:"error"})
    }
    }
)
async function getallcomment(id){
        let div=[];
        const query = "SELECT commentor as id,username,comment,time FROM commented INNER JOIN comment ON commented.commentor = comment.id INNER JOIN user ON user_id=user.id WHERE commented.comment_head ="+id+"";
        data = await con.query(query)
        if(data[0].length>0){
            div=  await data[0].map(  (val)=>{return {id:val.id,username:val.username,comment:val.comment,time:val.time,comments:[]}});
            for(let i =0;i<div.length;i++){
                div[i].comments = await getallcomment(div[i].id); 
            }
        }
        return div;

}
let news;
app.get(
    '/comment/all', async (req,res)=>{
        try{

            data = await con.query("SELECT t1.id,username,t1.comment,time FROM comment t1 LEFT JOIN commented t2 ON t2.commentor = t1.id INNER JOIN user ON user.id=t1.user_id WHERE t2.comment_head IS NULL;")
                
        }catch(error){
            return error;
        }finally{

            news=data[0].map(  (val)=>{return {id:val.id,username:val.username,comment:val.comment,time:val.time,comments:[]}});
            for(let i =0;i<news.length;i++){
                news[i].comments = await getallcomment(news[i].id); 
            }
            res.status(200).json(news)
        }
    }
)
    
app.listen(
    PORT,
    ()=>console.log("berhasil")
);
            
            // SELECT comment.id,username,comment,time FROM comment INNER JOIN user ON user.id=comment.user_id;
            // SELECT commentor as id,username,comment,time FROM commented INNER JOIN comment ON commented.commentor = comment.id INNER JOIN user ON user_id=user.id WHERE commented.comment_head = 1 
            // INSERT INTO comment(user_id,comment,time) VALUES(1,'test bisa kah ini',NOW());
            // INSERT INTO commented(comment_head,commentor) VALUES(1,2);

            // START TRANSACTION;
            //   INSERT INTO comment (user_id, comment, time) VALUES (2, 'balikan ini', NOW());
            //   SELECT LAST_INSERT_ID();
            // COMMIT;