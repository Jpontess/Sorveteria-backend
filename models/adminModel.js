const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'O email- é obrigatório'],
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
        select: false
    },
})

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(12); // O "custo" do hash (12 é forte)
    this.password = await bcrypt.hash(this.password, salt); // Substitui a senha pura pela hasheada

  next();
})


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const usuario = mongoose.model('usuario', userSchema)

module.exports = usuario