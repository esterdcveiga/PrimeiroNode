const express = require('express')
const app = express()
const pg = require('pg')
const bcrypt = require('bcrypt')
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const conStr = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString: conStr })

app.post('/usuarios', (req, res) => {
    var usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        perfil: req.body.perfil
    }
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'erro ao conectaro no database'
            })
        }
        bcrypt.hash(req.body.senha, 10, (error, hash) => {
            if (error) {
                return res.status(500).send({ message: 'erro de autenticação' })
            }
            var sql = 'insert into usuario(nome, email, senha, perfil) values($1, $2, $3, $4)'
            var dados = [req.body.nome, req.body.email, hash, req.body.perfil]
            client.query(sql, dados, (error, result) => {
                if (error) {
                    return res.status(500).send({
                        message: 'erro ao inserir'
                    })
                }
            })
            return res.status(201).send({
                message: 'cadastrado'
            })
        })


    })
})



app.listen(port, () => { console.log(`executando em http://localhost:${port}`) })