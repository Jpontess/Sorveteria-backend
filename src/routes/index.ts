import { Router } from 'express';
const app = Router();
import healthRotas from './healthRoutes.ts';
import loginRotas from './loginRoutes.ts';
import productRotas from './productRoutes.ts';



app.use('/health', healthRotas);
app.use('/auth',loginRotas);
app.use('/product', productRotas);

export default app;