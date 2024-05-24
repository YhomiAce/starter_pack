const express = require('express');
const {check,validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const authController = require('../controllers/auth');


// get logged in user
router.get('/',auth,authController.getUser);

//login route
router.post('/',[
  check('email','Please enter a valid Email').isEmail(),
  check('password',"Password is required").exists()
],authController.login);

module.exports = router;
