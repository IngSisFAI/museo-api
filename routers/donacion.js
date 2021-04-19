var express = require('express');
var router = express.Router();

const donacionCtl = require('../controllers/donacion')

router.get('/', donacionCtl.getDonaciones)

module.exports = router