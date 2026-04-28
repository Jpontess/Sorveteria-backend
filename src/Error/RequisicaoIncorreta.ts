import ErrorBase from './ErroBase.ts';

class RequisicaoIncorreta extends ErrorBase {
  constructor(mensagem = 'Erro: O tipo de dado não foi encontrado ou está no formato errado.'){
    super(mensagem, 400);
  }
}   

export default RequisicaoIncorreta;