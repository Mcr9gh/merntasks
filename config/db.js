const mongoose=require('mongoose');

require('dotenv').config({path:'variables.env'});


const conectarBD =async()=>{

    try {
        
        await mongoose.connect(process.env.mongoDb,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log("BD Conectada");
    } catch (error) {
        console.log(error);
    }
    
}
module.exports=conectarBD;