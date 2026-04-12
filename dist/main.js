import express, { json } from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
export default app;
//# sourceMappingURL=main.js.map