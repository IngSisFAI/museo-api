'use strict'

const TipoPreparacion = require('../models/tipoPreparacion')


function getTiposPreparacion(req, res){
    TipoPreparacion.find({},(err,tipoPreparacion)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!tipoPreparacion) return res.status(404).send({message:`No existen tipos`})
        res.status(200).send({tiposPreparacion: tipoPreparacion})
    })
}


module.exports ={
    getTiposPreparacion
}