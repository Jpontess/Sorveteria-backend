const mongoose = require('mongoose')

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
        category: {type: String},
        isAvailable: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Produto', productSchema)

module.exports = Product