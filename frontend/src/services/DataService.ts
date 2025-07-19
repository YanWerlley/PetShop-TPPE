// Interfaces para os tipos de dados
export interface Pet {
  id: number;
  name: string;
  type: string;
  age: number;
  owner: string;
  status: string;
}

export interface Vacina {
  id: number;
  name: string;
  target: string;
}

export interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  username?: string;
  password?: string;
  city?: string;
  street?: string;
  zipCode?: string;
}

export interface Consulta {
  id: number;
  petId: number;
  tipo: string; // 'vacina', 'banho', 'tosa', etc.
  descricao: string;
  data: string;
  observacoes?: string;
  vacinaId?: number; // Opcional, apenas se o tipo for 'vacina'
  valor: number;
  status: string; // 'agendada', 'concluida', 'cancelada'
}

class DataService {
  private pets: Pet[] = [];
  private vacinas: Vacina[] = [];
  private clientes: Cliente[] = [];
  private consultas: Consulta[] = [];

  constructor() {
    this.loadFromStorage();

    // Se não houver dados no localStorage, inicializar com dados padrão
    if (this.pets.length === 0) {
      this.pets = [
        { id: 1, name: 'PET 1', type: 'GATO', age: 4, owner: 'DONO YAN', status: 'LAVAR' },
        { id: 2, name: 'PET 2', type: 'CACHORRO', age: 3, owner: 'DONO JOÃO', status: 'VACINAR' },
        { id: 3, name: 'PET 3', type: 'GATO', age: 5, owner: 'DONO YAN', status: 'VACINAR' },
      ];
      this.saveToStorage();
    }

    if (this.vacinas.length === 0) {
      this.vacinas = [
        { id: 1, name: 'VACINA 1', target: 'GATOS E CACHORROS' },
        { id: 2, name: 'VACINA 2', target: 'GATOS' },
        { id: 3, name: 'VACINA 3', target: 'CACHORROS' },
      ];
      this.saveToStorage();
    }

    if (this.clientes.length === 0) {
      this.clientes = [
        { id: 1, name: 'CLIENTE YAN', email: 'yan@email.com', phone: '(11) 99999-1111', username: 'yan', password: '123456' },
        { id: 2, name: 'CLIENTE JOÃO', email: 'joao@email.com', phone: '(11) 99999-2222', username: 'joao', password: '123456' },
        { id: 3, name: 'CLIENTE MARIA', email: 'maria@email.com', phone: '(11) 99999-3333', username: 'maria', password: '123456' },
      ];
      this.saveToStorage();
    }

    if (this.consultas.length === 0) {
      this.consultas = [
        { id: 1, petId: 1, tipo: 'vacina', descricao: 'Vacinação Antirrábica', data: '2025-07-15', vacinaId: 1, valor: 75.00, status: 'concluida' },
        { id: 2, petId: 2, tipo: 'banho', descricao: 'Banho e tosa higiênica', data: '2025-07-17', valor: 60.00, status: 'concluida' },
        { id: 3, petId: 3, tipo: 'consulta', descricao: 'Consulta de rotina', data: '2025-07-20', observacoes: 'Verificar alimentação', valor: 120.00, status: 'agendada' },
      ];
      this.saveToStorage();
    }
  }

  // Métodos para persistência de dados
  private loadFromStorage(): void {
    try {
      const petsData = localStorage.getItem('petshop_pets');
      const vacinasData = localStorage.getItem('petshop_vacinas');
      const clientesData = localStorage.getItem('petshop_clientes');
      const consultasData = localStorage.getItem('petshop_consultas');

      if (petsData) this.pets = JSON.parse(petsData);
      if (vacinasData) this.vacinas = JSON.parse(vacinasData);
      if (clientesData) this.clientes = JSON.parse(clientesData);
      if (consultasData) this.consultas = JSON.parse(consultasData);
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('petshop_pets', JSON.stringify(this.pets));
      localStorage.setItem('petshop_vacinas', JSON.stringify(this.vacinas));
      localStorage.setItem('petshop_clientes', JSON.stringify(this.clientes));
      localStorage.setItem('petshop_consultas', JSON.stringify(this.consultas));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }

  // Métodos para Pets
  getPets(): Pet[] {
    return [...this.pets];
  }

  getPet(id: number): Pet | undefined {
    return this.pets.find(pet => pet.id === id);
  }

  addPet(pet: Omit<Pet, 'id'>): Pet {
    const newId = this.pets.length > 0 ? Math.max(...this.pets.map(p => p.id)) + 1 : 1;
    const newPet = { ...pet, id: newId };
    this.pets.push(newPet);
    this.saveToStorage();
    return newPet;
  }

  updatePet(id: number, pet: Omit<Pet, 'id'>): Pet | undefined {
    const index = this.pets.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPet = { ...pet, id };
      this.pets[index] = updatedPet;
      this.saveToStorage();
      return updatedPet;
    }
    return undefined;
  }

  deletePet(id: number): boolean {
    const initialLength = this.pets.length;
    this.pets = this.pets.filter(pet => pet.id !== id);
    const result = initialLength > this.pets.length;
    if (result) this.saveToStorage();
    return result;
  }

  // Métodos para Vacinas
  getVacinas(): Vacina[] {
    return [...this.vacinas];
  }

  getVacina(id: number): Vacina | undefined {
    return this.vacinas.find(vacina => vacina.id === id);
  }

  addVacina(vacina: Omit<Vacina, 'id'>): Vacina {
    const newId = this.vacinas.length > 0 ? Math.max(...this.vacinas.map(v => v.id)) + 1 : 1;
    const newVacina = { ...vacina, id: newId };
    this.vacinas.push(newVacina);
    this.saveToStorage();
    return newVacina;
  }

  updateVacina(id: number, vacina: Omit<Vacina, 'id'>): Vacina | undefined {
    const index = this.vacinas.findIndex(v => v.id === id);
    if (index !== -1) {
      const updatedVacina = { ...vacina, id };
      this.vacinas[index] = updatedVacina;
      this.saveToStorage();
      return updatedVacina;
    }
    return undefined;
  }

  deleteVacina(id: number): boolean {
    const initialLength = this.vacinas.length;
    this.vacinas = this.vacinas.filter(vacina => vacina.id !== id);
    const result = initialLength > this.vacinas.length;
    if (result) this.saveToStorage();
    return result;
  }

  // Métodos para Clientes
  getClientes(): Cliente[] {
    return [...this.clientes];
  }

  getCliente(id: number): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  getClienteByUsername(username: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.username === username);
  }

  addCliente(cliente: Omit<Cliente, 'id'>): Cliente {
    const newId = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.id)) + 1 : 1;
    const newCliente = { ...cliente, id: newId };
    this.clientes.push(newCliente);
    this.saveToStorage();
    return newCliente;
  }

  updateCliente(id: number, cliente: Omit<Cliente, 'id'>): Cliente | undefined {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedCliente = { ...cliente, id };
      this.clientes[index] = updatedCliente;
      this.saveToStorage();
      return updatedCliente;
    }
    return undefined;
  }

  deleteCliente(id: number): boolean {
    const initialLength = this.clientes.length;
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    const result = initialLength > this.clientes.length;
    if (result) this.saveToStorage();
    return result;
  }

  // Métodos para Consultas
  getConsultas(): Consulta[] {
    return [...this.consultas];
  }

  getConsulta(id: number): Consulta | undefined {
    return this.consultas.find(consulta => consulta.id === id);
  }

  getConsultasByPetId(petId: number): Consulta[] {
    return this.consultas.filter(consulta => consulta.petId === petId);
  }

  addConsulta(consulta: Omit<Consulta, 'id'>): Consulta {
    const newId = this.consultas.length > 0 ? Math.max(...this.consultas.map(c => c.id)) + 1 : 1;
    const newConsulta = { ...consulta, id: newId };
    this.consultas.push(newConsulta);
    this.saveToStorage();
    return newConsulta;
  }

  updateConsulta(id: number, consulta: Omit<Consulta, 'id'>): Consulta | undefined {
    const index = this.consultas.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedConsulta = { ...consulta, id };
      this.consultas[index] = updatedConsulta;
      this.saveToStorage();
      return updatedConsulta;
    }
    return undefined;
  }

  deleteConsulta(id: number): boolean {
    const initialLength = this.consultas.length;
    this.consultas = this.consultas.filter(consulta => consulta.id !== id);
    const result = initialLength > this.consultas.length;
    if (result) this.saveToStorage();
    return result;
  }
}

// Exporta uma instância única do serviço
export const dataService = new DataService();
