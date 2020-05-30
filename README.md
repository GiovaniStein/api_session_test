# api_session_test
API REST 

Resumo:
No cooperativismo, cada associado possui um voto e as decisões são tomadas em assembleias, por votação. Imagine que você deve criar uma solução backend para gerenciar essas sessões de votação.

# Técnologias utilizadas: 
NodeJS

# Banco de dados:
Postgressql

# Bibliotecas/Framework:
**express**: framework web, utilizado para fazer o server http da aplicação.<br/>
**pg**: driver de conexão com postgressql.<br/>
**db-migrate**: faz a criação e migração do banco de dados.<br/>
**nodemon**: usado para desenvolvimento, reiniciando automaticamente o aplicativo quando há alguma alteração.<br/>
**axios**: utilizado para fazer requisições http para serviços externos.<br/>
**cors**: permite a utilização e configuração do CORS em requisições http.<br/>
**dotenv**: permite utilização de variaveis de configuração de arquivos .env.<br/>

# Como Utilizar:

**OBS**: Os comandos a seguir devem ser executados na pasta raiz da aplicação. Por padrão o server inicializa na porta 3333.

**yarn install** => instalar dependências da aplicação.<br/>
**yarn start** => inicializa o server http.<br/>
**yarn dev** => inicializa o server http em modo desenvolvimento.<br/>

# Endpoints:

**//POST**

**Cadastrar um usuário** => /usuario

body:
{
	"name": "name",
	"email": "teste@teste.com",
	"cpf": "1111111111",
	"password": "teste"
}

**OBS**: Não será possível cadastra usuário com cpf inválido, foi feita uma integração com o serviço que verifica o mesmo.

**Cadastrar uma pauta** => /pauta

body:
{
	"name": "pauta",
	"description": "pauta1"
}

**Cadastrar uma sessão** => /sessao

body:
{
	"init": "30/05/2020 09:30",
	"close": "30/05/2020 11:00",
	"pautaId": "1"
}

**Cadastrar um voto** => /voto

body:
{
	"sessaoId": 2,
	"cpf": 1111111111,
	"value": 1
}

**OBS**: Valor 1 = Sim e 0 = Não


**//GET**

**Listagem das pautas que possuem sessões futuras** => /pauta

**OBS**: Só retorna as pautas que tiverem a data fechamento maior que o horário atual

**Retorna os resultados de uma determinada sessão** => /sessao?sessaoId={sessaoId}

**OBS**: Só retorna o resultado caso a sessão já tenho terminado.





    

