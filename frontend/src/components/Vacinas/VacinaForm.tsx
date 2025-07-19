import React, { useState } from 'react';
import styled from 'styled-components';
import { dataService, Vacina } from '../../services/DataService';

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

interface VacinaFormProps {
  onSave: () => void;
  vacina?: Vacina | null;
}

const VacinaForm: React.FC<VacinaFormProps> = ({ onSave, vacina }) => {
  const [name, setName] = useState(vacina ? vacina.name : '');
  const [target, setTarget] = useState(vacina ? vacina.target : '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!name || !target) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    // Adicionar ou atualizar vacina
    if (vacina) {
      dataService.updateVacina(vacina.id, {
        name,
        target
      });
    } else {
      dataService.addVacina({
        name,
        target
      });
    }
    
    // Limpar formulário
    setName('');
    setTarget('');
    
    // Voltar para a lista de vacinas
    onSave();
  };
  
  return (
    <FormContainer>
      <Title>{vacina ? 'Editar Vacina' : 'Cadastrar Vacina'}</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">NOME DA VACINA</Label>
          <Input 
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="NOME DA VACINA"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="target">INDICADA PARA</Label>
          <Select 
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="">SELECIONE</option>
            <option value="GATOS">GATOS</option>
            <option value="CACHORROS">CACHORROS</option>
            <option value="GATOS E CACHORROS">GATOS E CACHORROS</option>
            <option value="AVES">AVES</option>
            <option value="ROEDORES">ROEDORES</option>
            <option value="TODOS OS ANIMAIS">TODOS OS ANIMAIS</option>
          </Select>
        </FormGroup>
        
        <Button type="submit">{vacina ? 'ATUALIZAR' : 'CADASTRAR'}</Button>
      </Form>
    </FormContainer>
  );
};

export default VacinaForm;
