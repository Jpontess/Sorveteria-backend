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
      cep: {
        type: String,
        required: [true, 'O CEP é obrigatório.'],
      },
      rua: {
        type: String,
        required: [true, 'A rua/avenida é obrigatória.'],
      },
      numero: {
        type: String,
        required: [true, 'O número é obrigatório.'],
      },
      complemento: {
        type: String,
        default: '',
      },
      bairro: {
        type: String,
        required: [true, 'O bairro é obrigatório.'],
      },
      cidade: {
        type: String,
        required: [true, 'A cidade é obrigatória.'],
      },
      estado: {
        type: String,
        required: [true, 'O estado é obrigatório.'],
      },
      pontoReferencia: {
        type: String,
        default: '',
      },
    },
    
   
    items: [
      {
        product: {
          type: String,
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