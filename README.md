# PetShop-TPPE

Sistema de Pet Shop utilizando Spring Boot e React, com arquitetura MVC e deploy completo na AWS. O projeto implementa um backend para gerenciamento de clientes, pets e vacinas, com frontend React e cache Redis.

## Documentação

- [Backlog do Projeto](./docs/backlog.md) - Requisitos e histórias de usuário
- [Diagrama UML](./docs/uml/diagrama.md) - Diagramas de classes e relacionamentos
- [Protótipo Figma](https://www.figma.com/proto/g2NVqMX1SjxlyXw4kcQlUk/PETSHOP?node-id=3-6&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A6) - Design e protótipo interativo

## Deploy na AWS

### URLs de Acesso

- **Frontend**: http://petshop-frontend-tppe.s3-website-us-east-1.amazonaws.com/
- **Backend API**: http://petshop-tppe-api.us-east-1.elasticbeanstalk.com/

### Arquitetura AWS

- **Backend**: AWS Elastic Beanstalk (Java Corretto 17)
- **Banco de Dados**: Amazon RDS MySQL (db.t2.micro)
- **Cache**: Amazon ElastiCache Redis (cache.t2.micro)
- **Frontend**: Amazon S3 (hospedagem de site estático)

## Tecnologias Utilizadas

### Backend

- **Framework**: Spring Boot 3.2.0
- **Banco de Dados**: 
  - MySQL (produção via Amazon RDS)
  - H2 Database (testes locais)
- **Cache**: Redis via Amazon ElastiCache
- **Documentação API**: Swagger/OpenAPI
- **Testes**: JUnit 5, Mockito, Testes Parametrizados

### Frontend

- React 18
- TypeScript
- Styled Components
- React Router DOM
- Axios

## Execução e Deploy

### Execução Local

Para executar a aplicação localmente, utilize o Docker Compose:

```bash
docker-compose up -d
```

Após a inicialização, acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui/index.html

### Credenciais de Acesso

- Usuário: admin
- Senha: admin

## Integração com Redis Cache

O projeto utiliza Redis para cache, melhorando o desempenho das operações de leitura. As principais funcionalidades com cache:

- Lista de pets: Cache por 5 minutos
- Detalhes de pet por ID: Cache por 10 minutos
- Invalidação automática do cache em operações de escrita

## Testes

O projeto inclui 21 testes unitários e parametrizados. Execute-os com:

```powershell
.\run-all-tests.ps1
```

## Estrutura do Projeto

### Backend

- `src/main/java/com/petshop/api/modelo`: Entidades do sistema
- `src/main/java/com/petshop/api/servico`: Serviços com lógica de negócio e cache
- `src/main/java/com/petshop/api/controlador`: Controladores REST
- `src/main/java/com/petshop/api/config`: Configurações (Redis, CORS, etc.)

### Frontend

- `src/components`: Componentes React
- `src/services`: Serviços para comunicação com a API
- `src/pages`: Páginas da aplicação
