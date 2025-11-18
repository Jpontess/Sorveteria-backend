const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'O nome do cliente é obrigatório.'],
    },
    customerPhone: {
      type: String,
      required: [true, 'O telefone é obrigatório.'],
    },
    address: {
      type: String,
      required: [true, 'O endereço é obrigatório.'],
    },
    
   
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product', 
          required: true,
        },
        name: String, 
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pendente', 'Em Preparo', 'Pronto para Entrega', 'Concluído', 'Cancelado'],
      default: 'Pendente',
    },

    paymentMethod: {
      type: String,
      enum: ['PIX', 'Dinheiro', 'Cartão'],
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Order', orderSchema);