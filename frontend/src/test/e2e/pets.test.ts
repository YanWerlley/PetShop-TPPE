import { WebDriver, By, until } from 'selenium-webdriver';
import { setupDriver, teardownDriver, BASE_URL } from './setup';

describe('Pets Management Tests', () => {
  let driver: WebDriver;
  
  beforeAll(async () => {
    driver = await setupDriver();
    // Fazer login antes de todos os testes
    await driver.get(`${BASE_URL}/login`);
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('admin');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/dashboard'), 10000);
  });
  
  afterAll(async () => {
    await teardownDriver(driver);
  });
  
  test('Deve listar pets cadastrados', async () => {
    // Navegar para a página de pets
    await driver.get(`${BASE_URL}/pets`);
    
    // Esperar que a tabela de pets seja carregada
    const petsTable = await driver.wait(
      until.elementLocated(By.className('pets-table')),
      5000
    );
    
    // Verificar se a tabela está visível
    expect(await petsTable.isDisplayed()).toBe(true);
    
    // Verificar se há pelo menos um pet na lista
    const petRows = await driver.findElements(By.css('.pets-table tbody tr'));
    expect(petRows.length).toBeGreaterThan(0);
  });
  
  test('Deve cadastrar um novo pet com sucesso', async () => {
    // Navegar para a página de cadastro de pets
    await driver.get(`${BASE_URL}/pets/new`);
    
    // Esperar que o formulário seja carregado
    await driver.wait(until.elementLocated(By.id('pet-form')), 5000);
    
    // Preencher o formulário
    await driver.findElement(By.id('pet-name')).sendKeys('Rex Teste');
    await driver.findElement(By.id('pet-type')).sendKeys('CACHORRO');
    await driver.findElement(By.id('pet-age')).sendKeys('3');
    await driver.findElement(By.id('pet-owner')).sendKeys('DONO TESTE');
    
    // Enviar o formulário
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Esperar pelo redirecionamento para a lista de pets após o cadastro
    await driver.wait(until.urlContains('/pets'), 5000);
    
    // Verificar se o pet foi adicionado (procurando pelo nome na tabela)
    const petNameCells = await driver.findElements(By.css('.pets-table td.pet-name'));
    
    let petFound = false;
    for (const cell of petNameCells) {
      const text = await cell.getText();
      if (text === 'Rex Teste') {
        petFound = true;
        break;
      }
    }
    
    expect(petFound).toBe(true);
  });
  
  test('Deve editar um pet existente', async () => {
    // Navegar para a página de pets
    await driver.get(`${BASE_URL}/pets`);
    
    // Esperar que a tabela de pets seja carregada
    await driver.wait(until.elementLocated(By.className('pets-table')), 5000);
    
    // Clicar no botão de editar do primeiro pet
    await driver.findElement(By.css('.pets-table .edit-button')).click();
    
    // Esperar que o formulário de edição seja carregado
    await driver.wait(until.elementLocated(By.id('pet-form')), 5000);
    
    // Limpar o campo de nome e adicionar um novo nome
    const nameInput = await driver.findElement(By.id('pet-name'));
    await nameInput.clear();
    await nameInput.sendKeys('Rex Atualizado');
    
    // Enviar o formulário
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Esperar pelo redirecionamento para a lista de pets após a edição
    await driver.wait(until.urlContains('/pets'), 5000);
    
    // Verificar se o pet foi atualizado (procurando pelo nome na tabela)
    const petNameCells = await driver.findElements(By.css('.pets-table td.pet-name'));
    
    let petFound = false;
    for (const cell of petNameCells) {
      const text = await cell.getText();
      if (text === 'Rex Atualizado') {
        petFound = true;
        break;
      }
    }
    
    expect(petFound).toBe(true);
  });
});
