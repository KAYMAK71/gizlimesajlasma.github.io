import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = AuthService.getUsers();
    
    // Kullanıcı adı kontrolü
    if (users.some(user => user.username === username)) {
      alert('Bu kullanıcı adı zaten kullanılıyor!');
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      contacts: [],
    };

    // Yeni kullanıcıyı kaydet
    const updatedUsers = [...users, newUser];
    AuthService.saveUsers(updatedUsers);
    AuthService.saveUser(newUser); // Otomatik giriş yap
    
    onRegister(newUser);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register; 