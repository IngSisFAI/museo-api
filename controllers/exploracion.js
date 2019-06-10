'use strict'

const Exploracion = require('../models/exploracion')


function getExploraciones(req, res){
    Exploracion.find({},(err,exploraciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!exploraciones) return res.status(404).send({message:`No existen exploraciones`})
        res.status(200).send({exploraciones: exploraciones})
    })
}

function saveExploracion(req,res){
    console.log('POST /api/exploracion')
    console.log(req.body)
      
    let exploracion = new Exploracion()
    exploracion.nombre = req.body.nombre
    exploracion.fecha = req.body.fecha
    
    exploracion.save((err,exploracionStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({exploracion: exploracionStored})
    })
}

function getExploracionId(req, res) { // busca una persona por su ID - clave mongo
    let exploracionId = req.params.exploracionId
    Exploracion.findById(exploracionId, (err,exploracionId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!exploracionId) return res.status(404).send({message:`La exploracion no existe`})
        res.status(200).send({exploracionId: exploracionId})
    })
}

function updateExploracion(req,res){
    let exploracionId= req.params.exploracionId
    let update= req.body
    console.log('POST /api/persona/:PersonaId UpdatePersona......', req.params.exploracionId)
    console.log(req.body)
    
    Exploracion.findByIdAndUpdate(exploracionId, update, (err, exploracionUpdate)=>{
        if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
        if(!exploracionUpdate) return res.status(404).send({message:`La persona Update no Existe`})
        res.status(200).send({exploracion: exploracionUpdate})
		

    
    })
}

function deleteExploracion(req,res){
    let exploracionId = req.params.exploracionId
	
	Exploracion.findByIdAndRemove(exploracionId, (err, exploracion) => {
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
		// We'll create a simple object to send back with a message and the id of the document that was removed
		// You can really do this however you want, though.
		const response = {
			message: "Exploracion satisfactoriamente borrada",
			id: exploracion._id
		};
		return res.status(200).send(response);
	});

}

function getExploracionesFiltro(req, res){
   
   let nombre = req.params.unNombre

   
   	Exploracion.find({ 'nombre':{'$regex': nombre}}, (err,exploracion)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!exploracion) return res.status(404).send({message:`La exploracion buscada no existe`})
			res.status(200).send({exploraciones: exploracion})
		})
   
}


module.exports ={
    getExploraciones,
	saveExploracion,
	getExploracionId,
	updateExploracion,
	deleteExploracion,
	getExploracionesFiltro
}