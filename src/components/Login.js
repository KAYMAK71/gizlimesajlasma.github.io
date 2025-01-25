import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik giriş kontrolü
    if (AuthService.isLoggedIn()) {
      const currentUser = AuthService.getCurrentUser();
      onLogin(currentUser);
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = AuthService.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      if (rememberMe) {
        AuthService.saveUser(user);
      }
      onLogin(user);
    } else {
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Beni Hatırla
        </label>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login; 