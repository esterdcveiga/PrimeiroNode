const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var produtos = []

app.get('/produtos', (req, res) => {
    res.send({
        message: 'endpoint de produtos',
        produtos: produtos
    })
})
app.get('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    res.send({
        message: 'endpoint de produto por id',
        produto: produtos[idp]

    })
})
app.post('/produtos', (req, res) => {
    var produto = {
        id: produtos.length,
        descricao: req.body.descricao,
        preco: req.body.preco
    }
    produtos.push(produto)
    res.send({
        message: 'cadastro de produtos',
        produtoEnviado: produto
    })
})
app.put('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    var produto = {
        id: idp,
        descricao: req.body.descricao,
        preco: req.body.preco
    }
    produtos[idp] = produto
    res.send({
        message: 'alteração de produto',
        produtoAlterado: produto
    })
})

app.delete('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    var existe = false
    var i = 0
    while (existe == false && i < produtos.length) {
        let produto = produtos[i]
        if (produto.id == idp) {
            existe == true
        }
        i++
    }
    if (existe) {
        produtos.splice(idp, 1)
        res.send({
            message: 'produto removido',
            produtos: produtos
        })
    }else{
        res.send({
            message: 'produto não encontrado'
        })
    }

})

app.listen(port, () => { console.log(`executando em http://localhost:${port}`) })