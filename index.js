const express= require('express');
const conectarBD =require("./config/db");
const cors =require('cors');
const app =express();

conectarBD();

app.use(cors());

const port =process.env.PORT || 4000;



app.use(express.json({extended:true}))

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));



app.get('/', (req,res)=>{
    res.send("Hola Mundo") 
})

app.listen(port,()=>{
    console.log(`El servidor esta funcionando desde el puerto ${port}`)
})