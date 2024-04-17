const express = require("express");
const app = express();
const {engine} = require("express-handlebars")
const bodyParser = require("body-parser");
const Post = require("./models/Post")

// Configurações globais
    //Template Engine
    app.engine('handlebars', engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    // Body Parser para pegar as escritas dos campos do formulario
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas

    // Render utilizado para renderizar para outra pagina
    app.get('/cadastro', function(req, res){
        res.render('formulario')
    })

    app.get('/', function(req, res){
        //pega todos registro no banco de dados
        Post.findAll().then(function(posts){
           if(posts <= 2){
             res.redirect('/cadastro')
           }
           else{
            res.render('home', {posts})
           }
        }).catch(function(erro){
            console.error(erro)
            res.status(500).send("Ocorreu um erro no servidor")
        })
    })

    

    //Post utilizado para formulario aqui quando adicionado as informações no banco de dados ele redireciona para "/"
    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: "+erro)
        })
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            // res.send("Deletado com sucesso!!")
            res.redirect('/')

        }).catch( function(erro){
            res.send("Esta postagem não existe")
        })
    })

//Sempre tem que ser a ultima linha do cod.
app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});