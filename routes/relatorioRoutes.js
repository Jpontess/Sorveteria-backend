const express = require('express')
const router = express.Router()


const relatoriosController = require("../Controllers/relatoriosController")

router.get("/",relatoriosController.Listar)

module.exports = router