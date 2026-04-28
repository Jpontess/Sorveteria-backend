import type { Request, Response } from 'express';

function manipulador404 (req: Request, res: Response){
  res.status(404).send({
    mensagem: 'Erro: Página não encontrada.'
  });
}

export default manipulador404;