var Ficheiro = require('../models/ficheiro')

//Devolve a lista de ficheiros
module.exports.listar = () => {
    return Ficheiro
        .find()
        .exec()
}