const http = require('http')
const {Server} = require('socket.io')
const dotenv = require('dotenv')

dotenv.config()

const app = require('./app')
const conexao = require('./config/connetion')
const { Socket } = require('dgram')

const PORT = process.env.PORT || 8080

const startDb = async () =>{
    await conexao()

    const server = http.createServer(app)

    const io = new Server(server,{
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    app.set('io',io)

    io.on('connect', (socket) => {
        console.log('Novo cliente conectado ID:', socket.id)

        socket.disconnect('disconnect', (socket)=>{
            console.log('Cliente desconectado', socket.id)
        })
    })

    server.listen(PORT, () =>{
        console.log(`Servidor rodando (HTTP + WebSocket) na porta http://localhost:${PORT}`)
    }) 
}

startDb()
