const express = require('express');

const server = express();

// adiciona o plugin para interpretar o request em formato Json.
server.use(express.json());

var users = ["Gisiona", "Carlos", "Thiago"]


// criando um middleware GLOBAL para interceptar a requisição.
server.use((req,res, next) => {
    console.log("Requisição interceptada.");
    const metodo = req.method;
    const url = req.url;
    const body = req.body;

    console.log("LOG INTERCEPTADO:  Metodo: " + metodo + ", URL: " + url + ", Body: " + body + ", Params: " + req.params);
    //return res.send("Acesso negado.");
    
    // executa a rota requisitada
    return next();
});


// criando um middleware LOCAL para interceptar a requisição.
function checkUserExists(req, res, next) {
    if(!req.body.nome){
        return res.status(400).json({ error: "Nome do usuário é obrigatório. "});
    }
    return next();
};


// Query params = ?nome=gisiona
// Route params = /users/1
// Request body = {"nome":"gisiona"}


// Route params = /users/1
server.get('/users/:index' , (req, res) => {
    console.log(req.params);
    
    const {index} = req.params;
    
    console.log(index);

    return res.json(users[index]);
});


// Query params = ?nome=gisiona
server.get('/users' , (req, res) => {
    console.log(req.query.nome);
    
    const nome = req.query.nome;
    
    console.log(nome);

    return res.json({ mensagem : `Hello ${nome}` });
});

// Query params = ?nome=gisiona
server.get('/users' , (req, res) => {
    console.log(req.query.nome);
    
    const nome = req.query.nome;
    
    console.log(nome);

    return res.json({ mensagem : `Hello ${nome}` });
});


// Request body = {"nome":"gisiona"}
server.post('/users' , checkUserExists,  (req, res) => {
    console.log(req.body);
    
    const {nome, email, telefone } = req.body;
    
    console.log(nome);

    return res.status(201).json({ data : req.body });
});


// Request body = {"nome":"gisiona"}
server.put('/users/:id' , checkUserExists, (req, res) => {
    console.log(req.body);
    
    const {nome, email, telefone } = req.body;
    const id = req.params;
    users[id] = nome;
 
    console.log(users);

    return res.status(201).json({ data :  users });
});


// Request params - Delete
server.delete('/users/:id' , (req, res) => {
    console.log(req.params);

    const id = req.params;
    
    users.splice(id, 1);
 
    console.log(users);

    return res.status(200).json({ mensagem :  "Registro excluído com sucesso." });
});


console.log("Servidor iniciando na porta 5000");


server.listen(5000);