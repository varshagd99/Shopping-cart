const express=require('express')
const router=express.Router()
const passport=require('passport')
const Product=require('../models/product')

const Cart=require('../models/cart')
const Order=require('../models/order')

router.get('/add-to-cart/:id',(req,res)=>{
    let id=req.params.id
    let cart=new Cart(req.session.cart? req.session.cart:{})
    Product.findById(id,function(err,product){
        if(err){
            res.redirect('/')

        }
        cart.add(product,product.id)
        req.session.cart=cart
        console.log(req.session.cart)
        res.redirect('/')
    })
})

router.get('/shopping-cart',(req,res)=>{
    if(!req.session.cart){
        return res.render('shop/cart',{products:null})

    }
    let cart=new Cart(req.session.cart)
    return res.render('shop/cart',{products:cart.generateArray(),totalPrice:cart.totalPrice})
})

router.get('/reduce/:id',(req,res)=>{
    let id=req.params.id
    let cart=new Cart(req.session.cart? req.session.cart:{})
    cart.reduceByOne(id)
    req.session.cart=cart
    res.redirect('/add/shopping-cart') 
})
router.get('/remove/:id',(req,res)=>{
    let id=req.params.id
    let cart=new Cart(req.session.cart? req.session.cart:{})
    cart.removeItem(id)
    req.session.cart=cart
    res.redirect('/add/shopping-cart') 
})
router.get('/checkout', isLogged, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/add/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLogged,(req,res)=>{
    if (!req.session.cart) {
        return res.redirect('/add/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")(
        "sk_test_aV5wUCO5KEkDBsrkwvEZLIcc00QpEOriEr"
    );

    stripe.charges.create({
        amount: cart.totalPrice*100 ,
        currency: "inr",
        source: "tok_mastercard", // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/add/checkout');
        }
        let order=new Order({
            user:req.user,
            cart:cart,
            address:req.body.address,
            name:req.body.name,
            paymentId:charge.id

        })
        order.save((err,result)=>{
            req.flash('success','Successfully purchased')
            req.session.cart=null
            res.redirect('/')
        })
       
    })
})

router.get('/add-product',(req,res)=>{
    var successMsg=req.flash('success')[0]
    res.render('shop/add-product',{successMsg:successMsg,noMessages:!successMsg})
})

router.post('/add-product',(req,res)=>{
    let product=new Product({
        imagepath:req.body.imagepath,
        title:req.body.title,
    description:req.body.description,
        price:req.body.price  
    })
    
    product.save((err,result)=>{
        console.log(result)
        req.flash('success','Successfully added')

        res.redirect('/add/add-product')
    
    })
})

module.exports=router
function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    console.log(req.session.oldUrl)
    res.redirect('/user/signin');
}