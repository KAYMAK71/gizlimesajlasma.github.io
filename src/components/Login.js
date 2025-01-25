import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthService.login(username, password);
      onLogin(user);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await AuthService.resetPassword(resetEmail);
      setMessage({ type: 'success', text: result.message });
      setShowResetForm(false);
      setResetEmail('');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="login-container">
      {message.text && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      {!showResetForm ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Giriş Yap</button>
          </form>
          <div className="forgot-password">
            <button 
              className="link-button"
              onClick={() => setShowResetForm(true)}
            >
              Şifremi Unuttum
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleResetPassword} className="reset-form">
          <h3>Şifre Sıfırlama</h3>
          <p>E-posta adresinizi girin, yeni şifrenizi gönderelim.</p>
          <div className="form-group">
            <input
              type="email"
              placeholder="E-posta"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Şifremi Sıfırla</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => {
              setShowResetForm(false);
              setMessage({ type: '', text: '' });
            }}
          >
            İptal
          </button>
        </form>
      )}
    </div>
  );
};

export default Login; 