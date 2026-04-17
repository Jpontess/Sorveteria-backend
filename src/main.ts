import express from 'express';
import router from './routes/healthRoutes.js';
import index from './routes/index.ts';
import { connection } from '../src/config/connetion.ts';

const app = express();

// conexão com o banco de dados
connection();
app.use(express.json());
app.use(router, index);

app.listen(3000, () => {
    
});


export default app;