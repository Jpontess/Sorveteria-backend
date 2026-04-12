import mongoose, { model } from 'mongoose'

const {Schema} = mongoose

const productSchema = new Schema({
        name: {
            type: String, 
            required:[true, 'Nome é obrigatório.']
        },
        description: {
            type: String,
            required:[true, 'Descrição é obrigatória.']
        },
        price: {
            type: Number,
            required:[true, 'Preço é obrigatória.']
        },
         image:{
            type: String
        },
        category: {type: String},
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
)

const Product = model('Produto', productSchema)

export default Product