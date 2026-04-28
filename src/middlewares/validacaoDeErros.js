import { Error } from "mongoose" 
import ErroBase from "../Error/ErroBase.js"
import RequisicaoIncorreta from "../Error/RequisicaoIncorreta.js"
import ErroValidacao from "../Error/ErroValidacao.js"



 function validacaoErros(erro, req, res, next) 
{
    if(erro instanceof Error.CastError){
        new RequisicaoIncorreta().enviarResposta(res)
    }
    else if (erro instanceof Error.ValidationError){
     new ErroValidacao(erro).enviarResposta(res)
    }
    else{
       new ErroBase().enviarResposta(res)
    }
    
}

export default validacaoErros