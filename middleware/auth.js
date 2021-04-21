const jwt = require('jsonwebtoken');

module.exports =function(req,res,next){
     
    const token=req.header('x-auth-token');

   

    if(!token)
        {
            return res.status(401).json({msg:"Permiso no Valido 1"})
        }

      
    try {
        const cifrado= jwt.verify(token,process.env.SECRETA);
    

        req.usuario=cifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).json({msg:"Token no Valido 2"})
    }
}