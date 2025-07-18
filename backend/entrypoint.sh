#!/bin/bash
set -e

# Esperar o MySQL iniciar
echo "Aguardando o MySQL iniciar..."
sleep 10

# Executar todos os testes
echo "Executando testes unitários..."
mvn test -Dtest=*ServicoTest -Dmaven.test.failure.ignore=true

echo "Executando testes parametrizados..."
mvn test -Dtest=*ParameterizedTest,AnimalServicoTest -Dmaven.test.failure.ignore=true

echo "Executando testes de integração..."
mvn test -Dtest=*IntegracaoTest -Dspring.profiles.active=test -Dmaven.test.failure.ignore=true

# Iniciar a aplicação
echo "Iniciando a aplicação Spring Boot..."
java -jar app.jar
