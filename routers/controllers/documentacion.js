'use strict'

const Documentacion = require('../models/documentacion')

function getDocumentacion(req, res){

var query = Documentacion.find({});

// sort by nombre
query.sort({ anio: 1 });

// execute the query at a later time
query.exec(function (err, documentacion) {
  if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!documentacion) return res.status(404).send({message:`No existe documentacion`})
        res.status(200).send({data: documentacion})
})

}

function saveDocumentacion(req,res){
    console.log('POST /api/pieza')
    console.log(req.body)
      
    let documentacion = new Documentacion()
    documentacion.tipoDocumentacion= req.body.tipoDocumentacion
    documentacion.nombre= req.body.nombre
    documentacion.anio= req.body.anio
    documentacion.comentarios= req.body.comentarios

      
    documentacion.save((err,docStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({documentacion: docStored})
    })
}

module.exports ={
   getDocumentacion,
   saveDocumentacion
}