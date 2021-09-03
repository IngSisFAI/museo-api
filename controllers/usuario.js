'use strict'
const Usuario = require('../models/usuario')
const jwt = require("jsonwebtoken");


function saveUsuario(req, res) {
  console.log('POST /api/usuario')
  console.log(req.body)

  let usuario = new Usuario()
  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.user = req.body.user
  usuario.password = req.body.password
  usuario.permiso = req.body.permiso


  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido', error: error });
    } else {
      usuario.save((err, usuarioStored) => {
        if (err) res.status(500).send({ msg: `Error al guardar en la Base de Datos:${err}` })
        res.json({ usuario: usuarioStored })
      })
    }
  });


}

function getUsuarios(req, res){

 Usuario.find({},(err,usuarios)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ usuarios });
              } 
         });

    })
    
}

function validaUsuario(req,res){
    console.log('GET /api/validaUsuario')
    console.log(req.query)
      
    let usuario = new Usuario()
    usuario.user = req.query.user
    usuario.password = req.query.password
 

    Usuario.findOne({'user':usuario.user, 'password': usuario.password},(err,user)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
      //si existe usuario genera token y envia el user al front
       jwt.sign({user}, 'museoapigeo21', {expiresIn: '2h'}, (err, token) => {
                  res.json({
                            token, usuario:user
             });
    });                

    
    })

}

function existeUsuario(req, res) {
  console.log('GET /api/existeUsuario')
  //console.log(req.query)

  let usuario = new Usuario()
  usuario.userFind = req.query.usuario

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

      Usuario.findOne({ 'user': usuario.userFind }, (err, usuario) => {
        if (err) return res.status(500).send({ msg: `Error al realizar la peticion: ${err}` })
        res.json({ usuarios: usuario });
      })
    }
  });


}



function deleteUsuario(req,res){


 jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                     
			Usuario.findByIdAndRemove(req.body.id, (err, usuario) => {
		        if (err) return res.status(500).send(err);
		        const response = {
			      message: "Persona satisfactoriamente borrada",
			      id: usuario._id
		         };
		        return res.status(200).send(response);
	               });
                  } 
         });


}

function getUsuarioId(req, res) {
  console.log(req.query)
  let usuarioId = req.query.id

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

      Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ msg: `Error al realizar la peticion: ${err}` })
        res.json({ usuarioId: usuario });
      })
    }
  });


}

function updateUsuario(req,res){
    console.log(req.body)

    let usuarioId= req.body.id
    let update= req.body
    console.log('POST /api/editUsuario Update Usuario......')


    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                           Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate)=>{
                                 if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                                 res.json({usuario: usuarioUpdate})
                           });
                    } 
    });

}



module.exports ={
    saveUsuario,
    getUsuarios,
    validaUsuario,
    existeUsuario,
    deleteUsuario,
    getUsuarioId,
    updateUsuario
}