const express = require('express')
const app = express()
const pg = require('pg')
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//string de conexão, está armazenando o endereço do banco de dados
const conStr = process.env.DATABASE_URL

// connection pool é um objeto que irá gerenciar as conexões, para abrir, fechar e reutilizar conforme possível. Este único pool ficará guardado em uma variável global, que é testada logo no início da execução para garantir que se já houver um pool, que ele será utilizado.
//pool de conexão utilizando a string de conexão
const pool = new pg.Pool({ connectionString: conStr })


app.get('/conexao', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.send({
                message: 'erro ao conectaro no database',
                err: err.message
            })
        }
        return res.send({
            message: 'conectado com sucesso'
        })
    })
})

app.get('/produtos', (req, res) => {
    //abrindo a conexão
    pool.connect((err, client) => {
        //verificando se há erro na conexão e retornando o erro caso haja
        if (err) {
            return res.status(401).send({
                message: 'erro ao conectaro no database'
            })
        }
        //não havendo erro na conexão o código sql é enviado
        client.query('select * from produto', (error, result) => {
            //verificando se houve erro no sql enviado
            if (error) {
                //caso haja erro retorna-o
                return res.send({
                    message: 'Erro ao consultar dados',
                    error: error.message
                })
            }
            //caso não haja erro retorna os dados recuperados
            return res.status(200).send(result.rows)
        })
    })
})

app.get('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'erro ao conectaro no database'
            })
        }
        //passando os dados para o código sql 
        client.query('select * from produto where id = $1', [req.params.idproduto], (error, result) => {
            if (error) {
                return res.send({
                    message: 'Erro ao consultar dados',
                    error: error.message
                })
            }
            return res.status(200).send(result.rows[0])
        })
    })
})

app.post('/produtos', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'Erro ao conectaro no database'
            })
        }
        var sql = 'insert into produto(descricao, preco)values($1, $2)'
        var dados = [req.body.descricao, req.body.preco]
        client.query(sql, dados, (error, result) => {
            if (error) {
                return res.send({
                    message: 'Erro ao inserir dados',
                    error: error.message
                })
            }
            return res.status(201).send({message:'Produto inserido com sucesso'})
        })
    })
})

app.put('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'Erro ao conectaro no database'
            })
        }
        var sql = 'update produto set descricao = $1, preco = $2 where id = $3'
        var dados = [req.body.descricao, req.body.preco, req.params.idproduto]
        client.query(sql, dados, (error, result) => {
            if (error) {
                res.send({
                    message: 'Erro ao atualizar dados',
                    error: error.message
                })
            }
            return res.status(200).send({ message: 'atualizado com sucesso' })
        })
    })
})

app.delete('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'Erro ao conectaro no database'
            })
        }
        client.query('delete from produto where id = $1', [req.params.idproduto], (error, result) => {
            if (error) {
                res.send({
                    message: 'Erro ao consultar dados',
                    error: error.message
                })
            }
            return res.status(204).send({ message: 'removido com sucesso' })
        })
    })

})

app.listen(port, () => { console.log(`executando em http://localhost:${port}`) })