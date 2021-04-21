
const Tarea =require('../models/Tarea')
const Proyecto =require('../models/Proyecto')
const {validationResult}=require('express-validator');






exports.crearTarea= async (req,res)=>{

   const errores=validationResult(req);

   if(!errores.isEmpty()){
       return res.status(400).json({errores:errores.array()})
   }

   try {
       
    let {proyecto}=req.body;

    let proyectoE= await Proyecto.findById(proyecto);

    if(!proyectoE){
        res.status(404).json({msg:"Proyecto no encontrado"})
    }

    if(proyectoE.creador.toString() !== req.usuario.id){

        res.status(401).json({msg:"No autorizado"})
     }


    let tarea =new Tarea(req.body);
    tarea.creador=req.usuario.id;
    await tarea.save();
    res.json(tarea);

   } catch (error) {

  
    res.status(500).send("Hubo un error.")
 
   }
}

exports.obtenerTareas = async (req,res)=>{
    
   
    let {proyecto}=req.query;

    let proyectoE= await Proyecto.findById(proyecto);

    if(!proyectoE){
        res.status(404).json({msg:"Proyecto no encontrado"})
    }

    if(proyectoE.creador.toString() !== req.usuario.id){

        res.status(401).json({msg:"No autorizado"})
     }



   try {
     const tareas=await Tarea.find({proyecto:proyecto})
      res.json({tareas})
   } catch (error) {
      res.status(500).send("Hubo un error.")
   }
}


exports.actualizarTarea = async (req,res)=>{
    
    
   try {
     
        let {proyecto,nombre,estado}=req.body;

        let tarea= await Tarea.findById(req.params.id);

        if(!tarea){
            res.status(404).json({msg:"Tarea no encontrada"})
        }

        let proyectoE= await Proyecto.findById(proyecto);



        if(proyectoE.creador.toString() !== req.usuario.id){

            res.status(401).json({msg:"No autorizado"})
        }

        const nuevaTarea={}
      
        if(nombre)nuevaTarea.nombre=nombre;
        if(estado !=tarea.estado )nuevaTarea.estado=estado;

        tarea= await Tarea.findOneAndUpdate({_id:req.params.id},nuevaTarea,{new:true});
        res.json({tarea});

   } catch (error) {
      res.status(500).send("Hubo un error.")
   }
}

exports.eliminarTarea = async (req,res)=>{

    try {
      
      
       let tarea= await Tarea.findById(req.params.id);
 
      
 
       if(!tarea)
        {
          res.status(404).json({msg:"Tarea no encontrada"})
       }
 
      
 
       if(tarea.creador.toString() !== req.usuario.id){
 
          res.status(401).json({msg:"No autorizado"})
       }
       
       /*await Proyecto.findByIdAndDelete(req.params.id, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
             res.json({msg:"Proyecto Eliminado"});
          }
      });*/
 
      await Tarea.findByIdAndRemove({_id:req.params.id});
      res.json({msg:"Proyecto Eliminado"});
    } catch (error) {
       res.status(500).send("Hubo un error.")
    }
 }