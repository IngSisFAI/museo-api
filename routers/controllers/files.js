'use strict';
const servicioFile = require('../services/files');

const uploadFile = (req,res) => servicioFile.uploadFile(req,res);
const deleteFile = (req,res) => servicioFile.deleteFile(req,res);
const deleteDirectory = (req,res) => servicioFile.deleteDirectory(req,res);

module.exports = {
    uploadFile,
	deleteFile,
	deleteDirectory
	
};