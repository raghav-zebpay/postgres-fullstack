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

//------------------------ DATABASE--------------------------------

//----------------------- API CALLS DATA FETCH-----------------------

async function ftx() {
  // console.log("INSIDE FTX")
  const arr = ["BTC/USDT", "ETH/USDT", "XRP/USDT"];
  const endpoint = "https://ftx.com/api/markets/";
  var data = [];
  await Promise.all(
    arr.map(async (x) => {
      var url = "https://ftx.com/api/markets/" + x;
      await axios
        .get(url)
        .then((res) => {
          // console.log("GETTING DATA FROM FTX!!!")
          // console.log(res.status)
          if (res != undefined && res.data != undefined) {
            var hel = res.data.result;
            // console.log(hel)
            hel.id = x.slice(0, 3);
            data.push(hel);
          }
        })
        .catch((err) => {
          // throw err;
          console.log(err);
        });
    })
  );
  console.log("ftx log");
  // console.log(data)
  return data;
}

async function binance() {
  const arr = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "BATUSDT", "ADAUSDT"];
  const endpoint = "https://api.binance.com/api/v3/ticker/price?symbol=";
  var data = [];
  await Promise.all(
    arr.map(async (x) => {
      var url = endpoint + x;
      await axios
        .get(url)
        .then((res) => {
          if (res != undefined && res.data != undefined) {
            var hel = res.data;
            // console.log(hel);
            hel.id = x.slice(0, 3);
            data.push(hel);
          }
        })
        .catch((err) => {
          console.log(err);
          // throw err;
        });
    })
  );
  // console.log(data);
  return data;
}

async function kraken() {
  const arr = ["BTCUSD", "ETHUSD", "XRPUSD", "ADAUSD", "BATUSD"];
  const endpoint = "https://api.kraken.com/0/public/Ticker?pair=";
  var data = [];
  await Promise.all(
    arr.map(async (x) => {
      var url = endpoint + x;
      await axios
        .get(url)
        .then((res) => {
          if (res != undefined && res.data != undefined) {
            var hel = res.data.result;
            hel.id = x.slice(0, 3);
            // console.log(hel);
            switch (hel.id) {
              case "BTC":
                // console.log(hel.XXBTZUSD.c[0])
                // console.log(hel.id);
                data.push({
                  id: hel.id,
                  price: hel.XXBTZUSD.c[0],
                });
                break;
              case "ETH":
                // console.log(hel.XETHZUSD)
                // console.log(hel.id);
                data.push({
                  id: hel.id,
                  price: hel.XETHZUSD.c[0],
                });
                break;
              case "XRP":
                // console.log(hel.XXRPZUSD)
                // console.log(hel.id);
                data.push({
                  id: hel.id,
                  price: hel.XXRPZUSD.c[0],
                });
                break;
              case "BAT":
                // console.log(hel.BATUSD)
                // console.log(hel.id);
                data.push({
                  id: hel.id,
                  price: hel.BATUSD.c[0],
                });
                break;
              case "ADA":
                // console.log(hel.ADAUSD)
                // console.log(hel.id);
                data.push({
                  id: hel.id,
                  price: hel.ADAUSD.c[0],
                });
                break;
            }
          }
          // data.push(hel)
        })
        .catch((err) => {
          // throw err;
          console.log(err);
        });
    })
  );
  console.log(data);
  return data;
}

async function coinbase() {
  const arr = ["BTC-USDT", "ETH-USDT", "ADA-USDT"];
  const endpoint = "https://api.exchange.coinbase.com/products/";
  const last_part = "/ticker";

  const data = [];

  await Promise.all(
    arr.map(async (x) => {
      var url = endpoint + x + last_part;
      await axios
        .get(url)
        .then((res) => {
          if (res != undefined && res.data != undefined) {
            var hel = res.data;
            // console.log(hel);
            hel.id = x.slice(0, 3);
            data.push(hel);
          }
        })
        .catch((err) => {
          // throw err;
          console.log(err);
        });
    })
  );
  // console.log(data);
  return data;
}

async function gemini() {
  const endpoint = "https://api.gemini.com/v1/pubticker/";
  const arr = ["btcusd", "ethusd", "batusd"];
  var data = [];
  await Promise.all(
    arr.map(async (x) => {
      var url = endpoint + x;
      await axios
        .get(url)
        .then((res) => {
          if (res != undefined && res.data != undefined) {
            console.log(res.data);
            var hel = res.data;
            hel.id = x.slice(0, 3).toUpperCase();
            data.push(hel);
          }
        })
        .catch((err) => {
          // throw err;
          console.log(err);
        });
    })
  );
  return data;
}

//----------------------- API CALLS DATA FETCH-----------------------

// Promises ->help
function helper() {
  var arr = [];
  const res = binance();
  // the promise at this stage is pending
  console.log(res);
  // promise has been completed->data received
  res.then((data) => {
    console.log(data);
  });
}

// -------------FUNCTIONS FOR STORING INITAL DATA--------------------------------

function binanceupdate() {
  const res = binance();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  // recieving data from promise ->binance();
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        // console.log(obj);
        delete obj.symbol;
        obj.exc = "Binance";
        var ar=[];
        ar.push(obj.id)
        ar.push(obj.price)
        ar.push(obj.exc);
        // ar.push(obj);
        console.log(ar);
        var sql = "insert into coins set?";
        db.query(sql, ar, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          console.log(result);
          console.log("add sucessful");
        });
      } else {
        // do nothing
      }
    });
  });
}

function ftxupdate() {
  const res = ftx();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        obj.exc = "Ftx";
        let newobj = {
          id: obj.id,
          price: obj.price,
          exc: "Ftx",
        };
        // console.log(newobj)
        var sql = "insert into coins set?";
        db.query(sql, newobj, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          console.log(result);
          console.log("add sucessful");
        });
      } else {
        // do nothing
      }
    });
  });
}

function geminiupdate() {
  const res = gemini();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        // console.log(obj);
        let newobj = {
          id: obj.id,
          price: obj.last,
          exc: "Gemini",
        };
        // console.log(newobj)
        var sql = "insert into coins set?";
        db.query(sql, newobj, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          console.log(result);
          console.log("add sucessful");
        });
      } else {
        // do nothing
      }
    });
  });
}

function coinbaseupdate() {
  const res = coinbase();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        // console.log(obj);
        let newobj = {
          id: obj.id,
          price: obj.price,
          exc: "Coinbase",
        };
        console.log(newobj);
        var sql = "insert into coins set?";
        db.query(sql, newobj, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          console.log(result);
          console.log("add sucessful");
        });
      } else {
        // do nothing
      }
    });
  });
}

function krakenupdate() {
  const res = kraken();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        // console.log(obj);
        let newobj = {
          id: obj.id,
          price: obj.price,
          exc: "Kraken",
        };
        console.log(newobj);
        var sql = "insert into coins set?";
        db.query(sql, newobj, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          console.log(result);
          console.log("add sucessful");
        });
      } else {
        // do nothing
      }
    });
  });
}

// -------------FUNCTIONS FOR STORING INITAL DATA--------------------------------

// ---------------------FUNCTIONS FOR UPDATING DATA--------------------------------

function binanceup() {
  const res = binance();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        var price = obj.price;
        var id = obj.id;
        var sql = `update coins set price=${price} where id='${id}' and exc='Binance'`;
        db.query(sql, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          // console.log(result);
          console.log(" Binance Post updated");
        });
      } else {
        // do nothing
      }
    });
  });
}

function ftxup() {
  const res = ftx();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        var price = obj.price;
        var id = obj.id;
        var sql = `update coins set price=${price} where id='${id}' and exc='Ftx'`;
        db.query(sql, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          // console.log(result);
          console.log("FTX Post updated");
        });
      } else {
        // do nothing
      }
    });
  });
}

function geminiup() {
  const res = gemini();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        var price = obj.last;
        var id = obj.id;
        var sql = `update coins set price=${price} where id='${id}' and exc='Gemini'`;
        db.query(sql, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          // console.log(result);
          console.log("Gemini Post updated");
        });
      } else {
        // do nothing
      }
    });
  });
}

function coinbaseup() {
  const res = coinbase();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        var price = obj.price;
        var id = obj.id;
        var sql = `update coins set price=${price} where id='${id}' and exc='Coinbase'`;
        db.query(sql, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          // console.log(result);
          console.log("Coin Base Post updated");
        });
      } else {
        // do nothing
      }
    });
  });
}

function krakenup() {
  const res = kraken();
  const arr = ["BTC", "ETH", "BAT", "XRP", "ADA"];
  res.then((data) => {
    arr.map((x) => {
      let obj = data.find((o) => o.id === x);
      if (obj != undefined) {
        var price = obj.price;
        var id = obj.id;
        var sql = `update coins set price=${price} where id='${id}' and exc='Kraken'`;
        db.query(sql, (err, result) => {
          if (err) {
            // throw err;
            console.log(err);
          }
          // console.log(result);
          console.log(" Kraken Post updated");
        });
      } else {
        // do nothing
      }
    });
  });
}

// ---------------------FUNCTIONS FOR UPDATING DATA--------------------------------

// ---------------------CALL FUNCTION TO INVOKE UPDATES--------------------------

function callUpdates() {
  binanceup();
  ftxup();
  geminiup();
  coinbaseup();
  krakenup();
}

// ---------------------CALL FUNCTION TO INVOKE UPDATES--------------------------

// ----------------------HOME ROUTE GET FUNCTION--------------------
app.get("/", function (req, res) {
  res.send(`<h1>Welcome to Best Deals Dashboard</h1>`);

  // -------store calls----------
  // UPDATE FUNCTIONS-> INITIAL INSETIONS
//   binanceupdate();
//   ftxupdate();
//   geminiupdate();
//   coinbaseupdate();
//   krakenupdate()
  // -------store calls----------

  //----------update calls--------------
  // UP FUNCTIONS-> UPDATING DATA IN THE DB
  // binanceup();
  // ftxup();
  // geminiup();
  // coinbaseup();
  // krakenup()
  //----------update calls--------------

  // setInterval(callUpdates,2000);

  // kraken();
});
// ----------------------HOME ROUTE GET FUNCTION--------------------

// -----------------GET ROUTE TO CHECK BTC PRICES-------------------
app.get("/btc", function (req, res) {
  var sql = `select * from coins where id='BTC'`;
  const q = db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("BTC");
    // console.log(typeof result)

    res.send(result);
  });
  // setInterval(location.reload(true),2000);
});

// -----------------GET ROUTE TO CHECK BTC PRICES-------------------

// -----------------GET ROUTE TO CHECK ETH PRICES-------------------

app.get("/eth", function (req, res) {
  var sql = `select * from coins where id='ETH'`;
  const q = db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("ETH");
    // console.log(typeof result)

    res.send(result);
  });
  // setInterval(location.reload(true),2000);
});

// -----------------GET ROUTE TO CHECK ETH PRICES-------------------

// -----------------GET ROUTE TO CHECK BAT PRICES-------------------

app.get("/bat", function (req, res) {
  var sql = `select * from coins where id='BAT'`;
  const q = db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("BAT");
    // console.log(typeof result)

    res.send(result);
  });
  // setInterval(location.reload(true),2000);
});

// -----------------GET ROUTE TO CHECK BAT PRICES-------------------

// -----------------GET ROUTE TO CHECK XRP PRICES-------------------

app.get("/xrp", function (req, res) {
  var sql = `select * from coins where id='XRP'`;
  const q = db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("XRP");
    // console.log(typeof result)

    res.send(result);
  });
  // setInterval(location.reload(true),2000);
});

// -----------------GET ROUTE TO CHECK XRP PRICES-------------------

// -----------------GET ROUTE TO CHECK ADA PRICES-------------------

app.get("/ada", function (req, res) {
  var sql = `select * from coins where id='ADA'`;
  const q = db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      console.log(err);
    }
    console.log("ADA");
    // console.log(typeof result)

    res.send(result);
  });
  // setInterval(location.reload(true),2000);
});

// -----------------GET ROUTE TO CHECK ADA PRICES-------------------

//---------------USERS---------------------
// app.get("/users", function (req, res) {
//   var sql = `select * from users`;
//   db.query(sql, function (err, result) {
//     if (err) {
//       throw err;
//     }
//     res.send(result);
//   });
// });

// const jsonParser = bodyParser.json();

// app.post("/users", jsonParser, function (req, res) {
//   const Data = req.body;
//   //   JSON.parse(Data);
//   var sql = `insert into users(id,username) values(${Data.id},'${Data.username}')`;
//   db.query(sql, function (err, result) {
//     if (err) {
//       throw err;
//     }
//     res.send("success");
//   });
//   //   console.log(Data.id)
// });
//-------------USERS-------------------

// --------------TRADE HISTORY-------------------------
app.get("/trades/", function (req, res) {
  // const user = req.params.username;
  var sql = `select * from trades`;
  db.query(sql, function (err, result) {
    if (err) {
      // throw err;
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/trades/:username", function (req, res) {
  const user = req.params.username;
  var sql = `select * from trades where username = '${user}'`;
  db.query(sql, function (err, result) {
    if (err) {
      // throw err;
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/trades", function (req, res) {
  const Data = req.body;
  //   JSON.parse(Data);
  var sql = `insert into trades(id,currency,exchange_name,price,quantity,execution,action,total)
     values(${Data.id},'${Data.currency}','${Data.exchange_name}',
     '${Data.price}','${Data.quantity}','${Data.execution}','${Data.action}','${Data.total}')`;

  db.query(sql, function (err, result) {
    if (err) {
      // throw err;
      console.log(err);
    }
    res.send("success");
  });
  //   console.log(Data.id)
});

//--------------------EXRTRA APIS ADDED--------------------------------

app.get("/users", function (req, res) {
  var q = `select * from users`;
  db.query(q, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/login", function (req, res) {
  // req = req.json();
  // console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username, "+", password);
  var q = `select * from users where username = '${username}' and password = '${password}'`;
  db.query(q, function (err, result) {
    if (err) console.log(err);
    else res.send(result);
  });
});

// app.post("/register", function (req, res) {
//   const { username, password, repassword } = req.body;
//   var q = `insert into users(username,password) values(?,?)`;
//   if (username && password && password === repassword) {
//     db.query(q, [username, password], function (err, result) {
//       if (err) {
//         console.log(err);
//       }
//       res.send("User Registered");
//     });
//   } else if (password !== repassword) {
//     res.send("Password and Re Entered Password do not match");
//   } else {
//     res.send("All the fields are mandatory");
//   }
// });

app.post("/register", function (req, res) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  console.log(username, password, repassword);
  var sql2 = `select * from users where username = ?`;
  var sql = `insert into users(username,password) values (?,?)`;
  db.query(sql2, [username], function (err, result) {
    if (result) {
      res.send(400);
    } else if (password === repassword) {
      db.query(sql, [username, password], function (err, result) {
        if (err) {
          res.send("error");
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(404);
    }
  });
});

//----------------------------------

// -----------------START SERVER---------------------------

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
//  binanceupdate();
  // ftxupdate();
  // geminiupdate();
  // coinbaseupdate();
  // krakenupdate()
    // time updated
    setInterval(callUpdates,30000);
})
