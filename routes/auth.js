//rutas para crear usuarios


const express = require('express');
const router= express.Router();
const AuthController = require("../controllers/AuthController");
const {check} = require('express-validator')
const auth =require("../middleware/auth");

router.post("/",
    [
       
        check('email','Agrega un email  valido').isEmail(),
        check('password','El password debe tener minimo 6 catacteres').isLength({min:6})
    ],
    AuthController.autenticarusuario
)
router.get("/",
    auth,
    AuthController.usuarioAutenticado
)
module.exports=router;