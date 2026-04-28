import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

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
  quantity:{
    type: Number,
    required: [true, 'Quantidade é obrigatória']
  },
  image:{
    type: String
  },
  category: { type: String },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
},
{
  timestamps: true
}
);

const Product = model('Produto', productSchema);

export default Product;