const passport=require('passport')
const User=require('../models/user')
const strategy=require('passport-local').Strategy


passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})


passport.use('local.signup',new strategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    (req,email,password,done)=>{
        req.checkBody('email','Invalid email').notEmpty().isEmail()
        req.checkBody('password','Invalid password').notEmpty().isLength({min:6})
        let errors=req.validationErrors()
        if(errors){
            var messages=[]
            errors.forEach((error)=>{
                messages.push(error.msg)
            })
            return done(null,false,req.flash('error',messages))
        }
               User.findOne({'email':email},(err,user)=>{
            if(err){
                return done(err)

            }
            if(user){
                return done(null,false,{'message':'Email is alreaady in use.'})
            }
            let newuser=new User();
            newuser.email=email;
            newuser.password=newuser.encryptPassword(password)
            newuser.save((err,result)=>{
                if(err){
                    return done(err)
                }
                return done(null,newuser)
            })
        })
    }
))

passport.use('local.signin',new strategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },(req,email,password,done)=>{
        req.checkBody('email','Invalid email').notEmpty().isEmail()
        req.checkBody('password','Invalid password').notEmpty()
        let errors=req.validationErrors()
        if(errors){
            var messages=[]
            errors.forEach((error)=>{
                messages.push(error.msg)
            })
            return done(null,false,req.flash('error',messages))
        }
        User.findOne({'email':email},(err,user)=>{
            if(err){
                return done(err)

            }
            if(!user){
                return done(null,false,{'message':'User not found'})
            }
            if(!user.validPassword(password)){
                return done(null,false,{'message':'Wrong password'})
            }
            return done(null,user)
        
            
            
    })
}))

