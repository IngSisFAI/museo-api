var express = require('express');
var router = express.Router();

const replicaCtrl = require('../controllers/replica')

router.post('/', replicaCtrl.saveReplica)
router.get('/:_id', replicaCtrl.getReplica)
router.get('/', replicaCtrl.getReplicas)
router.put('/:_id', replicaCtrl.updateReplica)

module.exports = router;