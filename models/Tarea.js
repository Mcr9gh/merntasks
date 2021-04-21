const  mongoose= require('mongoose');

const TareaShema=mongoose.Schema({
    nombre:{
        type: String,
        required :true,
        trim:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'Usuario',
       
    },
       creado:{
        type:Date,
        default:Date.now(),
    
    },
    estado:{
        type:Boolean,
        default:false, 
    },
    proyecto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Proyecto'
    }

})

module.exports =mongoose.model('Tarea',TareaShema)
