const express = require('express');
const alasql = require('alasql');
alasql("CREATE TABLE users (firstname STRING, lastname STRING, socialsecurity INT, phone INT, email STRING, usertype String,  password STRING, PRIMARY KEY (socialsecurity))");
//alasql("CREATE TABLE History (socialsecurity INT, symptons STRING,    FOREIGN KEY (socialsecurity) REFERENCES users(socialsecurity),FOREIGN KEY (symptons) REFERENCES diseases(symptons))");
alasql("CREATE TABLE History (socialsecurity INT, symptons STRING)");
alasql("CREATE TABLE diseases(symptons STRING, disease STRING)");

//https://expressjs.om/en/resources/middleware/cors.html
const app = express();
db = [];
const axios = require('axios')
axios.post('/todos', {
  todo: 'Buy the milk'
})
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  })
app.get('/', (req, res) => {
  res.send("test")

});
app.get('/insert/history/:ssid/:sympton', (req, res) => {
  users = alasql("INSERT INTO History VALUES ('" + req.params.ssid + "','" + req.params.sympton + "')");
  users = alasql("select * from History");
  res.send(users)
});

app.get('/insert/user/:first/:last/:ssid/:phone/:email/:isdoc/:password', (req, res) => {
  alasql("INSERT INTO users VALUES ('" + req.params.first + "','" + req.params.last + "'," + req.params.ssid + "," + req.params.phone + ",'" + req.params.email + "','" + req.params.isdoc + "','" + req.params.password + "')");
  //alasql("INSERT INTO users VALUES ('" + req.params.first + "','',0,0,'e','doctor','password')");
  users = alasql("select * from users");

  res.send(users)

});

app.get('/insert/symptons/:disease/:sympton', (req, res) => {
  alasql("INSERT INTO diseases VALUES ('" + req.params.disease + "','" + req.params.sympton + "')");
  symptons = alasql("select * from diseases");

  res.send(symptons)
});


app.get('/select/history/:ssid', (req, res) => {
  users = alasql("select * from History where socialsecurity = '" + req.params.ssid + "'");

  res.send(users)

});

app.get('/select/user/:ssid/:password', (req, res) => {
  alasql("select * from users where socialsecurity =" + req.params.ssid + " AND password = '" + req.params.password + "'");

  res.send(users)

});

app.get('/select/symptons/:s', (req, res) => {
  symptons = alasql("select disease from diseases where symptons ='" + req.params.s + "'");

  res.send(symptons)

});

app.get('/select/symptons', (req, res) => {
  symptons = alasql("select * from diseases");

  res.send(symptons)

});

app.get('/select/all', (req, res) => {
  users = alasql("select * from users");

  res.send(users)

});

app.listen(3000, () => {
  console.log('server started');
});