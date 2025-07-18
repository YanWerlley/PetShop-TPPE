# Script para iniciar o backend do PetShop
Write-Host "Iniciando o backend do PetShop..." -ForegroundColor Green

# Verificar se o Docker está em execução
$dockerRunning = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker não está em execução. Por favor, inicie o Docker Desktop e tente novamente." -ForegroundColor Red
    exit 1
}

# Verificar se o container já existe
$containerExists = docker ps -a --filter "name=petshop-backend" --format "{{.Names}}"
if ($containerExists -eq "petshop-backend") {
    # Se o container já existe, verificar se está em execução
    $containerRunning = docker ps --filter "name=petshop-backend" --format "{{.Names}}"
    if ($containerRunning -eq "petshop-backend") {
        Write-Host "O container petshop-backend já está em execução." -ForegroundColor Yellow
    } else {
        # Se o container existe mas não está em execução, iniciá-lo
        Write-Host "Iniciando o container petshop-backend existente..." -ForegroundColor Yellow
        docker start petshop-backend
    }
} else {
    # Se o container não existe, construir e iniciar
    Write-Host "Construindo e iniciando o backend..." -ForegroundColor Yellow
    
    # Navegar para o diretório do backend
    Set-Location -Path ".\backend"
    
    # Construir o projeto com Maven
    Write-Host "Construindo o projeto com Maven..." -ForegroundColor Yellow
    mvn clean package -DskipTests
    
    # Construir a imagem Docker
    Write-Host "Construindo a imagem Docker..." -ForegroundColor Yellow
    docker build -t petshop-backend .
    
    # Iniciar o container
    Write-Host "Iniciando o container..." -ForegroundColor Yellow
    docker run -d --name petshop-backend -p 8080:8080 petshop-backend
    
    # Voltar para o diretório raiz
    Set-Location -Path ".."
}

# Aguardar alguns segundos para o serviço iniciar
Write-Host "Aguardando o serviço iniciar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verificar se o serviço está respondendo
Write-Host "Verificando se o serviço está respondendo..." -ForegroundColor Yellow
$response = $null
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/hello" -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "Backend iniciado com sucesso!" -ForegroundColor Green
        Write-Host "API disponível em: http://localhost:8080" -ForegroundColor Cyan
        Write-Host "Documentação Swagger disponível em: http://localhost:8080/swagger-ui/index.html" -ForegroundColor Cyan
    } else {
        Write-Host "Backend iniciado, mas não está respondendo corretamente. Status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Não foi possível conectar ao backend. Verifique os logs do container:" -ForegroundColor Red
    Write-Host "docker logs petshop-backend" -ForegroundColor Yellow
}

Write-Host "Para parar o backend, execute: docker stop petshop-backend" -ForegroundColor Cyan
