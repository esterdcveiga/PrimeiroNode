# PrimeiroNode
Projeto criado na aula sobre APIs com Node.js

## Passos para criação e execução do projeto:
### 1- Instalar o Express
usar o comando no terminal:
~~~
npm install express
~~~
### 2- Criar o arquivo index.js, fazer o requires e executar o express
trecho de código com o requires:
~~~javascript
const express = require('express')
const app = express()
~~~
### 3- Instalar o nodemon localmente no projeto
~~~
npm install nodemon
~~~
### 4- Criar o arquivo nodemon.json
Nesse arquivo é criada a variável de ambiente contendo a porta utilizada na aplicação, para manter a informação da porta apenas no servidor, porque é um informação sensível e não deve ficar visível na aplicação
~~~~json
{
    "env":{
        "PORT": 8080
    }
}
~~~~
### 5- Definir a porta no arquivo index.js
Para isso será usada a variável de ambiente criada no arquivo nodemon.json
~~~javascript
const port = process.env.PORT
~~~
### 6- Criar as rotas no arquivo index.js
exemplo de rota:
~~~~javascript
app.get('/', (req, res) => {
    res.send({
        message:'inhaí'
    })
})
~~~~
**observação:** no final do arquivo index.js deve estar o app.listen
~~~javascript
app.listen(port, () => {console.log(`executando em http://localhost:${port}`)})
~~~
### 7- Por último: executar o nodemon no terminal
comando:
~~~
nodemon <nome_do_arquivo.js>
~~~
**observação:** caso o comando não seja r3econhecido adicionar o npx na frente
~~~
npx nodemon <nome_do_arquivo.js>
~~~

## Passos para conexão com o banco de dados
Utilizando o banco de dados PostgreSQL
### 1- Instalar o driver de conexão
É necessário para intermediar a conexão com o banco de dados, e é instalado com os segintes comandos no terminal
~~~~
npm install pg
~~~~
### 2- Criar uma variável de ambiente para armazenar a string de conexão com o banco de dados
No arquivo nodemon.json, onde foi criada anteriormente a variável de ambiente para a porta, agora ficará assim:
~~~~json 
{
    "env":{
        "PORT": 8080,
        "DATABASE_URL": "postgres://<nome_usuario>:<senha>@localhost/<nome_do_database>"
    }
}
~~~~
**observação:** passar as informações do seu banco na string de conexão inserindo seu usuário no lugar de <nome_usuario>, sua senha no lugar de <senha> e o nome do seu database no lugar de <nome_do_database>
### 3- Fazer a requisição do driver de conexão no arquivo .js onde será necessário se conectar com o banco
~~~~javascript
    const pg = require('pg')
~~~~
### 4- Armazenar variável de ambiente que armazena o a string de conexão para uma constante no arquivo .js onde o banco de dados será usado
~~~~javascript
const conStr = process.env.DATABASE_URL
~~~~
### 5- Criar um pool de conexão
connection pool é um objeto que irá gerenciar as conexões, para abrir, fechar e reutilizar conforme possível. Este único pool ficará guardado em uma variável global, que é testada logo no início da execução para garantir que se já houver um pool, que ele será utilizado.
~~~~javascript
const pool = new pg.Pool({ connectionString: conStr })
~~~~
