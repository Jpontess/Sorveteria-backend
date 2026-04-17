import { Router } from 'express';
const app = Router();
import healthRotas from './healthRoutes.ts';
import loginRotas from './loginRoutes.ts';

app.use('/health', healthRotas);
app.use('/auth',loginRotas);

export default app;