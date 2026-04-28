import type { Response } from 'express';

class ErrorBase extends Error{
  status: number;

  constructor(mensagem = 'Erro interno do servidor', status = 500) {
    super();
    this.message = mensagem;
    this.status = status; 
  }

  enviarResposta(res: Response){
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status
    });
  }
}

export default ErrorBase;