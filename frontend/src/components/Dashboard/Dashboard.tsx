import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { dataService } from '../../services/DataService';
import Pets from '../Pets/Pets';
import Vacinas from '../Vacinas/Vacinas';
import Clientes from '../Clientes/Clientes';
import Consultas from '../Consultas/Consultas';
import { 
  DashboardContainer, 
  Header, 
  Logo, 
  MainNav, 
  NavLinks, 
  NavLink, 
  UserInfo, 
  Username, 
  LogoutButton,
  MainContent,
  DashboardTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  CardFooter
} from './Dashboard.styles';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [clientCount, setClientCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [vacinaCount, setVacinaCount] = useState(0);
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUsername(user.username);
    }
    
    // Buscar dados reais
    const clientes = dataService.getClientes();
    const pets = dataService.getPets();
    const vacinas = dataService.getVacinas();
    
    setClientCount(clientes.length);
    setPetCount(pets.length);
    setVacinaCount(vacinas.length);
  }, [refresh]);
  
  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const handleNavClick = (section: string) => (e: React.MouseEvent) => {
    // Atualizar dados quando mudar de seção para o dashboard
    if (section === 'dashboard') {
      setRefresh(prev => prev + 1);
    }
    e.preventDefault();
    setActiveSection(section);
  };
  
  return (
    <DashboardContainer>
      <Header>
        <Logo onClick={handleNavClick('dashboard')} style={{ cursor: 'pointer' }}>PetShop</Logo>
        <MainNav>
          <NavLinks>
            <li><NavLink href="#pets" onClick={handleNavClick('pets')} active={activeSection === 'pets'}>Pets</NavLink></li>
            <li><NavLink href="#vacinas" onClick={handleNavClick('vacinas')} active={activeSection === 'vacinas'}>Vacinas</NavLink></li>
            <li><NavLink href="#clientes" onClick={handleNavClick('clientes')} active={activeSection === 'clientes'}>Clientes</NavLink></li>
            <li><NavLink href="#consultas" onClick={handleNavClick('consultas')} active={activeSection === 'consultas'}>Consultas</NavLink></li>
          </NavLinks>
        </MainNav>
        <UserInfo>
          <Username>{username}</Username>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </UserInfo>
      </Header>
      
      <MainContent>
        {activeSection === 'dashboard' && (
          <>
            <DashboardTitle>Dashboard</DashboardTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total de Clientes</CardTitle>
                <CardContent>{clientCount}</CardContent>
                <CardFooter>Atualizado em tempo real</CardFooter>
              </Card>
              
              <Card>
                <CardTitle>Total de Pets</CardTitle>
                <CardContent>{petCount}</CardContent>
                <CardFooter>Atualizado em tempo real</CardFooter>
              </Card>
              
              <Card>
                <CardTitle>Total de Vacinas Aplicadas</CardTitle>
                <CardContent>{vacinaCount}</CardContent>
                <CardFooter>Atualizado em tempo real</CardFooter>
              </Card>
            </CardContainer>
          </>
        )}
        
        {activeSection === 'pets' && <Pets />}
        
        {activeSection === 'vacinas' && <Vacinas />}
        
        {activeSection === 'clientes' && <Clientes />}
        
        {activeSection === 'consultas' && <Consultas />}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
