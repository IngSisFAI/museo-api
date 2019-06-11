'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const PolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  }
});

const AreaSchema = new Schema({
  idArea: String,
  nombre: String,
  idCiudad: {type: Number, ref: 'Ciudad'},
  idProvincia: {type: Number, ref: 'Provincia'},
  idPais: {type: Number, ref: 'Pais'},
  locacion: PolygonSchema
});

module.exports = mongoose.model('Area', AreaSchema);

// mongoose.connection.on('open', function () {
//     A.on('index', function (err) {
//       if (err) return done(err);
//       A.create({ loc: { type: 'Point', coordinates: [-179.0, 0.0] }}, function (err) {
//         if (err) return done(err);
//         A.find({ loc: { $near: { type: 'Point', coordinates:[-179.0, 0.0] }}}, function (err, docs) {
//           if (err) return done(err);
//           console.log(docs);
//           done();
//         })
//       })
//     })
//   });
