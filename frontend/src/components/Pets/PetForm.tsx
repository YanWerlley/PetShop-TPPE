import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dataService, Cliente, Pet } from '../../services/DataService';

const FormContainer = styled.div`
  padding: 2rem;
  background-color: #1e1e1e;
  color: #fff;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #ccc;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Button = styled.button`
  background-color: #fff;
  color: #1e1e1e;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

interface PetFormProps {
  onSave: () => void;
  pet?: Pet | null;
}

const PetForm: React.FC<PetFormProps> = ({ onSave, pet }) => {
  const [name, setName] = useState(pet ? pet.name : '');
  const [type, setType] = useState(pet ? pet.type : 'GATO');
  const [age, setAge] = useState(pet ? pet.age.toString() : '');
  const [owner, setOwner] = useState(pet ? pet.owner : '');
  const [status, setStatus] = useState(pet ? pet.status : '');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  useEffect(() => {
    // Carregar a lista de clientes para o select
    const clientesList = dataService.getClientes();
    setClientes(clientesList);
    
    // Definir o primeiro cliente como padrão se houver clientes e não estiver editando
    if (clientesList.length > 0 && !pet) {
      setOwner(clientesList[0].name);
    }
  }, [pet]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!name || !type || !age || !owner || !status) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    // Adicionar ou atualizar pet
    if (pet) {
      dataService.updatePet(pet.id, {
        name,
        type,
        age: parseInt(age, 10),
        owner,
        status
      });
    } else {
      dataService.addPet({
        name,
        type,
        age: parseInt(age, 10),
        owner,
        status
      });
    }
    
    // Limpar formulário
    setName('');
    setType('GATO');
    setAge('');
    setStatus('');
    
    // Voltar para a lista de pets
    onSave();
  };
  
  return (
    <FormContainer>
      <Title>{pet ? 'Editar Pet' : 'Cadastrar Pet'}</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">NOME DO PET</Label>
          <Input 
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="NOME DO PET"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="type">TIPO</Label>
          <Select 
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="GATO">GATO</option>
            <option value="CACHORRO">CACHORRO</option>
            <option value="PÁSSARO">PÁSSARO</option>
            <option value="ROEDOR">ROEDOR</option>
            <option value="RÉPTIL">RÉPTIL</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="age">IDADE DO PET</Label>
          <Input 
            id="age"
            type="number"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="IDADE DO PET"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="owner">DONO</Label>
          <Select 
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.name}>
                {cliente.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="status">SITUAÇÃO</Label>
          <Select 
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">SELECIONE</option>
            <option value="LAVAR">LAVAR</option>
            <option value="VACINAR">VACINAR</option>
            <option value="TOSA">TOSA</option>
            <option value="CONSULTA">CONSULTA</option>
          </Select>
        </FormGroup>
        
        <Button type="submit">{pet ? 'ATUALIZAR' : 'CADASTRAR'}</Button>
      </Form>
    </FormContainer>
  );
};

export default PetForm;
