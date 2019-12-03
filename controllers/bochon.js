'use strict'

const Bochon = require('../models/bochon')

function getbochonId(req, res) { // busca un bochon por su ID - clave mongo
    let bochonId = req.params.bochonId
    Bochon.findById(bochonId, (err,bochonId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochonId) return res.status(404).send({message:`El bochon no existe`})
        res.status(200).send({bochonId: bochonId})
    })
}

function getbochonCampo(req, res) { // busca un bochon por nro de campo
    let bochon = req.params.bochonId
    Bochon.find({'nroCampo':bochon}, (err,bochon)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochon) return res.status(404).send({message:`El bochon no existe buscada`})
        res.status(200).send({bochon: bochon})
    })
}


function getbochones(req, res){
    Bochon.find({},(err,bochones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochones) return res.status(404).send({message:`No existen bochones`})
        res.status(200).send({bochones: bochones})
    })
}

function getbochonEjemplar(req, res) { // busca un bochon por su ejemplar Asociado
    let ejemAsociado = req.params.bochonId
    Bochon.find({'ejemplarAsociado':ejemAsociado}, (err,bochon)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochon) return res.status(404).send({message:`El bochon no existe buscada`})
        res.status(200).send({bochon: bochon})
    })
}

function saveBochon(req,res){
    console.log('POST /api/bochon')
    console.log(req.body)
      
    let bochon = new Bochon()
    bochon.nombre = req.body.nombre
    bochon.nroCampo = req.body.nroCampo
    bochon.preparador = req.body.preparador
    bochon.preparadorID = req.body.preparadorID
    bochon.tipoPreparacion = req.body.tipoPreparacion
    bochon.acidosAplicados = req.body.acidosAplicados
    bochon.ejemplarAsociado = req.body.ejemplarAsociado
    bochon.excavacionId = req.body.excavacionId
    bochon.piezaId = req.body.piezaId

    bochon.save((err,bochonStrored)=> {
        if(err) {res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`}) 
		   console.log(err)
		}
         res.status(200).send({bochon: bochonStrored})
		 
    })
}

function getBochonNombre(req, res) { // busca  bochones por nombre
    let nombre = req.params.nombre
    Bochon.find({ 'nombre':nombre}, (err,bochon)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!bochon) return res.status(404).send({message:`El bochonb buscado no existe`})
			res.status(200).send({bochones: bochon})
		})
}

function getBochonUnNombre(req, res) { // busca un bochon por nombre
    let nombre = req.params.nombre
    Bochon.findOne({ 'nombre':nombre}, (err,bochon)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!bochon) return res.status(404).send({message:`El bochonb buscado no existe`})
			res.status(200).send({bochon: bochon})
		})
}

function updateBochon(req,res){
    let bochonId= req.params.bochonId
    let update= req.body
    console.log('POST /api/bochon/:BochonId UpdateBochon......')
    console.log(req.body)
    
    Bochon.findByIdAndUpdate(bochonId, update, (err, bochonUpdate)=>{
        if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
        if(!bochonUpdate) return res.status(404).send({message:`El bochon Update no Existe`})
        res.status(200).send({bochon: bochonUpdate})
    
    })
}

function deleteBochon(req,res){
    let bochonId = req.params.bochonId
	
	Bochon.findByIdAndRemove(bochonId, (err, bochon) => {
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
		// We'll create a simple object to send back with a message and the id of the document that was removed
		// You can really do this however you want, though.
		const response = {
			message: "Bochon satisfactoriamente borrado",
			id: bochon._id
		};
		return res.status(200).send(response);
	}); 

}

module.exports ={
    getbochones,
    getbochonCampo,
    getbochonId,
    getbochonEjemplar,
    saveBochon,
    getBochonNombre,
    updateBochon,
    deleteBochon,
	getBochonUnNombre
}