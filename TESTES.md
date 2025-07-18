# Documentação de Testes - PetShop API

## Visão Geral

Este documento descreve os testes implementados para a API PetShop, incluindo testes unitários e parametrizados para serviços e controladores.

## Tipos de Testes Implementados

### 1. Testes Unitários de Serviços
- **ClienteServicoTest**: Testes para operações CRUD de clientes e adição de pets
- **PetServicoTest**: Testes para operações CRUD de pets e listagem por dono
- **VacinaServicoTest**: Testes para operações CRUD de vacinas
- **AnimalServicoTest**: Testes para classificação de animais e definição de porte

### 2. Testes Parametrizados
- **VacinaServicoTest**: Testes com `@EnumSource` para diferentes tipos de animais
- **PetServicoTest**: Testes parametrizados para validação de idades
- **AnimalServicoTest**: Testes parametrizados para classificação de diferentes tipos de animais

### 3. Testes de Controladores
- **VacinaControladorTest**: Testes de endpoints REST para o controlador de vacinas
- **HelloWorldControllerTest**: Testes básicos para o controlador de exemplo

## Técnicas de Teste Utilizadas

### Mocking
Utilizamos Mockito para simular o comportamento dos repositórios, permitindo testar os serviços de forma isolada.

```java
@ExtendWith(MockitoExtension.class)
public class ClienteServicoTest {
    @Mock
    private ClienteRepositorio clienteRepositorio;
    
    @InjectMocks
    private ClienteServico clienteServico;
}
```

### Testes Parametrizados
Implementamos testes parametrizados usando diferentes fontes de dados:

1. **@EnumSource**: Para testar com todos os valores de um enum
```java
@ParameterizedTest
@EnumSource(TipoAnimal.class)
void testSalvarVacinaComDiferentesTiposDeAnimais(TipoAnimal tipoAnimal) {
    // Test implementation
}
```

2. **@CsvSource**: Para testar com múltiplos conjuntos de dados
```java
@ParameterizedTest
@CsvSource({
    "Antirrábica, 2023-12-31",
    "V8, 2024-06-30",
    "Gripe Felina, 2025-01-15"
})
void testSalvarVacinaComDiferentesNomesEDatas(String nome, String dataValidade) {
    // Test implementation
}
```

3. **@MethodSource**: Para casos de teste mais complexos
```java
@ParameterizedTest
@MethodSource("provideAnimaisParaClassificacao")
void testClassificarAnimal(AnimalDTO animalDTO, String classificacaoEsperada) {
    // Test implementation
}

static Stream<Arguments> provideAnimaisParaClassificacao() {
    return Stream.of(
        Arguments.of(new CachorroDTO("Rex", "Labrador", 3), "CACHORRO"),
        Arguments.of(new GatoDTO("Felix", "Siamês", 2), "GATO")
    );
}
```

## Cobertura de Testes

Os testes cobrem:
- Fluxos principais de todos os serviços
- Casos de exceção (ex: entidade não encontrada)
- Validações de regras de negócio
- Endpoints REST dos controladores

## Como Executar os Testes

Criamos scripts PowerShell para facilitar a execução dos testes:

1. **run-service-tests.ps1**: Executa todos os testes de serviço individualmente
2. **run-controller-tests.ps1**: Executa os testes de controladores
3. **run-all-tests.ps1**: Executa todos os testes unitários e parametrizados

## Resultados dos Testes

Todos os 21 testes implementados estão passando com sucesso, demonstrando a robustez da implementação.
