const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true
}

const req_number = {
    type: Number,
    required: true,
}
/*
const empresas_schema = new Schema({
    empresa: {
        type: Schema.ObjectId,
        ref: 'empresa',
    },    
}, {
    timestamps: true,
})
*/
const representanteLegal_schema = new Schema({
    ruc: req_string,
    cedula: req_string,
    nombre: req_string,
    apellido: req_string,
    email: req_string,
    domicilio: req_string,
    telefono: req_number,
    empresas: [{
        type: Schema.ObjectId,
        ref: 'empresa',
    }    ]
}) 

const model = mongoose.model('representantelegal', representanteLegal_schema)
module.exports = model