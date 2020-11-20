'use strict'

const Usuario = require('../models/usuario')

function saveUsuario(req,res){
    console.log('POST /api/usuario')
    console.log(req.body)
      
    let usuario = new Usuario()
    usuario.nombre = req.body.nombre
    usuario.apellido = req.body.apellido
    usuario.user = req.body.user
    usuario.password = req.body.password
    usuario.permiso = req.body.permiso
    usuario.userLogin =req.body.userLogin
    usuario.passwordLogin=req.body.passwordLogin


    Usuario.find({'user':usuario.userLogin , 'password': usuario.passwordLogin},(err,usuarios)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!usuarios) return res.status(404).send({message:`No existen usuarios`})

    if(usuarios.length>0) {
                  usuario.save((err,usuarioStored)=> {
                  if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
                  res.status(200).send({usuario: usuarioStored})
                })
        }
      else
      { return res.status(200).send({usuarios: usuarios}) }  
    })

 

   
}

function getUsuarios(req, res){
    Usuario.find({'user':req.query.user , 'password': req.query.password},(err,usuarios)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(usuarios.length>0) {
        Usuario.find({},(err,usuarios)=>{
          if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
          if(!usuarios) return res.status(404).send({message:`No existen usuarios`})
          res.status(200).send({usuarios: usuarios})
       })
 
    }
    else{
        return res.status(200).send({usuarios: usuarios})
    }

 })
    
}

function validaUsuario(req,res){
    console.log('GET /api/validaUsuario')
    console.log(req.query)
      
    let usuario = new Usuario()
    usuario.user = req.query.user
    usuario.password = req.query.password
 

    Usuario.find({'user':usuario.user, 'password': usuario.password},(err,usuarios)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!usuarios) return res.status(404).send({message:`No existen usuarios`})
        res.status(200).send({usuarios: usuarios})
    })

}

function existeUsuario(req, res){
    console.log('GET /api/existeUsuario')
    console.log(req.query)
      
    let usuario = new Usuario()
    usuario.user = req.query.user
    usuario.password = req.query.password
    usuario.userFind=req.query.usuario


    Usuario.find({'user':usuario.user, 'password': usuario.password},(err,usuarios)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!usuarios) return res.status(404).send({message:`No existen usuarios`})

        if(usuarios.length>0) {
               Usuario.find({'user':usuario.userFind},(err,usuario)=>{
               if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
               if(!usuario) return res.status(404).send({message:`No existe usuario`})
               res.status(200).send({usuarios: usuario})
           })
      }
      else
      { return res.status(200).send({usuarios: usuarios})
}  
    })
}

function deleteUsuario(req,res){

  console.log('Params:',req.body)

   Usuario.find({'user':req.body.user, 'password': req.body.password},(err,usuarios)=>{
       if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
       if(!usuarios) return res.status(404).send({message:`No existen usuarios`})

       if(usuarios.length>0) {
              Usuario.findByIdAndRemove(req.body.id, (err, usuario) => {
		if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`});
		const response = {
			message: "Usuario satisfactoriamente borrada",
			id: req.body.id
	
                }; 
              return res.status(200).send({usuarios: response});
       })	       
     }
      else
       { return res.status(200).send({usuarios: usuarios})}  

   })


}

function getUsuarioId(req, res) { 
   console.log(req.query)
    let usuarioId = req.query.id

   Usuario.find({'user':req.query.user, 'password': req.query.password},(err,usuarios)=>{
       if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
       if(!usuarios) return res.status(404).send({message:`No existen usuarios`})

       if(usuarios.length>0) {

              Usuario.findById(usuarioId, (err,usuario)=>{
                   if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
                   if(!usuario) return res.status(404).send({message:`El usuario no existe`})
                   res.status(200).send({usuarioId: usuario})
               })

        }
      else
       { return res.status(200).send({usuarios: usuarios})}  

   })

}

function updateUsuario(req,res){
    console.log(req.body)

    let usuarioId= req.body.id
    let update= req.body
    console.log('POST /api/editUsuario Update Usuario......')

       Usuario.find({'user':req.body.userLogin, 'password': req.body.passwordLogin},(err,usuarios)=>{
       if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
       if(!usuarios) return res.status(404).send({message:`No existen usuarios`})

       if(usuarios.length>0) {
              Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate)=>{
                if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                if(!usuarioUpdate) return res.status(404).send({message:`El usuario Update no Existe`})
                res.status(200).send({usuario: usuarioUpdate})
    
             })
       }
      else
       { return res.status(200).send({usuario: usuarios})}  

       })

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