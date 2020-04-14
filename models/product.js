const mongoose=require('mongoose')
const Schema=mongoose.Schema

const product=new Schema({
    imagepath:{
         type:String,
         required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})


module.exports=mongoose.model('Product',product)

