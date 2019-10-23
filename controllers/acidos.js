'use strict'

const Acidos = require('../models/acidos')


function getAcidos(req, res){
    Acidos.find({},(err,acidos)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!acidos) return res.status(404).send({message:`No existen acidos`})
        res.status(200).send({acidos: acidos})
    })
}


module.exports ={
    getAcidos
}