'use strict'

const Pieza = require('../models/pieza')
const jwt = require("jsonwebtoken");

function getpiezaId(req, res) { // busca una pieza por su ID - clave mongo
    let piezaId = req.params.piezaId
    Pieza.findById(piezaId, (err,pieza)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!piezaId) return res.status(404).send({message:`La pieza no existe`})
        res.status(200).send({pieza: pieza})
    })
}

function getpiezaIdentificador(req, res) { // busca una pieza por su identificador
    let piezaIdentificador = req.params.piezaId
    Pieza.findOne({'identificador':piezaIdentificador}, (err,pieza)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!pieza) return res.status(404).send({message:`La pieza no existe buscada`})
        res.status(200).send({pieza: pieza})
    })
}


function getPiezasEjemplar(req, res){
      let idEjemplar = req.params.ejemplarId

      Pieza.find({'perteneceEjemplar':idEjemplar},(err,piezas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({piezas});
              } 
         });

    })
}




function getpiezas(req, res){
    Pieza.find({},(err,piezas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!piezas) return res.status(404).send({message:`No existen piezas`})
        res.status(200).send({piezas: piezas})
    })
}

function savePieza(req,res){
    console.log('POST /api/pieza')
    console.log(req.body)
      
    let pieza = new Pieza()
    pieza.identificador = req.body.identificador
    pieza.tipoPieza = req.body.tipoPieza
    pieza.medidasPieza = req.body.medidasPieza
    pieza.imagenPieza = req.body.imagenPieza
    pieza.fechaIngreso = req.body.fechaIngreso
    pieza.fechaBaja = req.body.fechaBaja
    pieza.motivoBaja = req.body.motivoBaja
    pieza.perteneceEjemplar = req.body.perteneceEjemplar
    pieza.origen = req.body.origen
    
    pieza.save((err,piezaStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({pieza: piezaStored})
    })
}

module.exports ={
    getpiezas,
    getpiezaId,
    getpiezaIdentificador,
    getPiezasEjemplar,
    savePieza
}