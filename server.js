const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const { findById } = require('./Models/productModal');
const Product = require('./Models/productModal')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// routes
app.get("/", (req,res)=>{
    res.send('Send my first request')
})
app.get("/blog", (req,res)=>{
    res.send('Blog request')
})
app.get("/products", async(req,res)=>{
  try {
    const product =  await Product.find({})
    res.status(200).json(product)
  } catch(error) {
  res.status(500).json({message: error.message})
  }
})
app.get("/products/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
       const product = await Product.findById(id)
       res.status(200).json(product);
    } catch(error) {
     res.status(500).json({message:error.message})
    }
})
app.delete("/products/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product){
            return res.status(404).json({message: `cannot find any product with  ${id}`})
        }
        res.status(200).json(product)
    } catch(error) {
     res.status(500).json({message: error.message})
    }
})
app.post("/products", async(req,res)=>{
   try{
      const product = await Product.create(req.body)
      res.status(200).json(product)
   } catch(error) {
     console.log(error.message);
     res.status(500).json({message: error.message})
   }
})
app.put('/product/:id', async(req,res)=>{
    try {
       const {id} = req.params
       const product = await Product.findOneAndUpdate(id, req.body)
       res.status(200).json(req.body)
       if (!product) {
          return res.status(404).json({message:`cannot find product with the ID ${id}`}) 
       }
       const updatedProduct= await Product.findById(id);
       res.json(updatedProduct)
    } catch(error) {
      res.status(500).json({message:error.message})
    }
 })
mongoose
.connect("mongodb+srv://roosevelt:holiness@cluster0.glizv.mongodb.net/API")
.then(() => {
    app.listen(3000, ()=> {
        console.log("Local Server Started")
    })
 console.log('DB Connected')
}).catch((error)=>{
    console.log(error)
})
