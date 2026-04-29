import express from 'express';
import router from './routes/healthRoutes.ts';
import index from './routes/index.ts';
import { connection } from '../src/config/connetion.ts';
import cors from 'cors';

const app = express();

// conexão com o banco de dados
connection();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(router, index);


app.listen(3000, () => {
    
});


export default app;