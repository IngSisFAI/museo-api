"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dupla = Schema({
  nombre: String,
  descripcion: String
});

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const ExcavacionSchema = Schema({
  nombreArea: String,
  codigoCampo: String,
  fechaInicio: Date,
  fechaTermino: Date,
  director: String,
  directorId: String, 
  auxiliares: [String],
  profesionales: [String],
  muestraHome: Boolean,
  tipoHallazgo: String,
  archivosDenuncia: [String], 
  idExploracion: { type: String, ref: "Exploracion" },
  datosGeologicos: String,
  datosTaxonomicos: String,
  idArea: { type: String, ref: "Area" },
  puntoGps: PointSchema,
  idCiudad: { type: String, ref: "Ciudad" },
  idProvincia: { type: String, ref: "Provincia" },
  idPais: { type: String, ref: "Pais" },
  bochonesEncontrados: [String],
  fotosExcavacion: [Dupla],
  videosExcavacion: [String],
 
});

module.exports = mongoose.model("Excavacion", ExcavacionSchema);
