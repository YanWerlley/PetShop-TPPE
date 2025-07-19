import React, { useState } from 'react';
import styled from 'styled-components';
import { dataService, Cliente as ClienteType } from '../../services/DataService';

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

interface ClienteFormProps {
  onSave: () => void;
  isRegister?: boolean;
  cliente?: ClienteType | null;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ onSave, isRegister = false, cliente }) => {
  const [name, setName] = useState(cliente ? cliente.name : '');
  const [email, setEmail] = useState(cliente ? cliente.email : '');
  const [phone, setPhone] = useState(cliente ? cliente.phone : '');
  const [username, setUsername] = useState(cliente && cliente.username ? cliente.username : '');
  const [password, setPassword] = useState(cliente && cliente.password ? cliente.password : '');
  const [city, setCity] = useState(cliente && cliente.city ? cliente.city : '');
  const [street, setStreet] = useState(cliente && cliente.street ? cliente.street : '');
  const [zipCode, setZipCode] = useState(cliente && cliente.zipCode ? cliente.zipCode : '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!name || !email || !phone) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Email e Telefone');
      return;
    }
    
    // Se for registro, validar campos adicionais
    if (isRegister && (!username || !password)) {
      alert('Por favor, preencha os campos de usuário e senha');
      return;
    }
    
    // Adicionar ou atualizar cliente
    if (cliente) {
      dataService.updateCliente(cliente.id, {
        name,
        email,
        phone,
        username,
        password,
        city,
        street,
        zipCode
      });
    } else {
      dataService.addCliente({
        name,
        email,
        phone,
        username,
        password,
        city,
        street,
        zipCode
      });
    }
    
    // Limpar formulário
    setName('');
    setEmail('');
    setPhone('');
    setUsername('');
    setPassword('');
    setCity('');
    setStreet('');
    setZipCode('');
    
    // Voltar para a lista de clientes ou login
    onSave();
  };
  
  return (
    <FormContainer>
      <Title>
  {isRegister 
    ? 'Registrar Novo Usuário' 
    : cliente 
      ? 'Editar Cliente' 
      : 'Cadastrar Cliente'}
</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">NOME COMPLETO</Label>
          <Input 
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="NOME COMPLETO"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">TELEFONE</Label>
          <Input 
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="TELEFONE"
          />
        </FormGroup>
        
        {(isRegister || username || password) && (
          <>
            <FormGroup>
              <Label htmlFor="username">USUÁRIO</Label>
              <Input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USUÁRIO"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">SENHA</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SENHA"
              />
            </FormGroup>
          </>
        )}
        
        <FormGroup>
          <Label htmlFor="city">CIDADE</Label>
          <Input 
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value.toUpperCase())}
            placeholder="CIDADE"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="street">RUA</Label>
          <Input 
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value.toUpperCase())}
            placeholder="RUA"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="zipCode">CEP</Label>
          <Input 
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="CEP"
          />
        </FormGroup>
        
        <Button type="submit">
  {isRegister 
    ? 'REGISTRAR' 
    : cliente 
      ? 'ATUALIZAR' 
      : 'CADASTRAR'}
</Button>
      </Form>
    </FormContainer>
  );
};

export default ClienteForm;
