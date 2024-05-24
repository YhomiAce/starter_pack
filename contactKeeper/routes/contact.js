const express = require('express');
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');
const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/',auth,contactController.getAllContact);

// add a new contact
router.post('/',[auth,[check('name',"Name is required").not().isEmpty()]],contactController.storeContact);


//get a particular contact
router.get('/:id',auth,contactController.getSingleContact);


// update a contact
router.patch('/:id',auth,contactController.updateContact);

// delete a contact
router.delete('/:id',auth,contactController.removeContact);

module.exports = router;
