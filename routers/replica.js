var express = require('express');
var router = express.Router();

const replicaCtrl = require('../controllers/replica')

router.post('/', replicaCtrl.saveReplica)
router.get('/:id', replicaCtrl.getReplica)
router.get('/', replicaCtrl.getReplicas)
router.put('/:id', replicaCtrl.updateReplica)

module.exports = router;