import type { Request, Response } from 'express';
import { AuthService } from '../services/auth/authService.ts';

export class AuthContoller{
  constructor(private readonly service: AuthService){}
  

  register = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const response = await this.service.registerUsers({ name, password });

      return res.status(201).json({
        message: `O usuário${name} foi criado com sucesso`,
        data: response
      });
    } catch (error) {
      return res.status(400).json({
        message: `Falha ao criar usuário ----> ${error}`
      });
    };

  };

  singIn = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const response = await this.service.singIn(name, password);
      return res.status(200).json(response);
    } catch (error) {
      res.status(400).json({
        message: `Erro ao tentar fazer login: ${error}`
      });
    };
  };

};