import React, { useState, useEffect } from 'react';
import { dataService, Consulta, Pet } from '../../services/DataService';
import ConsultaForm from './ConsultaForm';
import {
  ConsultasContainer,
  Title,
  ConsultasGrid,
  ConsultaCard,
  ConsultaHeader,
  ConsultaType,
  ConsultaStatus,
  ConsultaInfo,
  ConsultaTitle,
  ConsultaDetail,
  ConsultaValue,
  Pagination,
  PageButton,
  PageEllipsis,
  AddButton,
  ActionButton,
  ActionButtons,
  FilterContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect
} from './Consultas.styles';

const Consultas: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [editingConsulta, setEditingConsulta] = useState<Consulta | null>(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroPet, setFiltroPet] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  
  useEffect(() => {
    // Carregar consultas e pets do serviço
    setConsultas(dataService.getConsultas());
    setPets(dataService.getPets());
  }, [refresh]);
  
  const itemsPerPage = 6;
  
  // Aplicar filtros
  const consultasFiltradas = consultas.filter(consulta => {
    const matchTipo = filtroTipo === 'todos' || consulta.tipo === filtroTipo;
    const matchPet = filtroPet === 'todos' || consulta.petId.toString() === filtroPet;
    const matchStatus = filtroStatus === 'todos' || consulta.status === filtroStatus;
    return matchTipo && matchPet && matchStatus;
  });
  
  const totalPages = Math.ceil(consultasFiltradas.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleAddConsulta = () => {
    setEditingConsulta(null);
    setShowForm(true);
  };
  
  const handleSaveConsulta = () => {
    setShowForm(false);
    setEditingConsulta(null);
    // Atualizar a lista de consultas
    setRefresh(prev => prev + 1);
  };
  
  const handleEditConsulta = (consulta: Consulta) => {
    setEditingConsulta(consulta);
    setShowForm(true);
  };
  
  const handleDeleteConsulta = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      dataService.deleteConsulta(id);
      setRefresh(prev => prev + 1);
    }
  };
  
  // Calcular consultas para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsultas = consultasFiltradas.slice(startIndex, endIndex);
  
  // Encontrar o nome do pet pelo ID
  const getPetName = (petId: number) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Pet não encontrado';
  };
  
  // Formatar valor para moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Formatar data para formato brasileiro
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
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
    if (currentPage < totalPages - 2 && totalPages > 3) {
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
    return <ConsultaForm onSave={handleSaveConsulta} consulta={editingConsulta} />;
  }
  
  return (
    <ConsultasContainer>
      <Title>Consultas e Serviços</Title>
      
      <AddButton onClick={handleAddConsulta}>CADASTRAR CONSULTA/SERVIÇO</AddButton>
      
      <FilterContainer>
        <FilterGroup>
          <FilterLabel>Tipo:</FilterLabel>
          <FilterSelect 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="vacina">Vacina</option>
            <option value="banho">Banho</option>
            <option value="tosa">Tosa</option>
            <option value="consulta">Consulta</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Pet:</FilterLabel>
          <FilterSelect 
            value={filtroPet} 
            onChange={(e) => setFiltroPet(e.target.value)}
          >
            <option value="todos">Todos</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id.toString()}>
                {pet.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Status:</FilterLabel>
          <FilterSelect 
            value={filtroStatus} 
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="agendada">Agendada</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </FilterSelect>
        </FilterGroup>
      </FilterContainer>
      
      <ConsultasGrid>
        {currentConsultas.map(consulta => (
          <ConsultaCard key={consulta.id}>
            <ConsultaHeader>
              <ConsultaType tipo={consulta.tipo}>{consulta.tipo}</ConsultaType>
              <ConsultaStatus status={consulta.status}>{consulta.status}</ConsultaStatus>
            </ConsultaHeader>
            <ConsultaInfo>
              <ConsultaTitle>{consulta.descricao}</ConsultaTitle>
              <ConsultaDetail><strong>Pet:</strong> {getPetName(consulta.petId)}</ConsultaDetail>
              <ConsultaDetail><strong>Data:</strong> {formatDate(consulta.data)}</ConsultaDetail>
              {consulta.observacoes && (
                <ConsultaDetail><strong>Obs:</strong> {consulta.observacoes}</ConsultaDetail>
              )}
              <ConsultaValue>{formatCurrency(consulta.valor)}</ConsultaValue>
              <ActionButtons>
                <ActionButton onClick={() => handleEditConsulta(consulta)} title="Editar">
                  ✏️
                </ActionButton>
                <ActionButton onClick={() => handleDeleteConsulta(consulta.id)} title="Excluir">
                  🗑️
                </ActionButton>
              </ActionButtons>
            </ConsultaInfo>
          </ConsultaCard>
        ))}
      </ConsultasGrid>
      
      {consultasFiltradas.length > 0 ? (
        <Pagination>
          {renderPageButtons()}
        </Pagination>
      ) : (
        <ConsultaDetail style={{ textAlign: 'center', marginTop: '2rem' }}>
          Nenhuma consulta ou serviço encontrado com os filtros selecionados.
        </ConsultaDetail>
      )}
    </ConsultasContainer>
  );
};

export default Consultas;
