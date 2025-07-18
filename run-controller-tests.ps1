Write-Host "Executando testes de controladores..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

Write-Host "`nExecutando VacinaControladorTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=VacinaControladorTest

Write-Host "`nExecutando HelloWorldControllerTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=HelloWorldControllerTest

Write-Host "`nTodos os testes de controlador foram executados!" -ForegroundColor Green
