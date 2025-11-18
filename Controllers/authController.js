const User = require('../models/adminModel')
const jwt = require('jsonwebtoken') 
const dotenv = require('dotenv')

dotenv.config()

const signToken = (id) => {
  return jwt.sign(
    { id: id },
    process.env.JWT_SECRET, 
    {
      expiresIn: process.env.JWT_EXPIRES_IN, 
    }
  )
}

exports.login = async (req, res) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                status: 'Falha',
                message: 'Por favor, forneça email e senha',
            })
        }

        const usuario = await User.findOne({email}).select('+password')

        if(!usuario || !(await usuario.comparePassword(password))){
            return res.status(401).json({
                status: 'falha',
                message: 'E-mail ou senha está incorretos',
            })
        }
  
        const token = signToken(usuario.id)
        res.status(200).json({
            status: 'Sucesso',
            token,
        })

    } catch (error) {
        res.status(400).json({
            status: 'Falha',
            message: error.message,
        })
    }
}

exports.registrar = async (req, res) => {
  try {
    const { email, password } = req.body;


    const novoUsuario = await User.create({
      email,
      password,
    })

    
    res.status(201).json({ 
      status: 'success',
      data: {
        email: novoUsuario.email,
        id: novoUsuario._id,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}