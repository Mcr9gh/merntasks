//rutas para crear usuarios


const express = require('express');
const router= express.Router();
const TareaController = require("../controllers/TareaController");
const auth =require("../middleware/auth");
const {check} =require("express-validator");


router.post("/",
   auth,
   [
      check('nombre','El nombre de la tarea  es obligatorio').not().isEmpty()
   ],
   TareaController.crearTarea
)

router.get("/",
   auth,
   TareaController.obtenerTareas  
)

router.put("/:id",
auth,
[
   check('nombre','El nombre de la tarea  es obligatorio').not().isEmpty()
],
TareaController.actualizarTarea
)

router.delete("/:id",
auth,
TareaController.eliminarTarea
)


module.exports=router;