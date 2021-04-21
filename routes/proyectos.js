//rutas para crear usuarios


const express = require('express');
const router= express.Router();
const ProyectoController = require("../controllers/proyectoController");
const auth =require("../middleware/auth");
const {check} =require("express-validator");


router.post("/",
   auth,
   [
      check('nombre','El nombre del proyecto  es obligatorio').not().isEmpty()
   ],
   ProyectoController.crearProyecto
)

router.get("/",
   auth,
   ProyectoController.obtenerProyectos
)

router.put("/:id",
auth,
[
   check('nombre','El nombre del proyecto  es obligatorio').not().isEmpty()
],
ProyectoController.actualizarProyecto
)

router.delete("/:id",
auth,
ProyectoController.eliminarProyecto
)


module.exports=router;