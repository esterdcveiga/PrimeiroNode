const express = require('express')
const app = express()
const pg = require('pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
const conStr = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString: conStr })

app.post('/usuarios', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'erro ao conectar no database'
            })
        }
        var sql1 = 'select * from usuario where email = $1'
        var dados1 = [req.body.email]
        client.query(sql1, dados1, (error, result) => {
            if (result.rowCount > 0) {
                return res.status(201).send({ message: 'já existe um usuário cadastrado com esse email' })
            } else{
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
            }
        })

        
    })
})

app.post('/usuarios/login', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'erro ao conectaro no databaseconexão não autorizada'
            })
        }
        var sql = 'select * from usuario where email = $1'
        var dados = [req.body.email]
        client.query(sql, dados, (error, result) => {
            if (error) {
                return res.status(500).send({ message: 'erro ao selecionar usuário' })
            }
            if (result.rowCount > 0) {
                bcrypt.compare(req.body.senha, result.rows[0].senha, (erro, results) => {
                    if (erro) {
                        return res.status(401).send({
                             message: 'falha de autenticação' 
                            })
                    }
                    if (results) {
                        //gerar token
                        let token = jwt.sign({
                            nome: result.rows[0].nome,
                            email: result.rows[0].email,
                            perfil: result.rows[0].perfil
                        }, 'segredo', { expiresIn: '1h' })
                        return res.status(200).send({
                            message: 'conectado com sucesso',
                            token: token
                        })
                    } 
                    return res.status(401).send({message:'senha não confere'})
                })
            } else{
                return res.status(401).send({message:'usuário não encontrado'})
            }
        })
    })
})

app.listen(port, () => { console.log(`executando em http://localhost:${port}`) })