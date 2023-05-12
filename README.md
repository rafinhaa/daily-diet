<h4 align="center">
  <img src="docs/images/logo.svg" alt="Logo" />
</h4>

<h4 align="center">
    <p align="center">
      <a href="#-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-how-to-run-the-project">Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-info">Info</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-license">License</a>
  </p>
</h4>

## 🔖 About

O Daily Diet é uma API desenvolvida para o controle de dieta diária de um usuário. Com essa API é possível registrar uma refeição, identificar o usuário entre as requisições, editar e apagar uma refeição. Além disso, a API permite listar todas as refeições de um usuário, visualizar uma única refeição e recuperar as métricas de um usuário, incluindo a quantidade total de refeições registradas, quantidade total de refeições dentro da dieta, quantidade total de refeições fora da dieta e a melhor sequência por dia de refeições dentro da dieta.

A criação de um usuário é possível na API, permitindo que apenas o próprio usuário possa visualizar, editar e apagar as refeições que ele criou.

- [Detalhes](docs/ABOUT.md)

## 🚀 Technologies

- [Nodejs](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Knex](https://knexjs.org/)

## 🏁 How to run the project

```sh
# Clone the repository
git clone https://github.com/rafinhaa/daily-diet.git
cd daily-diet

# Install the dependencies
yarn install

# Make a copy of '.env.example' to '.env'
cp .env.example .env

# Start the application
yarn run dev
```

## ℹ️ Info

### Documentação das rotas

- [Docs](docs/API.md)

## 📄 Changelog

## 📝 License

[MIT](LICENSE.txt)

**Free Software, Hell Yeah!**
