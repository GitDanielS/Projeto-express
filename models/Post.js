const bd = require('./bd')

// Aqui esta criando a tabela postagens com a coluna titulo e conteudo
const Post = bd.sequelize.define('postagens',{
    titulo: {
        type: bd.Sequelize.STRING //Sempre o tipo da coluna tem que ser tudo maiusculo
    },
    conteudo: {
        type: bd.Sequelize.TEXT
    }
})

// Post.sync({force: true}) //Comando para executar a criação

module.exports = Post; // Exportando modulos