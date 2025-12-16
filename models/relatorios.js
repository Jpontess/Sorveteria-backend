const mongoose = require("mongoose")
const Order = require("./Order")

const  relatorioSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    orders: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Order"
        }
    ],
    mesNome: {type: String},
    ano: {type: Number},
    isOpen: {type: Boolean, default: true}
});


module.exports = mongoose.model("RelatoriosMensal", relatorioSchema)