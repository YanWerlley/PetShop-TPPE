# Script para executar testes automatizados com Selenium
# Autor: Yan Werlley
# Data: 2025-07-19

Write-Host "Iniciando testes automatizados com Selenium..." -ForegroundColor Green

# Verificar se as dependências estão instaladas
$dependencies = @(
    "selenium-webdriver",
    "@types/selenium-webdriver",
    "jest",
    "@types/jest",
    "ts-jest",
    "chromedriver"
)

Write-Host "Verificando dependências necessárias..." -ForegroundColor Cyan
$needsInstall = $false

foreach ($dep in $dependencies) {
    $checkDep = npm list $dep --depth=0 2>$null
    if ($checkDep -like "*ERR!*") {
        Write-Host "Dependência não encontrada: $dep" -ForegroundColor Yellow
        $needsInstall = $true
    }
}

if ($needsInstall) {
    Write-Host "Instalando dependências necessárias..." -ForegroundColor Yellow
    npm install --save-dev selenium-webdriver @types/selenium-webdriver jest @types/jest ts-jest chromedriver
}

# Verificar se o Chrome está instalado
$chrome = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" -ErrorAction SilentlyContinue
if (-not $chrome) {
    Write-Host "AVISO: Google Chrome não encontrado. Os testes podem falhar." -ForegroundColor Red
    Write-Host "Por favor, instale o Google Chrome antes de executar os testes." -ForegroundColor Red
    exit 1
}

# Executar os testes
Write-Host "Executando testes..." -ForegroundColor Green

# Configurar variáveis de ambiente para os testes
$env:TEST_URL = "http://localhost:3000"

# Executar os testes com Jest
npx jest

# Verificar o resultado
if ($LASTEXITCODE -eq 0) {
    Write-Host "Todos os testes foram executados com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Alguns testes falharam. Verifique os logs acima para mais detalhes." -ForegroundColor Red
}
