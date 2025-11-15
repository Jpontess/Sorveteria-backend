const ex = require('express')

const mainRouter = require('./src/routes/index')

const app = ex()

app.use(ex.json())

app.use('/api', mainRouter)

module.exports = app