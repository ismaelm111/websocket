const Model = require('./model')
const ModelRepresentante = require('../representantelegal/model')

async function agregarEmpresa( dato ) {
    const resultado = await new Model( dato )
    const empresa = resultado.save()
    if(dato.representante != null){
        representante = {_id : dato.representante}
        const asignarRepresentante = await ModelRepresentante.findOne(representante)
        asignarRepresentante.empresas.push(resultado._id)        
        const resultadoRepresentante = await asignarRepresentante.save()

    }
    return empresa
}

async function obtenerEmpresa( filtro ) {
    let mi_filtro = {}

    if (filtro.ruc != null) {
        mi_filtro = { ruc: filtro.ruc }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


async function actualizarEmpresa(dato) {
    const nuevo_objeto = await Model.findOne( { ruc: dato.ruc } )

    nuevo_objeto.nombre = dato.nombre 
    nuevo_objeto.domicilio = dato.domicilio
    nuevo_objeto.telefono = dato.telefono
    
    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarEmpresa(dato) {
    const resultado = await Model.deleteOne( {ruc: dato.ruc} )
    return resultado
}

module.exports = {
    agregar:agregarEmpresa,
    obtener:obtenerEmpresa,
    actualizar:actualizarEmpresa,
    eliminar:eliminarEmpresa
}