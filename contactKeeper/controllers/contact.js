const Contact = require('../models/Contact');
const User = require('../models/User');
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');


// get all contact controller
exports.getAllContact = async(req,res)=>{
  try {
    const contacts = await Contact.find({user:req.user.id}).sort({date:-1});

    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:"Server Error"});
  }
}


// add a contact controller
exports.storeContact = async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {name,email,phone,type} = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      user:req.user.id,
      type
    });
    const contact = await newContact.save();

    res.status(200).json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:"Server Error"});
  }
}


// get a particular contact controller
exports.getSingleContact = async(req,res)=>{
  const userId = req.user.id;
  const contact = await Contact.findById({_id:req.params.id});
  if(!contact){
    return res.status(404).json({msg:"This contact is not found"});
  }

  if(contact.user != userId){
    return res.status(400).json({msg:'Unauthorized User'});
  }
  try {
    const getContact = await Contact.findById({_id:req.params.id});
    res.status(200).json({contact:getContact})
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"Server Error"});
  }
}


//update contact controllers
exports.updateContact = async(req,res)=>{
  const userId = req.user.id;
  const contact = await Contact.findById({_id:req.params.id});
  if(!contact){
    return res.status(404).json({msg:"This contact is not found"});
  }

  if(contact.user != userId){
    return res.status(400).json({msg:'Unauthorized User'});
  }

  try {
    const updatedContact = await Contact.updateOne({_id:req.params.id},{$set:req.body});
    res.status(200).json({msg:"Contact Updated",updatedContact});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:"Server Error"});
  }
}


// delete contact controller
exports.removeContact = async(req,res)=>{
  const userId = req.user.id;
  const contact = await Contact.findById({_id:req.params.id});
  if(!contact){
    return res.status(404).json({msg:"This contact is not found"});
  }

  if(contact.user != userId){
    return res.status(400).json({msg:'Unauthorized User'});
  }
  try {
    const deleteContact = await Contact.remove({_id:req.params.id});
    res.status(202).json({msg:"Contact Deleted"});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:"Server Error"});
  }
}
