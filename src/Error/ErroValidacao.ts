import RequisicaoIncorreta from './RequisicaoIncorreta.ts';

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro: Error) {
    const mensagemErro = Object.values(erro.message)
      .map(erro => erro)
      .join('; ');

    super(`O seguinte erro aconteceu: ${mensagemErro}`);
  }
}

export default ErroValidacao;