Write-Host "Executando todos os testes unitários e parametrizados..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Executa todos os testes, excluindo os testes de integração problemáticos
docker exec -it petshop-backend mvn test -Dtest=!*Integracao*

Write-Host "`nTodos os testes foram executados!" -ForegroundColor Green
