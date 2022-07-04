const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const {Client}=require('pg')
//------------------------ DATABASE--------------------------------

// used to send data to frontend
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Blockchain@123", // ENTER YOUR SQL ROOT PASSWORD...
//   database: "dash",
// });

const db = new Client({
    host: "practisedb-fresher.cdsamxevdhkl.ap-south-1.rds.amazonaws.com",
    user: "team3",
    password: "q2eMj@mwT7B6SQkjgY", // ENTER YOUR SQL ROOT PASSWORD...
    database: "projects_db",
    port:49218
  });

// Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("postgres connected");
});


app.get("/users", function (req, res) {
    var q = `select * from users`;
    db.query(q, function (err, result) {
      if (err) throw err;
      res.send(result.rows);
    });
  });


  app.post("/register", function (req, res) {
    console.log(req.body);
    const id=req.body.id
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;
    console.log(username, password, repassword);
    var sql2 = `select * from users where username = ?`;
    var sql = `insert into users(id,username,password) values (?,?,?)`;
    db.query(sql2, [username], function (err, result) {
      if (result) {
        res.send(400);
      } else if (password === repassword) {
        db.query(sql, [id,username, password], function (err, result) {
          if (err) {
            res.send("error!!!!");
            console.log(err)
          } else {
            res.send(200);
          }
        });
      } else {
        res.send(404);
      }
    });
  });
  

const PORT = process.env.PORT || 3001;

// app.listen(3000, function () {
//     console.log("server started at 3000")
//     // by adding the setInterval here we ensure that the function runs whenevr the server has started
//     setInterval(callUpdates,2000);
// })

// -----------------START SERVER---------------------------



app.listen(PORT,function(){
    const url=`http:localhost:${PORT}`
    console.log(url);
    // time updated
    // setInterval(callUpdates,2000);
})
