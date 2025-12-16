const Product = require('../models/produto')

exports.createProduct = async (req, res) => {
    try
    {
        const product = await Product.create(req.body)
        

        res.status(201).json({
            status: 'Sucesso',
            data: {
                product,
            },
        })
    }
    catch(error){
        res.status(400).json({
            status: 'Fail',
            message: error.message,
        })
    }
}

exports.listarProdutos = async (req, res) => {
    try{
        const produtos = await Product.find({})

        res.status(200).json({
            status: 'sucesso',
            data: {
                produtos,
            }
        })
    }
    catch(error){
        res.status(400).json({
            status: 'Falha ao listar os Produtos',
            message: error.message,
        })
    }
}

exports.DeletarProduto = async (req, res) =>{
    try{
        const id = req.params.id 
        const produto = await Product.findByIdAndDelete(id)

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
exports.ListarPorId = async(req,res) => {
    try {
        const id = req.params.id

        const produto = await Product.findById(id)
        res.status(200).json({
            status: 'Sucesso',
            data: [
                produto
            ],
        })

    } catch (error) {
        res.status(400).json({
            status:'Falha',
            message: error.message,
        })
    }
}
exports.EditarProduto = async (req, res) =>{
    try {
        const id = req.params.id
        const produtoEditado = req.body

        const produto = await Product.findByIdAndUpdate(
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