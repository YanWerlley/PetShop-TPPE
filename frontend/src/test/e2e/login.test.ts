import { WebDriver, By, until } from 'selenium-webdriver';
import { setupDriver, teardownDriver, BASE_URL } from './setup';

describe('Login Tests', () => {
  let driver: WebDriver;
  
  beforeAll(async () => {
    driver = await setupDriver();
  });
  
  afterAll(async () => {
    await teardownDriver(driver);
  });
  
  beforeEach(async () => {
    await driver.get(`${BASE_URL}/login`);
    // Esperar que a página carregue completamente
    await driver.wait(until.elementLocated(By.id('login-form')), 10000);
  });
  
  test('Deve exibir mensagem de erro com credenciais inválidas', async () => {
    // Preencher formulário com credenciais inválidas
    await driver.findElement(By.id('username')).sendKeys('usuario_invalido');
    await driver.findElement(By.id('password')).sendKeys('senha_invalida');
    
    // Clicar no botão de login
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Esperar pela mensagem de erro
    const errorMessage = await driver.wait(
      until.elementLocated(By.className('error-message')),
      5000
    );
    
    // Verificar se a mensagem de erro está visível
    expect(await errorMessage.isDisplayed()).toBe(true);
    expect(await errorMessage.getText()).toContain('Credenciais inválidas');
  });
  
  test('Deve fazer login com sucesso usando credenciais válidas', async () => {
    // Preencher formulário com credenciais válidas
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('admin');
    
    // Clicar no botão de login
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Esperar pelo redirecionamento para a página inicial após login
    await driver.wait(until.urlContains('/dashboard'), 5000);
    
    // Verificar se o usuário está logado (verificando elemento que só aparece após login)
    const userMenu = await driver.wait(
      until.elementLocated(By.className('user-menu')),
      5000
    );
    
    expect(await userMenu.isDisplayed()).toBe(true);
  });
});
