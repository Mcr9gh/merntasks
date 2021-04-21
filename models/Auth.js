const  mongoose= require('mongoose');

const AuthShema=mongoose.Schema({
    
    email:{
        type:String,
        required :true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required :true,
        trim:true,
    }
    
})

module.exports =mongoose.model('Auth',AuthShema)
