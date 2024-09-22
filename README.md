###
Essa é uma API construída para consultar os resultados dos testes propostos pela  Target Sistemas no Desafio para a vaga de Dev Backend Jr.

###
 Primeiramente é necessário criar um arquivo .env e definir a porta do servidor
 'PORT=3000' por exemplo.

- Endpoint /target1 para o resultado do desafio do enunciado 1

- Endpoint /target2 para o resultado do desafio do enunciado 2
Basta copiar algum dos itens abaixo e colar no corpo da requisição do método POST
requisicoes: [
                {
                    "id": "a",
                    "values": [1, 3, 5, 7]
                },
                {
                    "id": "b",
                    "values": [2, 4, 8, 16, 32, 64]
                },
                {
                    "id": "c",
                    "values": [0, 1, 4, 9, 16, 25, 36]
                },
                {
                    "id": "d",
                    "values": [4, 16, 36, 64]
                },
                {
                    "id": "e",
                    "values": [1, 1, 2, 3, 5, 8]
                },
                {
                    "id": "f",
                    "values": [2, 10, 12, 16, 17, 18, 19]
                }
            ]

- Endpoint /target3 para o resultado desta questão basta copiar o objeto abaixo e colar no corpo da requisição para a API com o método POST
{
  "values": [100, 200, 300, 400, 500, 0, 0, 20, 600, 700, 800, 900, 0, 0, 258, 1234, 542, 52, 31, 0, 0, 3124, 543, 6532, 7783, 123, 0, 0]
}

- Endpoint /target4 na raiz do projeto basta rodar o comando 'docker compose up-d' para criar o container do docker com o banco de dados PostgreSQL configurar no arquivo .env as seguintes variáveis
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGPORT=5432
PGDATABASE=client_management
No arquivo 'dump.sql' estão os scripts de criação do banco, das tabelas e população das tabelas, basta copia-los e colar e executar um a um no gerenciador de bancos que desejar, ao acessar o endpoint pelo Postman método get será retornado um json com o id do cliente, nome do cliente e um array de telefones que estão cadastrados para este determinado cliente.

- Endpoint /target5 basta chamar pelo Postman usando o método get que irá retornar um json com a mensagem de qual dos veículos está mais próximo da cidade de Ribeirão Preto.
O resultado foi obtido com base no calculo do movimento uniforme, as veriaveis distancia, velocidade de cada veículo e tempo adicional foram definidas inicialmente e uma função foi criada para calcular a distância percorrida por cada veículo em minutos, depois foi calculado o tempo em que os veículos se cruzariam usando a condição while acresentando nela o tempo adicional do veículo, depois foi calculada a distancia de cada um dos veículos em relação à cidade de Ribeirão Preto quando eles se cruzarem, depois as distâncias foram comparadas e retornada uma mensagem em json informando qual dos dois estava mais próximo.