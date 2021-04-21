
const Proyecto =require('../models/Proyecto')
const {validationResult}=require('express-validator');
const { restart } = require('nodemon');





exports.crearProyecto= async (req,res)=>{

   const errores=validationResult(req);

   if(!errores.isEmpty()){
       return res.status(400).json({errores:errores.array()})
   }

   try {
       
    let proyecto =new Proyecto(req.body);
    proyecto.creador=req.usuario.id;
    await proyecto.save();
    res.json(proyecto);

   } catch (error) {

  
    res.status(500).send("Hubo un error.")

   }
}

exports.obtenerProyectos = async (req,res)=>{

   
   try {
      const proyectos=await Proyecto.find({creador:req.usuario.id})
      res.json({proyectos})
   } catch (error) {
      res.status(500).send("Hubo un error.")
   }
}

exports.actualizarProyecto = async (req,res)=>{

   const errores=validationResult(req);

   if(!errores.isEmpty()){
       return res.status(400).json({errores:errores.array()})
   }

   const {nombre}=req.body;
   const nuevoProyecto={}; 

   if(nombre){
      nuevoProyecto.nombre=nombre;
   }

   

   try {
     
     
      let proyecto= await Proyecto.findById(req.params.id);

     

      if(!proyecto)
       {
         res.status(404).json({msg:"Proyecto no encontrado"})
      }

     

      if(proyecto.creador.toString() !== req.usuario.id){

         res.status(401).json({msg:"No autorizado"})
      }
      
      proyecto=await Proyecto.findByIdAndUpdate({_id:req.params.id},{$set:nuevoProyecto},{new:true});

      res.json(proyecto);


   } catch (error) {
      res.status(500).send("Hubo un error222.")
   }
}



exports.eliminarProyecto = async (req,res)=>{

   try {
     
     
      let proyecto= await Proyecto.findById(req.params.id);

     

      if(!proyecto)
       {
         res.status(404).json({msg:"Proyecto no encontrado"})
      }

     

      if(proyecto.creador.toString() !== req.usuario.id){

         res.status(401).json({msg:"No autorizado"})
      }
      
      await Proyecto.findByIdAndDelete(req.params.id, function (err, docs) {
         if (err){
             console.log(err)
         }
         else{
            res.json({msg:"Proyecto Eliminado"});
         }
     });

     await Proyecto.findByIdAndRemove({_id:req.params.id});

   } catch (error) {
      res.status(500).send("Hubo un error.")
   }
}