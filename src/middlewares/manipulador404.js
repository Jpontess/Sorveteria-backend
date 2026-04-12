function manipulador404 (req, res, next){
    res.status(404).send({
        mensagem: "Erro: Página não encontrada."
    })
}

export default manipulador404