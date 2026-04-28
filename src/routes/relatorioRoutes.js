import { Router } from 'express'
const router = Router()


import { Listar } from "../../Controllers/relatoriosController.js"

router.get("/",Listar)

export default router