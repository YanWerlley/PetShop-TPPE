import styled from 'styled-components';
// @ts-ignore - Ignorando erro de tipagem do styled-components

export const ConsultasContainer = styled.div`
  padding: 1rem;
  background-color: #1e1e1e;
  color: #fff;
  min-height: 100vh;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
  font-size: 2rem;
`;

export const ConsultasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const ConsultaCard = styled.div`
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

export const ConsultaHeader = styled.div`
  background-color: #3a3a3a;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ConsultaType = styled.span<{ tipo: string }>`
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

export const ConsultaStatus = styled.span<{ status: string }>`
  background-color: ${({ status }: { status: string }) => {
    switch(status) {
      case 'agendada': return '#ff9800';
      case 'concluida': return '#4caf50';
      case 'cancelada': return '#f44336';
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

export const ConsultaInfo = styled.div`
  padding: 1rem;
  position: relative;
`;

export const ConsultaTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #fff;
`;

export const ConsultaDetail = styled.p`
  margin: 0.2rem 0;
  color: #ccc;
  font-size: 0.9rem;
`;

export const ConsultaValue = styled.p`
  margin: 0.5rem 0;
  color: #4caf50;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const PageButton = styled.button<{ active?: boolean }>`
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

export const PageEllipsis = styled.span`
  color: #fff;
  margin: 0 0.5rem;
`;

export const AddButton = styled.button`
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

export const ActionButton = styled.button`
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

export const ActionButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;

export const FilterLabel = styled.label`
  margin-right: 0.5rem;
  color: #ccc;
`;

export const FilterSelect = styled.select`
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:focus {
    outline: none;
  }
`;
