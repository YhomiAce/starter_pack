const express = require('express');
const {check,validationResult} = require('express-validator');
const router = express.Router();
const registerController = require('../controllers/user');


router.post('/',[
  check('name','Please add name').not().isEmpty(),
  check('email','Please include a valid Email').isEmail(),
  check('password','Please enter a password with 5 or more charcaters').isLength({min:5})
],registerController.register);

module.exports = router;
