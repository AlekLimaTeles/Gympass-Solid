# Projeto Daily-Diet 

### Aplicação backend de um software de dieta!

## Tecnologias utilizadas 


- [Vitest](https://vitest.dev/) (Para testes unitários e E2E)
- [Fastify](https://fastify.dev/) (Framework para back-end)
- [ESLint](https://eslint.org/) (Controle de qualidade do codigo)
- [Zod](https://zod.dev/) (Validação de Schema)
- [Knex](https://knexjs.org/) (Query Builder de banco de dados)
- [SQLite](https://www.sqlite.org/index.html) (Banco de dados)

## Models

- Meal
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta

- User
  - Name
  - Email

## Requisitos da aplicação (Rotas)

### / users
- [x] Deve ser possível *criar* um usuário
- [x] Deve ser possível *identificar* o usuário entre as requisições
- [x] Deve ser possível *recuperar as métricas* de um usuário
  - [X] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou


### / meals

- [x] Deve ser possível *registrar uma refeição* feita, com as seguintes informações:

    As refeições devem ser relacionadas a um usuário.
  

- [x] Deve ser possível *listar* todas as refeições de um usuário
- [x] Deve ser possível *visualizar* uma única refeição
- [x] Deve ser possível *editar* uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível *apagar* uma refeição
