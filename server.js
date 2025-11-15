const express = require('express')
const conexao = require('./src/config/connetion')
const dotenv = require('dotenv')
dotenv.config()

const app = require('./app')

const PORT = process.env.PORT || 8080

const startDb = async () =>{
    await conexao()

    app.listen(PORT, () =>{
        console.log(`servidor rodando na porta http://localhost:${PORT}`)
    })
}

startDb()
