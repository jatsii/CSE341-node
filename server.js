const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const app = express();
const port = 3000;

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

console.log("Listening at:// port:%s (HTTP)", port);

//app.use(bodyParser.urlencoded({ extended: true }))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


//app.use('/', require('./routes'));
/*
app.listen(process.env.port || port);*/
console.log('Web Server is listening at port '+ (port));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
/*
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connection = await client.connect();
const db = connection.db("cs341-Week2-Contacts");
const coll = db.collection("contacts");*/