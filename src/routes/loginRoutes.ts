import { Router } from 'express';
import { AuthContoller } from '../Controllers/authController.ts';
import { AuthService } from '../services/auth/authService.ts';
import { UserRepository } from '../repository/login/user.repository.ts';
const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

const authContoller = new AuthContoller(authService);

router.post('/login', authContoller.singIn);
router.post('/register', authContoller.register);

export default router;