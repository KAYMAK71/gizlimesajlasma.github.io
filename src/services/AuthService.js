export const AuthService = {
  saveUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
  },

  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}; 