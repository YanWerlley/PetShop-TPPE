import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// @ts-ignore - Ignorando erro de tipagem do styled-components
import styled from 'styled-components';
import { dataService, Consulta, Pet, Vacina } from '../../services/DataService';

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
  max-width: 600px;
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

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
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

const Row = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface ConsultaFormProps {
  onSave: () => void;
  consulta?: Consulta | null;
}

const ConsultaForm: React.FC<ConsultaFormProps> = ({ onSave, consulta }) => {
  const [petId, setPetId] = useState<number>(0);
  const [tipo, setTipo] = useState('consulta');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [vacinaId, setVacinaId] = useState<number | undefined>(undefined);
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('agendada');
  
  const [pets, setPets] = useState<Pet[]>([]);
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  
  useEffect(() => {
    // Carregar pets e vacinas
    setPets(dataService.getPets());
    setVacinas(dataService.getVacinas());
    
    // Se estiver editando, preencher o formulário com os dados da consulta
    if (consulta) {
      setPetId(consulta.petId);
      setTipo(consulta.tipo);
      setDescricao(consulta.descricao);
      setData(consulta.data);
      setObservacoes(consulta.observacoes || '');
      setVacinaId(consulta.vacinaId);
      setValor(consulta.valor.toString());
      setStatus(consulta.status);
    }
  }, [consulta]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!petId || !tipo || !descricao || !data || !valor) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Validar se selecionou uma vacina quando o tipo é vacina
    if (tipo === 'vacina' && !vacinaId) {
      alert('Por favor, selecione uma vacina');
      return;
    }
    
    const consultaData = {
      petId,
      tipo,
      descricao,
      data,
      observacoes: observacoes || undefined,
      vacinaId: tipo === 'vacina' ? vacinaId : undefined,
      valor: parseFloat(valor),
      status
    };
    
    // Adicionar ou atualizar consulta
    if (consulta) {
      dataService.updateConsulta(consulta.id, consultaData);
    } else {
      dataService.addConsulta(consultaData);
    }
    
    // Limpar formulário e voltar para a lista
    onSave();
  };
  
  // Formatar data para o formato do input type="date"
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  return (
    <FormContainer>
      <Title>
        {consulta ? 'Editar Consulta/Serviço' : 'Cadastrar Consulta/Serviço'}
      </Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="pet">Pet</Label>
          <Select 
            id="pet"
            value={petId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setPetId(parseInt(e.target.value))}
            required
          >
            <option value="">Selecione um pet</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.type})
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <Row>
          <FormGroup>
            <Label htmlFor="tipo">Tipo de Serviço</Label>
            <Select 
              id="tipo"
              value={tipo}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value)}
              required
            >
              <option value="consulta">Consulta</option>
              <option value="vacina">Vacinação</option>
              <option value="banho">Banho</option>
              <option value="tosa">Tosa</option>
              <option value="exame">Exame</option>
              <option value="outro">Outro</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="data">Data</Label>
            <Input 
              id="data"
              type="date"
              value={data ? formatDateForInput(data) : ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
              required
            />
          </FormGroup>
        </Row>
        
        <FormGroup>
          <Label htmlFor="descricao">Descrição</Label>
          <Input 
            id="descricao"
            type="text"
            value={descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
            placeholder="Descrição do serviço"
            required
          />
        </FormGroup>
        
        {tipo === 'vacina' && (
          <FormGroup>
            <Label htmlFor="vacina">Vacina</Label>
            <Select 
              id="vacina"
              value={vacinaId || ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setVacinaId(parseInt(e.target.value))}
              required={tipo === 'vacina'}
            >
              <option value="">Selecione uma vacina</option>
              {vacinas.map(vacina => (
                <option key={vacina.id} value={vacina.id}>
                  {vacina.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        )}
        
        <Row>
          <FormGroup>
            <Label htmlFor="valor">Valor (R$)</Label>
            <Input 
              id="valor"
              type="number"
              step="0.01"
              min="0"
              value={valor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValor(e.target.value)}
              placeholder="0,00"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select 
              id="status"
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
              required
            >
              <option value="agendada">Agendada</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </Select>
          </FormGroup>
        </Row>
        
        <FormGroup>
          <Label htmlFor="observacoes">Observações</Label>
          <TextArea 
            id="observacoes"
            value={observacoes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setObservacoes(e.target.value)}
            placeholder="Observações adicionais (opcional)"
          />
        </FormGroup>
        
        <Button type="submit">
          {consulta ? 'ATUALIZAR' : 'CADASTRAR'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ConsultaForm;
