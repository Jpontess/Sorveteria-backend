const express = require('express')
const router = express.Router()

//(Get) /api/health


router.get('/',(req,res) =>{
    res.status(200).json({
        status: 'online',
        message: 'API está rodando perfeitamente!'
    })
})


module.exports = router