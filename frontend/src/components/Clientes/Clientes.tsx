import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dataService, Cliente as ClienteType } from '../../services/DataService';
import ClienteForm from './ClienteForm';

const ClientesContainer = styled.div`
  padding: 1rem;
  background-color: #1e1e1e;
  color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
  font-size: 2rem;
`;

const ClientesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ClienteCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ClienteImage = styled.div`
  height: 180px;
  background-color: #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClienteInfo = styled.div`
  padding: 1rem;
  position: relative;
`;

const ClienteName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #fff;
`;

const ClienteDetail = styled.p`
  margin: 0.2rem 0;
  color: #ccc;
  font-size: 0.9rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${(props: { active?: boolean }) => props.active ? '#fff' : '#3a3a3a'};
  color: ${(props: { active?: boolean }) => props.active ? '#1e1e1e' : '#fff'};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin: 0 0.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${(props: { active?: boolean }) => props.active ? '#fff' : '#4a4a4a'};
  }
`;

const PageEllipsis = styled.span`
  color: #fff;
  margin: 0 0.5rem;
`;

const AddButton = styled.button`
  background-color: #fff;
  color: #1e1e1e;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

// Não precisamos declarar a interface Cliente aqui, pois já estamos importando do DataService

const ActionButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 5px;
  font-size: 1rem;
  
  &:hover {
    color: #ccc;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
`;

const Clientes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [clientes, setClientes] = useState<ClienteType[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [editingCliente, setEditingCliente] = useState<ClienteType | null>(null);
  
  useEffect(() => {
    // Carregar clientes do serviço
    setClientes(dataService.getClientes());
  }, [refresh]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(clientes.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleAddCliente = () => {
    setShowForm(true);
  };
  
  const handleSaveCliente = () => {
    setShowForm(false);
    setEditingCliente(null);
    // Atualizar a lista de clientes
    setRefresh(prev => prev + 1);
  };
  
  const handleEditCliente = (cliente: ClienteType) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };
  
  const handleDeleteCliente = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      dataService.deleteCliente(id);
      setRefresh(prev => prev + 1);
    }
  };
  
  // Calcular clientes para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClientes = clientes.slice(startIndex, endIndex);
  
  const renderPageButtons = () => {
    const buttons = [];
    
    // Botão Previous
    buttons.push(
      <PageButton key="prev" onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}>
        &lt;
      </PageButton>
    );
    
    // Primeira página
    buttons.push(
      <PageButton 
        key={1} 
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </PageButton>
    );
    
    // Ellipsis se necessário
    if (currentPage > 3) {
      buttons.push(<PageEllipsis key="ellipsis1">...</PageEllipsis>);
    }
    
    // Páginas intermediárias
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue;
      
      buttons.push(
        <PageButton 
          key={i} 
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    // Ellipsis se necessário
    if (currentPage < totalPages - 2) {
      buttons.push(<PageEllipsis key="ellipsis2">...</PageEllipsis>);
    }
    
    // Última página se houver mais de uma página
    if (totalPages > 1) {
      buttons.push(
        <PageButton 
          key={totalPages} 
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }
    
    // Botão Next
    buttons.push(
      <PageButton key="next" onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}>
        &gt;
      </PageButton>
    );
    
    return buttons;
  };
  
  if (showForm) {
    return <ClienteForm onSave={handleSaveCliente} cliente={editingCliente} />;
  }
  
  return (
    <ClientesContainer>
      <Title>Clientes</Title>
      
      <AddButton onClick={handleAddCliente}>CADASTRAR CLIENTE</AddButton>
      
      <ClientesGrid>
        {currentClientes.map(cliente => (
          <ClienteCard key={cliente.id}>
            <ClienteImage>
              <img src="https://via.placeholder.com/150" alt={cliente.name} />
            </ClienteImage>
            <ClienteInfo>
              <ClienteName>{cliente.name}</ClienteName>
              <ClienteDetail>{cliente.email}</ClienteDetail>
              <ClienteDetail>{cliente.phone}</ClienteDetail>
              <ActionButtons>
                <ActionButton onClick={() => handleEditCliente(cliente)} title="Editar">
                  ✏️
                </ActionButton>
                <ActionButton onClick={() => handleDeleteCliente(cliente.id)} title="Excluir">
                  🗑️
                </ActionButton>
              </ActionButtons>
            </ClienteInfo>
          </ClienteCard>
        ))}
      </ClientesGrid>
      
      <Pagination>
        {renderPageButtons()}
      </Pagination>
    </ClientesContainer>
  );
};

export default Clientes;
