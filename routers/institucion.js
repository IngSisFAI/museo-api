var express = require('express');
var router = express.Router();

const institucionCtl = require('../controllers/institucion')

router.post('/', institucionCtl.saveInstitucion)
router.get('/', institucionCtl.getInstituciones)
router.get('/:id', institucionCtl.getInstitucion)
router.put('/:id', institucionCtl.updateInstitucion)
router.delete('/:id', institucionCtl.deleteInstitucion)

module.exports = router