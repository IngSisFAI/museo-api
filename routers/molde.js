var express = require('express');
var router = express.Router();

const moldeCtl = require('../controllers/molde')

router.get('/', moldeCtl.getMoldes)
router.get('/:id', moldeCtl.getMolde)
router.post('/', moldeCtl.saveMolde)
router.delete('/:id', moldeCtl.deleteMolde)

module.exports = router