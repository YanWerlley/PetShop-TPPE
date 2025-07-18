# PetShop-TPPE

Sistema de Pet Shop utilizando Spring Boot, seguindo arquitetura MVC como discutido em sala de aula com o professor. O projeto implementa um backend completo para gerenciamento de clientes, pets e vacinas.

## Documentação

- [Documentação de Testes](./TESTES.md)
- [Swagger API](http://localhost:8080/swagger-ui/index.html) (disponível após iniciar o backend)

## Tecnologias Utilizadas

- **Backend**: Spring Boot 3.2.0
- **Banco de Dados**: 
  - MySQL (produção)
  - H2 Database (testes)
- **Documentação API**: Swagger/OpenAPI
- **Containerização**: Docker
- **Testes**: 
  - JUnit 5
  - Mockito
  - Testes Parametrizados

## Testes

O projeto inclui 21 testes unitários e parametrizados para os componentes principais, todos passando com sucesso. Para mais detalhes sobre os testes, consulte o arquivo [TESTES.md](./TESTES.md).

### Estrutura de Testes
- `ClienteServicoTest`: Testes para o serviço de clientes
- `PetServicoTest`: Testes para o serviço de pets
- `VacinaServicoTest`: Testes para o serviço de vacinas
- `AnimalServicoTest`: Testes para o serviço de animais
- `VacinaControladorTest`: Testes para o controlador de vacinas

## Como Executar

### Iniciar o Backend

1. Clone o repositório
2. Execute o script PowerShell para iniciar o backend:
```
.\start-backend.ps1
```

3. Acesse:
   - Backend API: http://localhost:8080
   - Documentação Swagger: http://localhost:8080/swagger-ui/index.html

### Executar Testes

Para executar os testes, utilize os scripts PowerShell disponíveis:

```powershell
# Executar todos os testes
.\run-all-tests.ps1

# Executar apenas testes de serviços
.\run-service-tests.ps1

# Executar apenas testes de controladores
.\run-controller-tests.ps1

# Gerar relatório de cobertura de testes
.\run-coverage-report.ps1
```

O relatório de cobertura de testes será gerado na pasta `coverage-report` e pode ser visualizado abrindo o arquivo `coverage-report/index.html` no navegador.

## Estrutura do Projeto

### Backend

- `src/main/java/com/petshop/api/modelo`: Entidades do sistema (Cliente, Pet, Vacina)
- `src/main/java/com/petshop/api/dto`: DTOs para comunicação com o frontend
- `src/main/java/com/petshop/api/repositorio`: Interfaces de repositório para acesso ao banco de dados
- `src/main/java/com/petshop/api/servico`: Serviços com a lógica de negócio
- `src/main/java/com/petshop/api/controlador`: Controladores REST para exposição da API
- `src/main/java/com/petshop/api/config`: Classes de configuração (CORS, Swagger, Jackson)

### Testes

- `src/test/java/com/petshop/api/servico`: Testes unitários para serviços
- `src/test/java/com/petshop/api/controlador`: Testes para controladores

### Scripts

- `run-all-tests.ps1`: Executa todos os testes unitários e parametrizados
- `run-service-tests.ps1`: Executa apenas os testes de serviços
- `run-controller-tests.ps1`: Executa apenas os testes de controladores
- `run-coverage-report.ps1`: Gera relatório de cobertura de testes com JaCoCo
- `start-backend.ps1`: Inicia o backend em um container Docker

## Padrão de Commits

Este projeto segue o padrão de commits:

- `feat(backend)`: Adição de funcionalidades no backend
- `fix(backend)`: Correção de bugs no backend
- `feat(tests)`: Adição ou melhoria de testes
- `refactor`: Refatoração de código sem alterar funcionalidade
- `docs`: Atualização de documentação
- `config`: Alterações em arquivos de configuração
