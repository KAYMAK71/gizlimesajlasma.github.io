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
      // Bot mesajlarını yükle
      const savedMessages = localStorage.getItem(`bot_chat_${currentUser.email}`);
      const chatMessages = savedMessages ? JSON.parse(savedMessages) : [];
      
      if (chatMessages.length === 0) {
        const welcomeMessage = {
          id: Date.now(),
          text: 'Merhaba! Ben YZ Asistanı. Size nasıl yardımcı olabilirim?',
          timestamp: new Date().toISOString(),
          isBot: true
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(
          `bot_chat_${currentUser.email}`,
          JSON.stringify([welcomeMessage])
        );
      } else {
        setMessages(chatMessages);
      }
    } else {
      // Normal kullanıcı mesajlarını yükle
      const messages = AuthService.getMessages(currentUser.email, contactId);
      setMessages(messages);
    }
    
    scrollToBottom();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    if (contactId === 'ai-bot') {
      // Bot mesajlaşması
      const userMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: new Date().toISOString(),
        isUser: true
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Bot yanıtı
      const botResponse = {
        id: Date.now() + 1,
        text: AIBot.generateResponse(messageInput),
        timestamp: new Date().toISOString(),
        isBot: true
      };

      setTimeout(() => {
        const messagesWithResponse = [...updatedMessages, botResponse];
        setMessages(messagesWithResponse);
        
        // Bot sohbetini kaydet
        localStorage.setItem(
          `bot_chat_${currentUser.email}`,
          JSON.stringify(messagesWithResponse)
        );
        
        scrollToBottom();
      }, 500);
    } else {
      // Normal kullanıcı mesajlaşması
      const updatedMessages = AuthService.saveMessage(
        currentUser.email,
        contactId,
        messageInput
      );

      if (updatedMessages) {
        setMessages(updatedMessages);
        scrollToBottom();

        // Mesaj iletildi simülasyonu
        setTimeout(() => {
          const deliveredMessages = AuthService.updateMessageStatus(
            [currentUser.email, contactId].sort().join('_'),
            updatedMessages[updatedMessages.length - 1].id,
            'delivered'
          );
          if (deliveredMessages) {
            setMessages(deliveredMessages);
          }
        }, 1000);
      }
    }

    setMessageInput('');
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
            className={`message ${
              message.isBot ? 'bot' : 
              message.senderId === currentUser.email ? 'user' : 'other'
            }`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-info">
              <span className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
              {!message.isBot && message.senderId === currentUser.email && (
                <span className="message-status">
                  {message.status === 'sent' && '✓'}
                  {message.status === 'delivered' && '✓✓'}
                  {message.status === 'read' && '✓✓'}
                </span>
              )}
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