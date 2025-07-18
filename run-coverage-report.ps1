# Script para gerar relatório de cobertura de testes
Write-Host "Gerando relatório de cobertura de testes..." -ForegroundColor Green

# Verificar se o Docker está em execução
$dockerRunning = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker não está em execução. Por favor, inicie o Docker Desktop e tente novamente." -ForegroundColor Red
    exit 1
}

# Verificar se o container já existe
$containerExists = docker ps -a --filter "name=petshop-backend" --format "{{.Names}}"
if ($containerExists -eq "petshop-backend") {
    # Se o container existe, usar ele para executar os testes
    Write-Host "Executando testes e gerando relatório de cobertura no container existente..." -ForegroundColor Yellow
    
    # Executar os testes com JaCoCo para gerar relatório de cobertura
    docker exec petshop-backend mvn clean test jacoco:report
    
    # Copiar os relatórios gerados para fora do container
    Write-Host "Copiando relatórios de cobertura do container..." -ForegroundColor Yellow
    docker cp petshop-backend:/app/target/site/jacoco ./coverage-report
    
    Write-Host "Relatório de cobertura gerado com sucesso em ./coverage-report" -ForegroundColor Green
    Write-Host "Abra o arquivo ./coverage-report/index.html no navegador para visualizar o relatório." -ForegroundColor Cyan
} else {
    # Se o container não existe, avisar para iniciar o backend primeiro
    Write-Host "O container petshop-backend não existe. Execute primeiro o script start-backend.ps1" -ForegroundColor Red
    exit 1
}
