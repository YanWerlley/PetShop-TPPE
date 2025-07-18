Write-Host "Executando análise de cobertura de testes..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Executa os testes com o plugin JaCoCo para gerar relatório de cobertura
docker exec -it petshop-backend mvn clean test jacoco:report

Write-Host "`nRelatório de cobertura gerado em target/site/jacoco/index.html" -ForegroundColor Green
