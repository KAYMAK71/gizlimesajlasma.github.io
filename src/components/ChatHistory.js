import React, { useState, useEffect } from 'react';
import { AIBot } from '../services/AIBot';
import '../styles/ChatHistory.css';

const ChatHistory = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Kontağın bilgilerini al
  const getContactInfo = () => {
    if (contactId === 'ai-bot') {
      return {
        name: 'YZ Asistanı',
        avatar: '🤖',
        isBot: true
      };
    }
    return null;
  };

  useEffect(() => {
    // Karşılama mesajını göster
    if (contactId === 'ai-bot') {
      const welcomeMessage = {
        id: Date.now(),
        text: 'Merhaba! Ben YZ Asistanı. Size nasıl yardımcı olabilirim?',
        timestamp: new Date().toISOString(),
        isBot: true
      };
      setMessages([welcomeMessage]);
    }
  }, [contactId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Kullanıcı mesajı
      const userMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: new Date().toISOString(),
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);

      // Bot yanıtı
      if (contactId === 'ai-bot') {
        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: AIBot.generateResponse(messageInput),
            timestamp: new Date().toISOString(),
            isBot: true
          };
          setMessages(prev => [...prev, botResponse]);
        }, 500);
      }
      setMessageInput('');
    }
  };

  const contactInfo = getContactInfo();

  return (
    <div className="chat-container">
      {contactInfo && (
        <div className="chat-header">
          <div className="contact-avatar">{contactInfo.avatar}</div>
          <div className="contact-info">
            <div className="contact-name">{contactInfo.name}</div>
            {contactInfo.isBot && <div className="contact-status">Bot</div>}
          </div>
        </div>
      )}
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-input-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Mesajınızı yazın..."
          className="message-input"
        />
        <button type="submit" className="send-button">Gönder</button>
      </form>
    </div>
  );
};

export default ChatHistory; 