const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var produtos = [
    {
        id: 1,
        descricao: 'milho',
        preco: 7.99
    },
    {
        id: 2,
        descricao: 'arroz',
        preco: 5.50
    }
]

app.get('/produtos', (req, res) => {
    res.status(200).send({
        //produtos: 'lista de produtos'
        produtos: produtos
    })
})

app.get('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    var produto = ''
    for (const prod of produtos) {
        if (prod.id == idp) {
            produto = prod
        }
    }
    if (produto == '') {
        res.status(404).send({
            message: 'não encontrado'
        })
    } else {
        res.status(200).send(produto)
    }
})

app.post('/produtos', (req, res) => {
    var produto = {
        id: produtos.length + 1,
        descricao: req.body.descricao,
        preco: req.body.preco
    }
    produtos.push(produto)
    res.status(201).send({
        message: 'produto inserido com sucesso',
        produtoEnviado: produto
    })
})

app.put('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    var produto = '' //{
    //     id: req.body.id,
    //     descricao: req.body.descricao,
    //     preco: req.body.preco
    // }
    for (const prod of produtos) {
        if (prod.id == idp) {
            prod.descricao = req.body.descricao
            prod.preco = req.body.preco
            produto = prod
        }
    }
    if (produto == '') {
        res.status(404).send({
            message: 'não encontrado'
        })
    } else {
        res.status(200).send(produto)
    }
})

app.delete('/produtos/:idproduto', (req, res) => {
    var idp = req.params.idproduto
    var existe = false
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == idp) {
            produtos.splice(i, 1)
        }
    }
    res.status(200).send({message:'removido com sucesso'})
    //var i = 0
    // while (existe == false && i <= produtos.length) {
    //     let produto = produtos[i]
    //     if (produto.id == idp) {
    //         existe == true
    //     }
    //     i++
    // }
    // if (existe) {
    //     produtos.splice(idp - 1, 1)
    //     res.send({
    //         message: 'produto removido',
    //         produtos: produtos
    //     })
    // } else {
    //     res.send({
    //         message: 'produto não encontrado'
    //     })
    // }

})

app.listen(port, () => { console.log(`executando em http://localhost:${port}`) })