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
const store=require('connect-mongo')(session)
mongoose.connect(db.url,{useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false},()=>{
    console.log("mongodb connected")
})
require('./config/passport')


app.engine('.hbs',expresshbs({defaultLayout:"layout",extname:".hbs"}))
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
    next()
})
app.use('/user',userRoutes)
app.use('/',index)
app.listen(process.env.PORT||3000,()=>{
    console.log('server started at 3000')
})