const Sequelize = require("sequelize"); 

// Conexão com banco de dados
const sequelize = new Sequelize("postapp", "root", "",{
    host: "localhost",
    dialect: "mysql"
})

// Exportando modulo para usar em outras paginas
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}