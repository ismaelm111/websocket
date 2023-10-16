const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

/*
routes.post('/', function(req, res){
    controller.agregarEmpresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 400) )
})
*/

routes.post('/', function(req, res){
    controller.agregarEmpresa( req.body )
        .then((data) => {
            // Emitir una notificación de empresa asignada por WebSocket.
            const asignacionEmpresa = {
                representanteLegalId: req.body.representanteLegalId, // Obtener el ID del representante legal de alguna manera.
                nombreEmpresa: req.body.nombre, // Asegúrate de obtener el nombre de la empresa asignada de alguna manera.
                
            };  
            
            req.io.emit('asignacionEmpresa', asignacionEmpresa);
            console.log('Cliente WebSocket conectado asignacionEmpresa');
            // Respuesta HTTP de éxito.
            response.success(req, res, data, 201);
        })
        .catch((error) => response.error(req, res, error, 400));
});

routes.get('/', function(req, res){
    const filtro = req.body || null
    controller.obtenerEmpresa( filtro )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.put('/', function(req, res){
    controller.actualizarEmpresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.delete('/', function(req, res){
    controller.eliminarEmpresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 400) )
})

module.exports = routes

