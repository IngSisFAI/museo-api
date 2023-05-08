"use strict";
const express = require("express");
const router = express.Router();
const personaCtrl = require("../controllers/persona");
api.get("/", verifyToken, personaCtrl.getPersonas);
module.exports = router