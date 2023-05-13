/*const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let coll;

async function main(){
    try{
        const connection = await client.connect();

        const db = connection.db('cs341-Week2-Contacts');
        coll = db.collection('contacts');
    }catch(e){
        console.error(e);
    }
}

//app.set('view engine', 'ejs')
*/
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    const result = await mongodb.getDb().db("cs341-Week2-Contacts").collection('contacts').find();
    result.toArray().then(results => {
        //res.render('index.ejs', { contacts: results });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
    });    
};

const getSingleContact = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const contact = await mongodb.getDb().db("cs341-Week2-Contacts").collection('contacts').find({_id: userId});
    contact.toArray().then((singleContact)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(singleContact[0]);
    });                
};

const createContact = async (req, res) => {
    const create = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };

    const result = await mongodb.getDb().db("cs341-Week2-Contacts").collection('contacts').insertOne(create);
    if (result.acknowledged) {
      // #swagger.responses[201] = { description: 'The contact was created successfully' }
        res.status(201).json(result);
    } else {
      // #swagger.responses[500] = { description: 'Faling creating the contact' }
        res.status(500).json(result.error || 'Cannot create a contact.');
    }
};

const updateContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db("cs341-Week2-Contacts").collection('contacts').replaceOne({ _id: userId }, contact);
    
    console.log(result);
    
    if (result.modifiedCount > 0) {
      // #swagger.responses[201] = { description: 'The contact was updated successfully' }
      res.status(204).send();
    } else {
      // #swagger.responses[500] = { description: 'Faling updating the contact' }
      res.status(500).json(result.error || 'Cannot update the contact.');
    }
  };
  
  const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cs341-Week2-Contacts").collection('contacts').remove({ _id: userId }, true);
    
    console.log(result);
    if (result.deletedCount > 0) {
      // #swagger.responses[201] = { description: 'The contact was deleted successfully' }
      res.status(204).send();
    } else {
      // #swagger.responses[500] = { description: 'Faling deleting the contact' }
      res.status(500).json(result.error || 'Cannot delete the contact.');
    }
  };
  
  module.exports = {
    getContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
  };
