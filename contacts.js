const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let connection;
let coll;

//conect with mongo
async function main(){
    try{
        connection = await client.connect();

        const db = connection.db("cs341-Week2-Contacts");
        coll = await db.collection("contacts");

        const cursor = coll.find();

        await cursor.forEach(console.log); 


    }catch(e){
        console.error(e);
    }
}

main().catch(console.error);


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

//Get all documents
app.get('/', async(req, res)=> {

    let contact = await coll.find().limit(60).toArray();
    res.send(contact).status(200);
});

//Get single document
app.get('/getOne', async(req, res)=> {
   
    let contact = await coll.findOne({id:3});//.limit(60).toArray();
    res.send(contact).status(200);  
});


app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || port));


