const express=require('express')
const app=express()
const mongoose=require('mongoose')
const db=require('./config/db')
const session=require('express-session')
const cookieparser=require('cookie-parser')
const passport=require('passport')
const flash=require('connect-flash')
const validator=require('express-validator')
const expresshbs=require('express-handlebars')
const path=require('path')
const index=require('./routes/index')
const userRoutes=require('./routes/user')
const addRoutes=require('./routes/add')
const store=require('connect-mongo')(session)
mongoose.connect(db.url,{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("mongodb connected")
})
require('./config/passport')


app.engine('.hbs',expresshbs({defaultLayout:"layout",extname:".hbs",
helpers:{
    ifCond:function (v1,  v2, options) {
       if(parseInt(v1)===1 && v2 > 1)
         return options.fn(this)
        
       
    },
    ifCond1:function(v1,v2,options){
        if( parseInt(v1)!=1 && parseInt(v1)<v2)
         return options.fn(this)
    },
    ifCond2:function(v1,v2,options){
        if(parseInt(v1)==v2 && v2>1)
        return options.fn(this)
    },
    inc:function(v1){
        return parseInt(v1)+1
    },
    dec:function(v1){
        return parseInt(v1)-1
    }

}}))
app.set('view engine','.hbs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(validator())
app.use(cookieparser())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
store:new store({mongooseConnection:mongoose.connection}),
cookie:{maxAge:180*60*1000}}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname,'public')))
app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session
    console.log(req.session.passport.user)
    if(req.isAuthenticated()){
    if(req.session.passport.user=="5e98379d38ef0b0994e651fb"){
        res.locals.admin=true
    }
}

    
    next()
})

app.use('/user',userRoutes)
app.use('/',index)

app.use('/add',addRoutes)

app.listen(process.env.PORT||3000,()=>{

    console.log('server started at 3000')
})