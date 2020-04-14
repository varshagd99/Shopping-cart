const mongoose=require('mongoose')
const bcrypt=require('bcrypt-nodejs')
const user=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
user.methods.encryptPassword=function(password){
 return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}
user.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}
module.exports=mongoose.model('User',user)