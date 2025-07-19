// @ts-ignore - Ignorando erro de tipagem do styled-components
import styled from 'styled-components';

interface NavLinkProps {
  active?: boolean;
}

export const DashboardContainer = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: #2C2C2C;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

export const MainNav = styled.nav`
  flex: 1;
  margin: 0 2rem;
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 2rem;
`;

export const NavLink = styled.a<NavLinkProps>`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  background-color: ${(props: NavLinkProps) => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.span`
  margin-right: 1rem;
`;

export const LogoutButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MainContent = styled.main`
  padding: 2rem;
  background-color: #1e1e1e;
  color: #fff;
`;

export const DashboardTitle = styled.h1`
  margin-bottom: 2rem;
  color: #fff;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
`;

export const CardContent = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
`;

export const CardFooter = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;
