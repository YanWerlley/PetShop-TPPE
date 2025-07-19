import { WebDriver, By, until } from 'selenium-webdriver';
import { setupDriver, teardownDriver, BASE_URL } from './setup';

describe('Consultas Management Tests', () => {
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
  
  test('Deve listar consultas agendadas', async () => {
    // Navegar para a página de consultas
    await driver.get(`${BASE_URL}/consultas`);
    
    // Esperar que a tabela de consultas seja carregada
    const consultasTable = await driver.wait(
      until.elementLocated(By.className('consultas-table')),
      5000
    );
    
    // Verificar se a tabela está visível
    expect(await consultasTable.isDisplayed()).toBe(true);
    
    // Verificar se há pelo menos uma consulta na lista
    const consultaRows = await driver.findElements(By.css('.consultas-table tbody tr'));
    expect(consultaRows.length).toBeGreaterThan(0);
  });
  
  test('Deve agendar uma nova consulta com sucesso', async () => {
    // Navegar para a página de agendamento de consultas
    await driver.get(`${BASE_URL}/consultas/new`);
    
    // Esperar que o formulário seja carregado
    await driver.wait(until.elementLocated(By.id('consulta-form')), 5000);
    
    // Selecionar um pet na lista dropdown
    const petSelect = await driver.findElement(By.id('pet-select'));
    await petSelect.click();
    await driver.findElement(By.css('#pet-select option:nth-child(2)')).click();
    
    // Selecionar o tipo de consulta
    const tipoSelect = await driver.findElement(By.id('tipo-consulta'));
    await tipoSelect.click();
    await driver.findElement(By.css('#tipo-consulta option[value="consulta"]')).click();
    
    // Preencher descrição
    await driver.findElement(By.id('descricao')).sendKeys('Consulta de rotina - Teste Selenium');
    
    // Selecionar data
    await driver.findElement(By.id('data-consulta')).sendKeys('2025-08-15');
    
    // Preencher valor
    await driver.findElement(By.id('valor')).sendKeys('120');
    
    // Preencher observações
    await driver.findElement(By.id('observacoes')).sendKeys('Observação de teste automatizado');
    
    // Enviar o formulário
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Esperar pelo redirecionamento para a lista de consultas após o agendamento
    await driver.wait(until.urlContains('/consultas'), 5000);
    
    // Verificar se a consulta foi adicionada (procurando pela descrição na tabela)
    const descricaoCells = await driver.findElements(By.css('.consultas-table td.descricao'));
    
    let consultaFound = false;
    for (const cell of descricaoCells) {
      const text = await cell.getText();
      if (text.includes('Consulta de rotina - Teste Selenium')) {
        consultaFound = true;
        break;
      }
    }
    
    expect(consultaFound).toBe(true);
  });
  
  test('Deve filtrar consultas por status', async () => {
    // Navegar para a página de consultas
    await driver.get(`${BASE_URL}/consultas`);
    
    // Esperar que a tabela de consultas seja carregada
    await driver.wait(until.elementLocated(By.className('consultas-table')), 5000);
    
    // Selecionar filtro de status "agendada"
    const statusFilter = await driver.findElement(By.id('status-filter'));
    await statusFilter.click();
    await driver.findElement(By.css('#status-filter option[value="agendada"]')).click();
    
    // Clicar no botão de filtrar
    await driver.findElement(By.id('filter-button')).click();
    
    // Esperar que a tabela seja atualizada
    await driver.sleep(1000);
    
    // Verificar se todas as consultas exibidas têm o status "agendada"
    const statusCells = await driver.findElements(By.css('.consultas-table td.status'));
    
    for (const cell of statusCells) {
      const text = await cell.getText();
      expect(text.toLowerCase()).toBe('agendada');
    }
  });
  
  test('Deve concluir uma consulta agendada', async () => {
    // Navegar para a página de consultas
    await driver.get(`${BASE_URL}/consultas`);
    
    // Esperar que a tabela de consultas seja carregada
    await driver.wait(until.elementLocated(By.className('consultas-table')), 5000);
    
    // Filtrar por consultas agendadas
    const statusFilter = await driver.findElement(By.id('status-filter'));
    await statusFilter.click();
    await driver.findElement(By.css('#status-filter option[value="agendada"]')).click();
    await driver.findElement(By.id('filter-button')).click();
    
    // Esperar que a tabela seja atualizada
    await driver.sleep(1000);
    
    // Clicar no botão de concluir da primeira consulta agendada
    const concluirButtons = await driver.findElements(By.css('.consultas-table .concluir-button'));
    if (concluirButtons.length > 0) {
      await concluirButtons[0].click();
      
      // Confirmar a conclusão no modal
      await driver.wait(until.elementLocated(By.id('confirm-button')), 5000);
      await driver.findElement(By.id('confirm-button')).click();
      
      // Esperar que a tabela seja atualizada
      await driver.sleep(1000);
      
      // Verificar se a consulta foi concluída (não deve mais aparecer na lista de agendadas)
      await driver.get(`${BASE_URL}/consultas`);
      await driver.wait(until.elementLocated(By.className('consultas-table')), 5000);
      
      // Filtrar novamente por consultas concluídas
      const statusFilter = await driver.findElement(By.id('status-filter'));
      await statusFilter.click();
      await driver.findElement(By.css('#status-filter option[value="concluida"]')).click();
      await driver.findElement(By.id('filter-button')).click();
      
      // Esperar que a tabela seja atualizada
      await driver.sleep(1000);
      
      // Verificar se há pelo menos uma consulta concluída
      const consultaRows = await driver.findElements(By.css('.consultas-table tbody tr'));
      expect(consultaRows.length).toBeGreaterThan(0);
    }
  });
});
