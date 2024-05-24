const express = require('express');
const router = express.Router();

let Product = require('../Model/Product');

router.get('/',async (req,res)=>{
  try{
    const products = await Product.find();
    res.status(202).json({data:products})
  }catch(err){
    res.status(404).json({message:err})
  }

})

router.post('/', async (req,res)=>{
  const product=new Product({
    product_name:req.body.product_name,
    price:req.body.price,
    quantity: req.body.quantity,
    brand:req.body.brand,
    code : req.body.code
  })
  try{
    const savedProduct= await product.save();
    res.status(202).json({message:"Product saved",product:savedProduct})
  }catch(err){
    res.status(404).json({message:err})
  }

})

router.get('/:id',async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id)
    res.status(202).json({data:product})
  }catch(err){
    res.status(405).json({message:err})
  }
})

router.delete('/:id', async (req,res)=>{
  try{
    const delProduct = await Product.remove({_id:req.params.id})
    res.status(200).json({msg:"Product Deleted",data:delProduct})
  }catch(err){
    res.status(404).json({message:err})
  }
})

router.post('/:id', async (req,res)=>{
  try{
    // const updatedProduct = await Product.updateOne({_id:req.params.id},{$set:{
    //   product_name:req.body.product_name,
    //   price:req.body.price,
    //   quantity: req.body.quantity,
    //   brand:req.body.brand,
    //   code : req.body.code
    // }})

    // Method 2

    let product ={}
    product.product_name = req.body.product_name
    product.price = req.body.price
    product.quantity = req.body.quantity
    product.brand = req.body.brand
    product.code = req.body.code
    const updateProduct = await Product.update({_id:req.params.id},product)
    res.status(200).json({data:updateProduct})
  }catch(err){
    res.status(405).json({message:err})
  }
})

module.exports = router
