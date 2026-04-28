import Produto from '../models/produto.js'

export async function createProduct(req, res, next) {
    try
    {
        const product = await Produto.create(req.body)
        

        res.status(201).json({
            status: 'Sucesso',
            data: {
                product,
            },
        })
    }
    catch(erro){
      next(erro)
    }
}

export async function listarProdutos(req, res, next) {
    try{
        const produtos = await Produto.find({})

        res.status(200).json({ 
            status: 'sucesso',
            data: {
                produtos,
            }
        })
    }
    catch(erro){
       next(erro)
    }
}

export async function DeletarProduto(req, res, next){
    try{
        const id = req.params.id 
        const produto = await Produto.findByIdAndDelete(id)

        if(!produto){
            return res.status(404).json({
                status: 'Falha',
                message: `Produto não encontrado com esse id: ${id}`
            })
        }

        res.status(200).json({
            status: 'Sucesso',
            message: `Produto:(${produto.name})(ID: ${produto.id}) foi deletado com sucesso.`
        })
    }
    catch(error){
        res.status(400).json({
            status: 'Falha ao deletar produto',
            message: error.message,
        })
    }
}
export async function ListarPorId(req,res, next) {
    try {
        const id = req.params.id

        const produto = await Produto.findById(id)
        res.status(200).json({
            status: 'Sucesso',
            data: [
                produto
            ],
        })

    } catch (erro) {
       next(erro)
    }
}
export async function EditarProduto(req, res){
    try {
        const id = req.params.id
        const produtoEditado = req.body

        const produto = await Produto.findByIdAndUpdate(
            id,
            produtoEditado,
            {
                new: true
            }
        )

        if(!produto){
            res.status(404).json({
                status:'Sucesso',
                message: 'Produto não foi encotrado'
            })
        }

        res.status(200).json({
            status: 'Sucesso',
            data: [
                produto
            ]
        })

    } catch (error) {
        res.status(400).json({
            status: 'Falha ao editar',
            message: error.message,
        })
    }
}