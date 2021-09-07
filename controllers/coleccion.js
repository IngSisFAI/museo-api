'use strict'

const Coleccion = require('../models/coleccion')
const jwt = require("jsonwebtoken");



function getColecciones(req, res) {

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {


      var query = Coleccion.find({});

      // sort by nombre
      query.sort({ nombre: 1 });

      // execute the query at a later time
      query.exec(function (err, colecciones) {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        res.json({ colecciones });

      })
    }
  });


}

module.exports ={
    getColecciones
}