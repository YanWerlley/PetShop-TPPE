import React, { useState } from 'react';
import { 
  LoginContainer, 
  LoginForm, 
  LoginInput, 
  LoginButton, 
  LoginTitle,
  LoginError,
  RegisterLink
} from './Login.styles';
import AuthService from '../../services/AuthService';
import ClienteForm from '../Clientes/ClienteForm';
import { dataService } from '../../services/DataService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Verificar se o usuário existe no DataService
      const cliente = dataService.getClienteByUsername(username);
      
      if (cliente && cliente.password === password) {
        // Login bem-sucedido
        AuthService.setLoggedIn(true);
        AuthService.setCurrentUser(cliente);
        window.location.href = '/dashboard';
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao tentar fazer login. Tente novamente.');
      console.error('Erro de login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleRegisterComplete = () => {
    setShowRegister(false);
    setError('');
  };

  if (showRegister) {
    return <ClienteForm onSave={handleRegisterComplete} isRegister={true} />;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>PetShop</LoginTitle>
        {error && <LoginError>{error}</LoginError>}
        <LoginInput
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <LoginInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <LoginButton type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Login'}
        </LoginButton>
        <LoginButton type="button" onClick={handleRegisterClick} style={{ marginTop: '10px' }}>
          Registre-se
        </LoginButton>
        <RegisterLink>
          Não tem uma conta? Clique no botão acima para se registrar.
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
