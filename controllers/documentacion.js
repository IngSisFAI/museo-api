'use strict'
const jwt = require("jsonwebtoken");

const Documentacion = require('../models/documentacion')

function getDocumentacion(req, res) {

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {


      var query = Documentacion.find({});

      // sort by nombre
      query.sort({ anio: 1 });

      // execute the query at a later time
      query.exec(function (err, documentacion) {
         if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
         res.json({ documentacion });

      })
    }
  });

}

function getDocumentacionId(req, res) { // busca una persona por su ID - clave mongo
    let documentacionId = req.params.documentacionId

   jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
          if(error){
                res.status(403).send({msg:'Acceso no permitido'});
           }else{
                   Documentacion.findById(documentacionId, (err,documentacionId)=>{
                      if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
                      res.json({ documentacionId });
                   })
           
         }

   });

}



function saveDocumentacion(req, res) {
  console.log('POST /api/pieza')
  console.log(req.body)

  let documentacion = new Documentacion()
  documentacion.tipoDocumentacion = req.body.tipoDocumentacion
  documentacion.nombre = req.body.nombre
  documentacion.anio = req.body.anio
  documentacion.comentarios = req.body.comentarios

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {
      documentacion.save((err, docStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` })
        res.json({ documentacion: docStored })
      })
    }
  });
}

function updateDocumentacion(req,res){
    let documentacionId= req.params.documentacionId
    let update= req.body
    console.log('POST /api/documentacion/:documentacionId ***Update Documentacion***')
    console.log(req.body)

     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                           Documentacion.findByIdAndUpdate(documentacionId, update, (err, documentacionUpdate)=>{
                                 if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                                 res.json({documentacion: documentacionUpdate})
                           });
                    } 
    });
}

function deleteDocumentacion(req,res){
    let documentacionId = req.params.documentacionId

     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                     
			Documentacion.findByIdAndRemove(documentacionId, (err, documentacion) => {
		        if (err) return res.status(500).send(err);
		        const response = {
			      message: "Documentacion satisfactoriamente borrada",
			      id: documentacion._id
		         };
		        return res.status(200).send(response);
	               });
                  } 
         });



}



module.exports ={
   getDocumentacion,
   saveDocumentacion,
   getDocumentacionId,
   updateDocumentacion,
   deleteDocumentacion
}