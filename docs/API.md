# Daily Diet API

O [Daily Diet API](https://github.com/rafinhaa/daily-diet) disponibiliza uma API RESTful que permite o acesso ao sistema.

## Métodos

Requisições para a API devem seguir os padrões:

| Método   | Descrição                                             |
| -------- | ----------------------------------------------------- |
| `GET`    | Retorna informações de um ou mais registros.          |
| `POST`   | Utilizado para criar um novo registro.                |
| `PUT`    | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema.                        |

# Rotas

## Usuário [/user]

### Criar novo usuário [/]

Criar novo usuário

- Method `POST`

- Request (application/json)

  - Body

  ```json
  {
    "email": "john.doe@mail.com",
    "password": "password",
    "avatarUrl": "https://api.dicebear.com/6.x/initials/svg?seed=Example",
    "name": "John Doe"
  }
  ```

  - Response example

  ```json
  {
    "user": {
      "id": "f96d87d0-842c-48e8-b935-c5b9b5b1ae8e",
      "email": "john.doe@mail.com",
      "password": "password",
      "avatarUrl": "https://api.dicebear.com/6.x/initials/svg?seed=Example",
      "name": "John Doe"
    }
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `201`  | Usuário criado com sucesso.                                                       |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `409`  | Usuário já existe.                                                                |
| `500`  | Erro no servidor.                                                                 |

### Estatísticas [/user/:userID/stats]

Obter as estatísticas de um usuário

- Method `GET`

- Request (empty)

- Response example

  ```json
  {
    "stats": {
      "totalMeals": 5,
      "dietMeals": 4,
      "nonDietMeals": 1,
      "dietPercentage": 80,
      "bestSequence": 4
    }
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Resposta obtida com sucesso.                                                      |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `404`  | Usuário não encontrado.                                                           |
| `500`  | Erro no servidor.                                                                 |

## Autenticação [/auth]

### Entrar [/signin]

Faz login na api

- Method `POST`

- Request (application/json)

  - Body

  ```json
  {
    "email": "john.doe@mail.com",
    "password": "password"
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Login efetuado com sucesso.                                                       |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Usuário ou senha inválidos.                                                       |
| `500`  | Erro no servidor.                                                                 |

### Sair [/signout]

Fazer logoff na api

- Method `POST`

- Request (empty)

  - Response example

  ```json
  {
    "user": {
      "id": "a006ed66-bea7-4bc9-8572-d6813d0c56b3",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "avatar_url": "https://api.dicebear.com/6.x/initials/svg?seed=John",
      "created_at": "2023-05-10 23:04:43",
      "updated_at": null
    }
  }
  ```

- Response codes

| Código | Descrição                    |
| ------ | ---------------------------- |
| `200`  | Logoff efetuado com sucesso. |
| `401`  | Sem permissão de acesso      |
| `500`  | Erro no servidor.            |

## Refeições [/meal]

### Criar nova refeição [/:mealId]

Criar nova refeição

- Method `POST`

- Request (application/json)

- Body

```json
{
  "name": "Café",
  "description": "Cafezinho da maria",
  "eatedAt": "2020-01-01T00:00:00Z",
  "onTheDiet": true
}
```

- Response example

```json
{
  "meal": {
    "id": "dcf22673-a1bd-42a0-b3c4-af9f26a4a415",
    "name": "22",
    "description": "cafezinho da maria",
    "eatedAt": "2020-01-01T00:00:00Z",
    "onTheDiet": 1,
    "createdAt": "2023-05-10 23:06:23"
  }
}
```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `201`  | Refeição criado com sucesso.                                                      |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Sem permissão de acesso                                                           |
| `404`  | Usuário não encontrado                                                            |
| `500`  | Erro no servidor.                                                                 |

### Apagar refeição [/:mealId]

Criar nova refeição

- Method `DELETE`

- Request (empty)

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Refeição apagada com sucesso.                                                     |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Sem permissão de acesso                                                           |
| `404`  | Refeição não encontrada.                                                          |
| `500`  | Erro no servidor.                                                                 |

### Atualizar refeição [/:mealId]

Criar nova refeição

- Method `PATCH`

- Request (application/json)

  - Body

  ```json
  {
    "name": "suco",
    "description": "suco do pai",
    "eatedAt": "2020-01-01T00:00:00Z",
    "onTheDiet": false
  }
  ```

  - Response example

  ```json
  {
    "meal": {
      "id": "d1c18e91-447d-4e00-8cb2-8892a5753c6c",
      "name": "suco",
      "description": "suco do pai",
      "eatedAt": "2020-01-01T00:00:00Z",
      "onTheDiet": 0,
      "updatedAt": "2023-05-07 15:30:30",
      "createdAt": "2023-05-07 13:28:23"
    }
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Refeição atualizada com sucesso.                                                  |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Sem permissão de acesso                                                           |
| `404`  | Refeição não encontrada.                                                          |
| `500`  | Erro no servidor.                                                                 |

### Todas as refeições [/:userId/all]

Obtém uma lista com todas as refeições

- Method `GET`

  - Response example

  ```json
  {
    "meals": [
      {
        "id": "dcf22673-a1bd-42a0-b3c4-af9f26a4a415",
        "name": "Café",
        "description": "cafezinho da maria",
        "eatedAt": "2020-01-01T00:00:00Z",
        "onTheDiet": 1,
        "createdAt": "2023-05-10 23:06:23",
        "updatedAt": null
      }
    ]
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Lista de refeições atualizada com sucesso.                                        |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Sem permissão de acesso                                                           |
| `500`  | Erro no servidor.                                                                 |

### Uma refeição [/:mealId]

Obtém uma lista com todas as refeições

- Method `GET`

  - Response example

  ```json
  {
    "meal": {
      "id": "f0b346b4-b246-4720-bccb-4858e8714c70",
      "name": "Suco",
      "description": "Suco do pai",
      "eatedAt": "2020-01-01T00:00:00Z",
      "onTheDiet": 0,
      "createdAt": "2023-05-07 14:13:09",
      "updatedAt": "2023-05-07 15:30:30"
    }
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Refeição obtida com sucesso.                                                      |
| `400`  | Erros de validação, campos informados não existem ou parâmetros de url inválidos. |
| `401`  | Sem permissão de acesso                                                           |
| `500`  | Erro no servidor.                                                                 |
