import { Router } from 'express';
import  {AuthContoller}  from '../Controllers/authController.ts';
const router = Router();

const authContoller = new AuthContoller();

router.post('/login', authContoller.singIn);
router.post('/register', authContoller.register);

export default router;