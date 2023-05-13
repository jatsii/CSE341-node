const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getContacts, (req, res) =>{
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to get all contacts.'
    
});

router.get('/:id', contactsController.getSingleContact, (req, res) =>{
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to get a single contact.'
     // #swagger.parameters['id'] = { description: 'Contact ID.' }

});
router.post('/', contactsController.createContact, (req, res) =>{
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to create a new contact.'
});

router.put('/:id', contactsController.updateContact, (req, res) =>{
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to update a contact.'
     // #swagger.parameters['id'] = { description: 'Contact ID.' }
});

router.delete('/:id', contactsController.deleteContact, (req, res) =>{
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to delete a contact.'
     // #swagger.parameters['id'] = { description: 'Contact ID.' }
});

module.exports = router;
