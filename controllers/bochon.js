'use strict'

const Bochon = require('../models/bochon')
const jwt = require("jsonwebtoken");


function getbochonId(req, res) { // busca un bochon por su ID - clave mongo
    let bochonId = req.params.bochonId
    Bochon.findById(bochonId, (err,bochonId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochonId) return res.status(404).send({message:`El bochon no existe`})
        res.status(200).send({bochonId: bochonId})
    })
}

function getbochonId(req, res) { 
   // busca un bochon por su ID - clave mongo
   let bochonId = req.params.bochonId ;

   jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
          if(error){
                res.status(403).send({msg:'Acceso no permitido'});
           }else{
                   Bochon.findById(bochonId, (err,bochonId)=>{
                      if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
                      res.json({bochonId});
                   })      
         }

   });

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
    Bochon.find({}).populate('ejemplarAsociado').exec(function(err,bochones){
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
              
                  res.json({ bochones});
              } 
         });

    });

}

function getBochonesExcavacion(req, res){
     let excavacionId = req.params.excavacionId

    Bochon.find({'excavacionId':excavacionId }).populate('ejemplarAsociado').exec(function(err,bochones){
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
              
                  res.json({ bochones});
              } 
         });

    });

}


function getbochonEjemplar(req, res) { // busca los bochones por su ejemplar Asociado
  let ejemAsociado = req.params.ejemplarId

   Bochon.find({ 'ejemplarAsociado': ejemAsociado }).populate('excavacionId').exec(function(err,bochones){ 
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
      if (error) {
        res.status(403).send({ error: 'Acceso no permitido' });
      } else {

        res.json({ bochones });
      }
    });
  })
}
function saveBochon(req,res){
    console.log('POST /api/bochon')
    console.log(req.body)
      
    let bochon = new Bochon()
    bochon.nombre = req.body.nombre
    bochon.codigoCampo = req.body.codigoCampo
    bochon.nroBochon = req.body.nroBochon
    bochon.preparador = req.body.preparador
    bochon.preparadorID = req.body.preparadorID
    bochon.tipoPreparacion = req.body.tipoPreparacion
    bochon.acidosAplicados = req.body.acidosAplicados
    bochon.ejemplarAsociado = req.body.ejemplarAsociado
    bochon.excavacionId = req.body.excavacionId
    bochon.piezasId = req.body.piezasId
    bochon.piezasNames = req.body.piezasNames
    bochon.infoAdicional = req.body.infoAdicional




    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                        bochon.save((err,bochonStrored)=> {
                          if(err) res.status(500).send({msg:`Error al guardar en la Base de Datos:${err}`})
                          res.json({bochon: bochonStrored})
                        })
                   } 
    });


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


     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                           Bochon.findByIdAndUpdate(bochonId, update, (err, bochonUpdate)=>{
                                 if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                                 res.json({bochon: bochonUpdate})
                           });
                    } 
    });

    

}

function deleteBochon(req,res){
    let bochonId = req.params.bochonId

  // console.log(req.token);

        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'+error});
              }else{
                     
			Bochon.findByIdAndRemove(bochonId, (err, bochon) => {
		        if (err) return res.status(500).send(err);
		        const response = {
			      message: "Bochon satisfactoriamente borrado",
			      id: bochon._id
		         };
		        return res.status(200).send(response);
	               });
                  } 
         });

	
}

module.exports ={
    getbochones,
    getBochonesExcavacion,
    getbochonCampo,
    getbochonId,
    getbochonEjemplar,
    saveBochon,
    getBochonNombre,
    updateBochon,
    deleteBochon,
    getBochonUnNombre
}