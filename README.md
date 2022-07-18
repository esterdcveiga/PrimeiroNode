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
Para isso será usada a variável de ambiente criada no arquivo nodemon.js
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
