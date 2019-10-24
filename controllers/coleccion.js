'use strict'

const Coleccion = require('../models/coleccion')


function getColecciones(req, res){
    Coleccion.find({},(err,colecciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!colecciones) return res.status(404).send({message:`No existen colecciones`})
        res.status(200).send({colecciones: colecciones})
    })
}


module.exports ={
    getColecciones
}