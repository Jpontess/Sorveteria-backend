import { Error } from 'mongoose'; 
import ErroBase from '../Error/ErroBase.ts';
import RequisicaoIncorreta from '../Error/RequisicaoIncorreta.ts';
import type { Request, Response } from 'express';
import ErroValidacao from '../Error/ErroValidacao.ts';



function validacaoErros(erro: Error, req: Request, res: Response) 
{
  if(erro instanceof Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  }
  else if (erro instanceof Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  }
  else{
    new ErroBase().enviarResposta(res);
  }
    
}

export default validacaoErros;