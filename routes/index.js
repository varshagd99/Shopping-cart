const express=require('express')
const router=express.Router()
const passport=require('passport')
const Product=require('../models/product')

const Cart=require('../models/cart')
const Order=require('../models/order')

 router.get('/', async (req,res,next)=>{
    const resPerPage=8
  const page=1
    console.log(page)
    
    
    try{
        var successMsg=req.flash('success')[0]
    let product=await Product.find().skip((resPerPage*page)-resPerPage).limit(resPerPage)
    let count=await Product.countDocuments()
    console.log(Math.ceil(count/resPerPage))
    if(product)
    {
        let productChunk=[];
        let chunksize=4;
        for(let i=0;i<product.length;i+=chunksize){
            productChunk.push(product.slice(i,i+chunksize))
        }
        
        res.render('shop/index',
        {title:'Shopping cart',
        products:productChunk,
        successMsg:successMsg,
        noMessages:!successMsg,
    currentPage:page,
pages:Math.ceil(count/resPerPage)})
    }
    
    }
    catch(err){
      
    }
})
router.get('/:page', async (req,res,next)=>{
    const resPerPage=8
    const page=req.params.page||1
    console.log(page)
    
    try{
        var successMsg=req.flash('success')[0]
    let product=await Product.find().skip((resPerPage*page)-resPerPage).limit(resPerPage)
    let count=await Product.countDocuments()
    console.log(Math.ceil(count/resPerPage))
    if(product)
    {
        let productChunk=[];
        let chunksize=4;
        for(let i=0;i<product.length;i+=chunksize){
            productChunk.push(product.slice(i,i+chunksize))
        }
        
        res.render('shop/index',
        {title:'Shopping cart',
        products:productChunk,
        successMsg:successMsg,
        noMessages:!successMsg,
    currentPage:page,
pages:Math.ceil(count/resPerPage)})
    }
    
    }
    catch(err){
      
    }
})



module.exports=router

