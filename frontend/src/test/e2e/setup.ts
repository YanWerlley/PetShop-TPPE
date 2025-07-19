import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

// Configuração do driver do Selenium
export async function setupDriver(): Promise<WebDriver> {
  // Configurar opções do Chrome
  const options = new chrome.Options();
  
  // Adicionar opções para execução em ambiente de CI/CD se necessário
  // options.addArguments('--headless');
  // options.addArguments('--no-sandbox');
  // options.addArguments('--disable-dev-shm-usage');
  
  // Criar e retornar o driver
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

// Função para encerrar o driver
export async function teardownDriver(driver: WebDriver): Promise<void> {
  if (driver) {
    await driver.quit();
  }
}

// URL base para os testes
export const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
