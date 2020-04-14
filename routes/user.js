const express=require('express')
const router=express.Router()
const passport=require('passport')
const csrf=require('csurf')
const Order=require('../models/order')
const Cart=require('../models/cart')
let csrfProtection=csrf()
router.use(csrfProtection)

router.get('/profile',isLogged,(req,res)=>{
Order.find({user:req.user},function(err,orders){
    if(err){
        return res.write('Error')
    }
    var cart;
    orders.forEach(function(order){
        cart=new Cart(order.cart)
        order.items=cart.generateArray()
    }
    )
    res.render('user/profile',{orders:orders})
})
    
})
router.get('/logout',isLogged,(req,res,next)=>{
    req.logout()
    res.redirect('/')
})

router.use('/',notLogged,(req,res,next)=>{
     next()
})
router.get('/signup',(req,res,next)=>{
    let messages=req.flash('error')
    res.render('user/signup',{csrfToken:req.csrfToken(), messages:messages,hasErrors:messages.length>0})
})
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
})
   
)
router.get('/signin',(req,res,next)=>{
    let messages=req.flash('error')
    res.render('user/signin',{csrfToken:req.csrfToken(), messages:messages,hasErrors:messages.length>0})
})
router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true
}
)
   
)








function notLogged(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return next()
    }
    res.redirect('/')
    
}
module.exports=router
function isLogged(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next()
    }
   
    console.log(req.session.oldUrl)
    res.redirect('/')
    
}