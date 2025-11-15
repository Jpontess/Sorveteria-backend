const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const conexaoDb = async () =>{
    try{

        await mongoose.connect(MONGO_URI)

        console.log('Conectado no banco de dados MongoDb com Sucesso!')
    }
    catch(error){
        console.error('erro ao connectar no Banco: ', error.message)
        process.exit(1)
    }
}

module.exports = conexaoDb