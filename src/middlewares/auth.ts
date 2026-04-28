import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const authMiddlwares = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token){
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'Erro de configuração do servidor' });
    }
    const decoded = jwt.verify(token, jwtSecret);
    next();
    return decoded;
    

  } catch (error) {
    return res.status(403).json(
      {
        message: 'Token invalido',
        error: error
      }
    ); 
  }

};