const empresa = require('../components/empresa/interface')
const representante = require('../components/representantelegal/interface')

const routes = function( server ) {
    server.use('/empresa', empresa)
    server.use('/representantelegal', representante)
}

module.exports = routes