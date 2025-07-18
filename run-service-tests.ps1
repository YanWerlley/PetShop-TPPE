Write-Host "Executando testes de serviços..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

Write-Host "`nExecutando ClienteServicoTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=ClienteServicoTest

Write-Host "`nExecutando PetServicoTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=PetServicoTest

Write-Host "`nExecutando VacinaServicoTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=VacinaServicoTest

Write-Host "`nExecutando AnimalServicoTest..." -ForegroundColor Cyan
docker exec -it petshop-backend mvn test -Dtest=AnimalServicoTest

Write-Host "`nTodos os testes de serviço foram executados!" -ForegroundColor Green
