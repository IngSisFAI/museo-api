var express = require('express');
var router = express.Router();

const ubicacionInternaCtrl = require('../controllers/ubicacionInterna')

router.post('/', ubicacionInternaCtrl.saveUbicacionInterna)
router.put('/:id', ubicacionInternaCtrl.editUbicacionInterna)
router.get('/:id', ubicacionInternaCtrl.getUbicacionInterna)

module.exports = router