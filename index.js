const express = require('express')
const app = express()
const port = process.env.PORT
//const port = 8080

//preparação para receber os dados vindos da url no post
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        message:'inhaí'
    })
})
app.get('/cadastro', (req, res) => {
    res.send({
        message:'tá na página de cadastro'
    })
})
app.get('/contatos', (req, res) => {
    res.send({
        message:'página de cadastro de contatos'
    })
})
app.get('/contatos/:idcontato', (req, res) => {
    res.send({
        message:'endpoint de pesquisa de contatos por id',
        idcontato: req.params.idcontato
    })
})
app.post('/contatos', (req, res) => {
    var contato = {
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone
    }

    res.send({
        message:'endpoint cadastro de contatos',
        contatoEnviado: contato
    })
})
app.put('/contatos/:idcontato', (req, res) => {
    var contato = {
        id: req.params.idcontato,
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone
    }
    res.send({
        message: 'alteração de contato',
        contatoAlterado: contato
    })
})

app.listen(port, () => {console.log(`executando em http://localhost:${port}`)})