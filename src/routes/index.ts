import { Router } from 'express'
const router = Router()

import healthRotas from './healthRoutes.ts'
import loginRotas from './loginRoutes.ts'

router.use('/health', healthRotas)
router.use('/auth',loginRotas)

export default router