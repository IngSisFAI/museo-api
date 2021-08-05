'use strict'
const jwt = require("jsonwebtoken");

const Persona = require('../models/persona')

function getPersonaId(req, res) { // busca una persona por su ID - clave mongo
    let personaId = req.params.personaId

   jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
          if(error){
                res.status(403).send({msg:'Acceso no permitido'});
           }else{
                   Persona.findById(personaId, (err,personaId)=>{
                      if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
                      res.json({ personaId });
                   })
           
         }

   });

}

function getPersonaDni(req, res) { // busca una persona por DNI

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
  if(error){
                res.status(403).send({msg:'Acceso no permitido'});
           }else{

                   let persona = req.params.personaId
                   Persona.findOne({'dni':persona}, (err,persona)=>{
                         if(err) return res.status(500).send({msg:`Error al realizar la peticion: ${err}`})
                         res.json({ persona });
                  }) 
          } 
   });

      
}

function getPersonas(req, res){
      Persona.find({},(err,personas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ personas });
              } 
         });

    })
}

function savePersona(req,res){
    console.log('POST /api/persona')
    console.log(req.body)
      
    let persona = new Persona()
    persona.nombres = req.body.nombres
    persona.apellidos = req.body.apellidos
    persona.dni = req.body.dni
    persona.fechaInicio = req.body.fechaInicio
    persona.titulos = req.body.titulos
    persona.foto = req.body.foto
    persona.fechaBaja = req.body.fechaBaja
    persona.motivoBaja = req.body.motivoBaja
    persona.curriculum= req.body.curriculum

    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                        persona.save((err,personaStored)=> {
                          if(err) res.status(500).send({msg:`Error al guardar en la Base de Datos:${err}`})
                          res.json({persona: personaStored})
                        })
                   } 
    });

 
}

function deletePersona(req,res){
    let personaId = req.params.personaId

     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                     
			Persona.findByIdAndRemove(personaId, (err, persona) => {
		        if (err) return res.status(500).send(err);
		        const response = {
			      message: "Persona satisfactoriamente borrada",
			      id: persona._id
		         };
		        return res.status(200).send(response);
	               });
                  } 
         });



}


function updatePersona(req,res){
    let personaId= req.params.personaId
    let update= req.body
    console.log('POST /api/persona/:PersonaId ***Update Persona***')
    console.log(req.body)

     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                           Persona.findByIdAndUpdate(personaId, update, (err, personaUpdate)=>{
                                 if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                                 res.json({persona: personaUpdate})
                           });
                    } 
    });
}


module.exports ={
    	getPersonaId,
    	getPersonaDni,
    	getPersonas,
    	savePersona,
	deletePersona,
	updatePersona	
}