const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const {validationResult}=require('express-validator');
const jwt =require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');



exports.autenticarusuario= async (req,res)=>{

    const errores=validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

  
   

   try {
       
    const {email,password} = req.body;
    
    let usuario= await Usuarios.findOne({email});

    

    if(!usuario)
        {
            return res.status(400).json({msg:"El usuario No existe"})
        }

    const passCorrecto= await bcrypt.compare(password,usuario.password)

    
    if(!passCorrecto)
        {
          
            return res.status(400).json({msg:"Password Incorrecto"});
        }
    
    
    const payload={
            usuario:{
                id:usuario.id
            }
        }

    jwt.sign(payload,process.env.SECRETA,{

            expiresIn:3600000

        },(error,token)=>{
            if(error) throw error;
            res.json({token})
        })

   } catch (error) {

  
    res.status(400).send(error)

   }
}

exports.usuarioAutenticado =async(req,res)=>{
    try {
        const usuario= await Usuarios.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error"});
    }
}