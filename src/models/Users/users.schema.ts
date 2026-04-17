import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Já exite um usuário com esse nome.']
  },
  password: String
}, {
  timestamps: true,
});

export const User = mongoose.model('User', userSchema);
