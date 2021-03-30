'use strict'

const express = require('express')
const bodyParser = require('body-parser')

//agrego MULTER para menejo de archivos
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './archivo')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

//--------------------------------

const app = express()

const api = require('./routers')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Acess-Control-Allow-Headers', 'Content-Type');
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})

app.use('/api', api)

//ruta de prueba para subir archivos
app.post('/subir', upload.single('archivo'), (req, res) => {
    console.log(req.file);
    res.send('Archivos se subieron correctamente')
})

module.exports = app