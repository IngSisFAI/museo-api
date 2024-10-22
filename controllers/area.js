'use strict';
const servicioArea = require('../services/area');

const crearArea = (req, res) => servicioArea.crearArea(req, res);

const obtenerArea = (req, res) => servicioArea.getAreaById(req, res);

const getArea = (req, res) => servicioArea.getArea(req, res);

const setArea = (req, res) => servicioArea.setArea(req, res);

const modificarArea = (req, res) => servicioArea.modificarArea(req, res);

const eliminarArea = (req, res) => servicioArea.eliminarArea(req, res);

const getAreas = (req, res) => servicioArea.getAreas(req, res);

module.exports = {
    crearArea,
    obtenerArea,
    getArea,
    setArea,
    modificarArea,
    eliminarArea,
    getAreas
};