import React, { useState, useEffect } from 'react';
// @ts-ignore - Ignorando erro de tipagem do styled-components
import styled from 'styled-components';
import { dataService, Pet, Consulta } from '../../services/DataService';
import PetForm from './PetForm';

const PetsContainer = styled.div`
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

const PetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PetCard = styled.div<{ expanded?: boolean }>`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  ${(props: { expanded?: boolean }) => props.expanded ? `
    transform: scale(1.05);
    z-index: 10;
    grid-column: 1 / -1;
  ` : `
    &:hover {
      transform: translateY(-5px);
    }
  `}
`;

const PetImage = styled.div`
  height: 180px;
  background-color: #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PetInfo = styled.div`
  padding: 1rem;
  position: relative;
`;

const ExpandButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  &:hover {
    background-color: #3e8e41;
  }
`;

const ConsultasSection = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid #444;
  padding-top: 1rem;
`;

const ConsultasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #333;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
  }
`;

const ConsultaItem = styled.div`
  background-color: #3a3a3a;
  border-radius: 4px;
  padding: 0.8rem;
  position: relative;
`;

const ConsultaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ConsultaType = styled.span<{ tipo: string }>`
  background-color: ${({ tipo }: { tipo: string }) => {
    switch(tipo) {
      case 'vacina': return '#4caf50';
      case 'banho': return '#2196f3';
      case 'tosa': return '#ff9800';
      case 'consulta': return '#9c27b0';
      default: return '#607d8b';
    }
  }};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const ConsultaDate = styled.span`
  color: #ccc;
  font-size: 0.8rem;
`;

const ConsultaTitle = styled.h4`
  margin: 0.5rem 0;
  color: #fff;
  font-size: 1rem;
`;

const ConsultaDetail = styled.p`
  margin: 0.2rem 0;
  color: #ccc;
  font-size: 0.9rem;
`;

const ConsultaValue = styled.p`
  margin: 0.5rem 0 0 0;
  color: #4caf50;
  font-size: 1rem;
  font-weight: bold;
`;

const NoConsultas = styled.p`
  color: #999;
  text-align: center;
  font-style: italic;
  margin: 1rem 0;
`;

const PetName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #fff;
`;

const PetDetail = styled.p`
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

const Pets: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [expandedPetId, setExpandedPetId] = useState<number | null>(null);
  const [petConsultas, setPetConsultas] = useState<Consulta[]>([]);
  
  useEffect(() => {
    // Carregar pets do serviço
    setPets(dataService.getPets());
    
    // Carregar consultas do pet expandido se houver
    if (expandedPetId) {
      setPetConsultas(dataService.getConsultasByPetId(expandedPetId));
    }
  }, [refresh, expandedPetId]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(pets.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleAddPet = () => {
    setShowForm(true);
  };
  
  const handleSavePet = () => {
    setShowForm(false);
    setEditingPet(null);
    // Atualizar a lista de pets
    setRefresh(prev => prev + 1);
  };
  
  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };
  
  const handleDeletePet = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      dataService.deletePet(id);
      setRefresh(prev => prev + 1);
      
      // Se o pet expandido for excluído, fechar a expansão
      if (expandedPetId === id) {
        setExpandedPetId(null);
      }
    }
  };
  
  const handleExpandPet = (petId: number) => {
    if (expandedPetId === petId) {
      // Fechar se já estiver expandido
      setExpandedPetId(null);
    } else {
      // Expandir e carregar consultas
      setExpandedPetId(petId);
      setPetConsultas(dataService.getConsultasByPetId(petId));
    }
  };
  
  // Formatar data para formato brasileiro
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Formatar valor para moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Calcular pets para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPets = pets.slice(startIndex, endIndex);
  
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
    return <PetForm onSave={handleSavePet} pet={editingPet} />;
  }
  
  return (
    <PetsContainer>
      <Title>Pets</Title>
      
      <AddButton onClick={handleAddPet}>CADASTRAR PET</AddButton>
      
      <PetsGrid>
        {currentPets.map(pet => (
          <PetCard key={pet.id} expanded={expandedPetId === pet.id}>
            <PetImage>
              <img src="https://via.placeholder.com/150" alt={pet.name} />
            </PetImage>
            <PetInfo>
              <PetName>{pet.name}</PetName>
              <PetDetail>{pet.type}</PetDetail>
              <PetDetail>{pet.age} ANOS</PetDetail>
              <PetDetail>{pet.owner}</PetDetail>
              <PetDetail>{pet.status}</PetDetail>
              <ActionButtons>
                <ActionButton onClick={() => handleEditPet(pet)} title="Editar">
                  ✏️
                </ActionButton>
                <ActionButton onClick={() => handleDeletePet(pet.id)} title="Excluir">
                  🗑️
                </ActionButton>
              </ActionButtons>
              
              <ExpandButton onClick={() => handleExpandPet(pet.id)}>
                {expandedPetId === pet.id ? 'ESCONDER CONSULTAS' : 'VER CONSULTAS'}
              </ExpandButton>
              
              {expandedPetId === pet.id && (
                <ConsultasSection>
                  <PetName>Histórico de Consultas e Serviços</PetName>
                  
                  {petConsultas.length > 0 ? (
                    <ConsultasList>
                      {petConsultas.map(consulta => (
                        <ConsultaItem key={consulta.id}>
                          <ConsultaHeader>
                            <ConsultaType tipo={consulta.tipo}>{consulta.tipo}</ConsultaType>
                            <ConsultaDate>{formatDate(consulta.data)}</ConsultaDate>
                          </ConsultaHeader>
                          <ConsultaTitle>{consulta.descricao}</ConsultaTitle>
                          {consulta.observacoes && (
                            <ConsultaDetail><strong>Obs:</strong> {consulta.observacoes}</ConsultaDetail>
                          )}
                          <ConsultaValue>{formatCurrency(consulta.valor)}</ConsultaValue>
                        </ConsultaItem>
                      ))}
                    </ConsultasList>
                  ) : (
                    <NoConsultas>Nenhuma consulta ou serviço registrado para este pet.</NoConsultas>
                  )}
                </ConsultasSection>
              )}
            </PetInfo>
          </PetCard>
        ))}
      </PetsGrid>
      
      <Pagination>
        {renderPageButtons()}
      </Pagination>
    </PetsContainer>
  );
};

export default Pets;
