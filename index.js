const express = require ('express');
const fs = require ('fs');
const cors = require ('cors');
const app = express();
const port =  process.env.MYSQL_ADDON_PORT || 3000;

const db = require ('./db/conexion')
const dotenv = require ('dotenv/config')



app.use(express.json()) 
app.use(express.static('./public'));//ejecutar directamente el front cuando corremos el servidor
app.use(cors());


app.get('/productos', (req, res)=>{
    const sql = "SELECT * FROM productos";
    db.query(sql, (err,result)=>{
        if(err){
            console.error('error de lectura')
            return;
        }
        //console.log(result)
        res.json(result)
    })
})

app.post('/productos', (req, res)=>{
    console.log(req.body)

    console.log(Object.values(req.body))

    const values = Object.values(req.body)

    const sql = "insert into productos (nombre, descripcion, precio, imagen) values (?,?,?,?)"

    db.query(sql, values, (err, result)=>{
        if(err){
            console.error('error al guardar')
            return;
        }
        console.log(result)
        res.json({mensaje: "nuevo prod agregado"})
    })
})

app.delete('/productos/:id', (req, res)=>{
    const id = req.params.id

    const sql = "delete from productos where id = ?"

    db.query(sql, [id], (err, result)=>{
        if(err){
            console.error('error al borrar')
            return;
        }
        //console.log(result)
        res.json({mensaje: "producto eliminado"})
    })
})

app.put('/productos', (req, res)=>{
    const valores = Object.values(req.body)
    //console.log(valores)
    const sql = "update productos set nombre = ?, descripcion = ?, precio = ?, imagen = ? where id = ?"

    db.query(sql, valores, (err, result)=>{
        if(err){
            console.error('error al modificar producto')
            return;
        }
        //console.log(result)
        res.json({mensaje: "producto actualizado", data: result})
    })
})


app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)
