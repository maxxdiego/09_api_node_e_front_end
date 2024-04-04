# Essa aplicação Python está recebendo e enviando dados para uma API Node

# Importando a biblioeca requests
import requests

# Função que realiza o login na API com um usuário e senha já definidos
def loginAPI():
    user = {
        'email' : 'admin@email.com',
        'password' : 'admin'
    }
    # Endpoint que realiza a autenticação
    url = 'http://localhost:4000/auth'
    # Enviando os dados de usuário para API
    response = requests.post(url, json=user)
    
    # Verifica a resposta da API (status code 200: Requisição bem sucedida)
    if response.status_code == 200:
        # Recebe o token de autenticação
        token = response.json()
        # Cria uma variável global para enviar o token no cabeçalho da requisição (header)
        global headers
        headers = {
            'authorization' : f'Bearer {token['token']}'
        }
        print('Login na API efetuado com sucesso!')
    else:
        # Em caso de falha, imprime o erro no console
        print('Falha ao enviar dados para a API:', response.text)

# Invocando a função para realizar o login na API
loginAPI()

# Função para enviar dados para API (cadastrar jogos)
def cadastrarGames():
    # Endpoint para cadastrar um jogo (POST)
    url = 'http://localhost:4000/game'
    # Dados a serem enviados para a API 
    data = {
        'title': 'Exemplo de Jogo',
        'year': 2022,
        'price': 49.99
    }
    # Realiza uma requisição do tipo POST enviando os dados para a API e também o token de autenticação no cabeçalho (headers)
    response = requests.post(url, json=data, headers=headers)
    
    # Verifica a resposta da API
    if response.status_code == 200:
        print('Dados enviados com sucesso para a API!')
    else:
        print('Falha ao enviar dados para a API:', response.text)

# Invocando a função para cadastrar dados na API  
cadastrarGames()

# Função para listar os dados da API
def listarGames():
    # Endpoint para obter a lista de jogos
    url = 'http://localhost:4000/games'
    # Realiza uma requisição do tipo GET e envia o token de autenticação no cabeçalho da requisição (headers)
    response = requests.get(url, headers=headers)
    # Verifica se a requisição foi bem sucedida (status code 200)
    if response.status_code == 200:
        # Armazena em gamesjson a lista de jogos
        gamesjson = response.json()

        # Exiba os dados JSON no console
        print("Dados recebidos da API:")
        for g in gamesjson['games']:
            print(f' Título: {g['title']}')
            print(f' Ano: {g['year']}')
            print(f' Preço: {g['price']}')
            print()
    else:
        # Em caso de falha, imprime o erro no console
        print("Erro ao fazer a requisição:", response.status_code)

# Invocando a função para listar os dados da API
listarGames()


