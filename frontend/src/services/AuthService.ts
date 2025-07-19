import { Cliente } from './DataService';

interface UserSession {
  id: number;
  username: string;
  name: string;
  isLoggedIn: boolean;
}

class AuthService {
  private currentUser: UserSession | null = null;
  
  setLoggedIn(isLoggedIn: boolean): void {
    if (this.currentUser) {
      this.currentUser.isLoggedIn = isLoggedIn;
      this.saveToLocalStorage();
    }
  }
  
  setCurrentUser(cliente: Cliente): void {
    this.currentUser = {
      id: cliente.id,
      username: cliente.username || '',
      name: cliente.name,
      isLoggedIn: true
    };
    this.saveToLocalStorage();
  }
  
  private saveToLocalStorage(): void {
    if (this.currentUser) {
      localStorage.setItem('petshop_user', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('petshop_user');
    }
  }
  
  loadFromLocalStorage(): void {
    const userStr = localStorage.getItem('petshop_user');
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
      } catch (e) {
        console.error('Erro ao carregar usuário do localStorage:', e);
        this.currentUser = null;
      }
    }
  }
  
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('petshop_user');
  }

  getCurrentUser(): UserSession | null {
    if (!this.currentUser) {
      this.loadFromLocalStorage();
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.isLoggedIn === true;
  }
}

export default new AuthService();
