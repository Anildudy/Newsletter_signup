require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    console.log(fname, lname, email);

    var data = {
      members:[
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: fname,
            LNAME: lname,
          }
        }
      ]
    };

    jsonData = JSON.stringify(data);

    var options = {
      url : process.env.url,
      method : "POST",
      headers: {
        "Authorization": process.env.authorization
      },
      body: jsonData
    }

    request(options, function(error,response,body){
      if(error){
        res.sendFile(__dirname + "/failure.html");
      }
      else{
        if(response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
        }
        else{
          res.sendFile(__dirname + "/failure.html");
        }
      }
    });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});

//1e6400c26cfcad1825053457d16bcf3a-us6
//2743522c5b
