import { Schema, SchemaTypes, model } from 'mongoose';

const relatorioSchema = new Schema({
  key:{
    type: String,
    required: true,
    unique: true,
    index: true
  },
  orders: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Order'
    }
  ],
  mesNome: { type: String },
  ano: { type: Number },
  isOpen: { type: Boolean, default: true }
});


export default model('RelatoriosMensal', relatorioSchema);