const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let coll;

//conect with mongo
async function main(){
    try{
        
        const connection = await client.connect();

        const db = connection.db("cs341-Week2-Contacts");
        const coll = db.collection("contacts");

        app.set('view engine', 'ejs')

        //Create a collection
        app.post('/contacts', (req, res) => {
            coll
            .insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(error =>console.error(error))
            //console.log(req.body)
          })

          //Get All Contacts
          app.get('/', (req, res) => {
            coll
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { contacts: results })
                })
                .catch(error => console.error(error))
            })

            //Get single contact
            app.get('/:id', async(req, res, next)=> {

                const userId = new ObjectId(req.params.id)
            
                let contact = await coll.find({_id: userId}).limit(60).toArray()
                res.send(contact).status(200); 
            })

            //Update Contact
            app.put('/:id', async (req, res) =>{
                
                const userId = new ObjectId(req.params.id)
                const contact = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    favoriteColor: req.body.favoriteColor,
                    birthday: req.body.birthday
                  }

                  const response = await coll.findAndUpdate({ _id: userId }, contact)

                    console.log(response)
                    if (response.modifiedCount > 0) {
                        res.status(204).send()
                    } else {
                        res.status(500).json(response.error)
                    }
            })
            
            //Delete Contact
            app.delete('/:id', async (req, res) =>{

                const userId = new ObjectId(req.params.id);
                const response = await coll.deleteOne({ _id: userId }, true)

                console.log(response)

                if (response.deletedCount > 0) {
                    res.status(204).send();
                } else {
                    res.status(500).json(response.error)
                }
            })    
        
    }catch(e){
        console.error(e);
    }
}

main().catch(console.error);


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));


app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || port));


