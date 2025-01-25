import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { AIBot } from '../services/AIBot';
import '../styles/ChatHistory.css';

const ChatHistory = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const currentUser = AuthService.getCurrentUser();

  // Kontağın bilgilerini al
  const getContactInfo = () => {
    if (contactId === 'ai-bot') {
      return {
        name: 'YZ Asistanı',
        avatar: '🤖',
        isBot: true
      };
    }
    // Normal kullanıcı bilgilerini al
    const users = AuthService.getUsers();
    const contact = users.find(u => u.email === contactId);
    if (contact) {
      return {
        name: contact.name || contact.email,
        avatar: contact.name ? contact.name[0].toUpperCase() : '👤',
        email: contact.email
      };
    }
    return null;
  };

  useEffect(() => {
    loadMessages();
  }, [contactId]);

  const loadMessages = () => {
    if (contactId === 'ai-bot') {
      // Bot mesajları için mevcut mantığı kullan
      const savedMessages = localStorage.getItem(`chat_${contactId}`);
      let chatMessages = savedMessages ? JSON.parse(savedMessages) : [];

      if (chatMessages.length === 0) {
        const welcomeMessage = {
          id: Date.now(),
          text: 'Merhaba! Ben YZ Asistanı. Size nasıl yardımcı olabilirim?',
          timestamp: new Date().toISOString(),
          isBot: true
        };
        chatMessages = [welcomeMessage];
        localStorage.setItem(`chat_${contactId}`, JSON.stringify(chatMessages));
      }
      setMessages(chatMessages);
    } else {
      // Kullanıcılar arası mesajları yükle
      const chatMessages = AuthService.getMessages(currentUser.email, contactId);
      setMessages(chatMessages);
    }
    scrollToBottom();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      if (contactId === 'ai-bot') {
        // Bot ile mesajlaşma mantığı
        const userMessage = {
          id: Date.now(),
          text: messageInput,
          timestamp: new Date().toISOString(),
          isUser: true
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`chat_${contactId}`, JSON.stringify(updatedMessages));

        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: AIBot.generateResponse(messageInput),
            timestamp: new Date().toISOString(),
            isBot: true
          };
          const messagesWithResponse = [...updatedMessages, botResponse];
          setMessages(messagesWithResponse);
          localStorage.setItem(`chat_${contactId}`, JSON.stringify(messagesWithResponse));
          scrollToBottom();
        }, 500);
      } else {
        // Kullanıcılar arası mesajlaşma
        try {
          const newMessages = AuthService.saveMessage(
            currentUser.email,
            contactId,
            messageInput
          );
          setMessages(newMessages);
          scrollToBottom();
        } catch (error) {
          console.error('Mesaj gönderilemedi:', error);
        }
      }
      setMessageInput('');
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  const contactInfo = getContactInfo();

  return (
    <div className="chat-container">
      {contactInfo && (
        <div className="chat-header">
          <div className="contact-avatar">{contactInfo.avatar}</div>
          <div className="contact-info">
            <div className="contact-name">{contactInfo.name}</div>
            {contactInfo.isBot ? (
              <div className="contact-status">Bot</div>
            ) : (
              <div className="contact-email">{contactInfo.email}</div>
            )}
          </div>
        </div>
      )}
      <div className="messages-container">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.isBot ? 'bot' : 
              message.senderId === currentUser.email ? 'user' : 'other'}`}
          >
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
          autoFocus
        />
        <button type="submit" className="send-button">Gönder</button>
      </form>
    </div>
  );
};

export default ChatHistory; 