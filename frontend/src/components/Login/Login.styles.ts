import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #2C2C2C;
  font-family: 'Montserrat', sans-serif;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 40px;
`;

export const LoginTitle = styled.h1`
  color: white;
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 28px;
`;

export const LoginError = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 4px;
  color: #ff6b6b;
  text-align: center;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background-color: #2C2C2C;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: #ffffff;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  
  &:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const RegisterLink = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 14px;
  text-align: center;
  
  a {
    color: #4dabf7;
    text-decoration: none;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
